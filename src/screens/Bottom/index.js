import EventScreen from './EventScreen';
import HomeScreen from './HomeScreen';
import MemberScreen from './MemberScreen';
import UtilityScreen from './UtilityScreen';
import router from '@navigation/router';

export const bottom = {
  [router.HOME_SCREEN]: HomeScreen,
  [router.EVENT_SCREEN]: EventScreen,
  [router.UTILITY_SCREEN]: UtilityScreen,
  [router.MEMBER_SCREEN]: MemberScreen,
};
