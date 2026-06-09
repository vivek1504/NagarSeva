package com.awesomeproject.video

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class FrameExtractorPackage : ReactPackage {
  override fun createNativeModules(
    reactContext: ReactApplicationContext
  ) = listOf(FrameExtractorModule(reactContext))

  override fun createViewManagers(
    reactContext: ReactApplicationContext
  ) = emptyList<ViewManager<*, *>>()
}

