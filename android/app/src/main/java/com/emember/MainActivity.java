package com.ims.emember;

import com.facebook.react.ReactActivity;
import android.os.Bundle; // required for onCreate parameter
import org.devio.rn.splashscreen.SplashScreen; // required for react-native-splash-screen >= 0.3.1

public class MainActivity extends ReactActivity {
 @Override
  protected void onCreate(Bundle savedInstanceState) {
    setTheme(R.style.AppTheme);
    setContentView(R.layout.launch_screen);
    SplashScreen.show(this, R.style.SplashActivityTheme, false);
    super.onCreate(null);
  }

  @Override
  protected String getMainComponentName() {
    return "eMember";
  }
}
