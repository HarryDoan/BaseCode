import {createNavigationContainerRef} from '@react-navigation/native';
import router from './router';

export const navigationRef = createNavigationContainerRef();

const rootNavigate = (rootName, screenName, screenParams) => {
  navigationRef.navigate(rootName, {
    screen: screenName,
    params: screenParams,
  });
};

export const root = {
  goBack: () => navigationRef.goBack(),
  navigate: (screenName, screenParams) => {
    navigationRef.navigate(screenName, screenParams);
  },
};

export const authRoot = {
  navigate: (screenName, screenParams) => {
    rootNavigate(router.AUTH_CONTAINER, screenName, screenParams);
  },
};

export const bottomRoot = {
  navigate: (screenName, screenParams) => {
    rootNavigate(router.BOTTOM_CONTAINER, screenName, screenParams);
  },
};

export const commonRoot = {
  navigate: (screenName, screenParams) => {
    rootNavigate(router.COMMON_CONTAINER, screenName, screenParams);
  },
};

export function reset(index, name) {
  navigationRef.current?.reset({
    index,
    routes: [{name}],
  });
}
