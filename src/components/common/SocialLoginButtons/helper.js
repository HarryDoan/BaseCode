import appleAuth from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import jwtDecode from 'jwt-decode';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
  Settings,
} from 'react-native-fbsdk-next';

GoogleSignin.configure();
Settings.initializeSDK();

const getFacebookData = () => {
  return new Promise((resove, reject) => {
    const infoRequest = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'email,first_name,last_name,name,picture.type(large)',
          },
        },
      },
      (error, res) => {
        if (error) {
          reject(error);
        } else {
          resove(res);
        }
      },
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  });
};

export const getFacebookProfile = async () => {
  const accessToken = await AccessToken.getCurrentAccessToken();
  if (accessToken) {
    return await getFacebookData();
  } else {
    return new Promise((resolve, reject) => {
      LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        async result => {
          if (result.isCancelled) {
            reject('USER CANCEL');
          } else {
            await AccessToken.getCurrentAccessToken();
            const profile = await getFacebookData();
            resolve(profile);
          }
        },
        function (err) {
          reject(err);
        },
      );
    });
  }
};

export const getGoogleProfile = async () => {
  const currentUser = await GoogleSignin.getCurrentUser();
  if (currentUser) {
    return currentUser.user;
  }
  const userInfo = await GoogleSignin.signIn();
  return userInfo.user;
};

export const getAppleProfile = async () => {
  const {identityToken} = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });
  const profile = jwtDecode(identityToken);
  return profile;
};
