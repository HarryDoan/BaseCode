import router from '@navigation/router';
import LoginScreen from './LoginScreen';
import OnboardingScreen from './OnboardingScreen';
import RegisterScreen from './RegisterScreen';
import ForgetPasswordScreen from './ForgetPasswordScreen';

export const auth = {
  [router.ONBOARDING_SCREEN]: OnboardingScreen,
  [router.LOGIN_SCREEN]: LoginScreen,
  [router.REGISTER_SCREEN]: RegisterScreen,
  [router.FORGET_PASSWORD_SCREEN]: ForgetPasswordScreen,
};
