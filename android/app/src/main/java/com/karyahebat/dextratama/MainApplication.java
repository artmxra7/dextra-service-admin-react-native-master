package com.karyahebat.dextratama;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.filepicker.FilePickerPackage;
import com.rngrp.RNGRPPackage;
import com.rnfs.RNFSPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.keyee.pdfview.PDFView;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RCTCameraPackage(),
            new MapsPackage(),
            new FIRMessagingPackage(),
            new FilePickerPackage(),
            new RNGRPPackage(),
            new RNFSPackage(),
            new ReactNativeDocumentPicker(),
            new PDFView(),
          new VectorIconsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
