package com.awesomeproject.video

import android.graphics.Bitmap
import android.media.MediaMetadataRetriever
import android.os.Environment
import com.facebook.react.bridge.*
import java.io.File
import java.io.FileOutputStream

class FrameExtractorModule(
  reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "FrameExtractor"

  @ReactMethod
  fun extractFrames(
    videoPath: String,
    intervalMs: Int,
    maxFrames: Int,
    promise: Promise
  ) {
    try {
      val retriever = MediaMetadataRetriever()
      retriever.setDataSource(videoPath)

      val durationMs =
        retriever.extractMetadata(
          MediaMetadataRetriever.METADATA_KEY_DURATION
        )?.toLong() ?: 0L

      // ✅ UNIQUE directory per session
      val sessionDir = File(
        reactApplicationContext.cacheDir,
        "frames_${System.currentTimeMillis()}"
      )
      sessionDir.mkdirs()

      val framePaths = Arguments.createArray()

      var timeMs = 0L
      var count = 0

      while (timeMs < durationMs && count < maxFrames) {

        val bitmap = retriever.getFrameAtTime(
          timeMs * 1000, // ms → us
          MediaMetadataRetriever.OPTION_CLOSEST
        ) ?: break

        val file = File(sessionDir, "frame_$count.jpg")

        FileOutputStream(file).use { fos ->
          bitmap.compress(Bitmap.CompressFormat.JPEG, 80, fos)
        }

        framePaths.pushString("file://${file.absolutePath}")

        timeMs += intervalMs
        count++
      }

      retriever.release()
      promise.resolve(framePaths)

    } catch (e: Exception) {
      promise.reject("FRAME_ERROR", e)
    }
  }

  @ReactMethod
    fun addLocationMetadata(
    imagePath: String,
    latitude: Double,
    longitude: Double,
    promise: Promise
  ) {
    try {
      ExifUtils.writeLocation(imagePath, latitude, longitude)
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("EXIF_ERROR", e)
    }
  }

}

