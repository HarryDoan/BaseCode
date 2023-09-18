import {firebase} from '@react-native-firebase/database';

const url = 'https://cart-a-default-rtdb.asia-southeast1.firebasedatabase.app/';

const rulePath = 'EWA4tWTQAgiVf9AJiYbAxUKsew2lbZqk';

const RTDababase = firebase.app().database(url).ref(`${rulePath}`);

// export const driversPosition = firebase
//   .app()
//   .database(url)
//   .ref(`${rulePath}/position`);
export const userChatrooms = firebase
  .app()
  .database(url)
  .ref(`${rulePath}/userChatrooms`);

export default RTDababase;
