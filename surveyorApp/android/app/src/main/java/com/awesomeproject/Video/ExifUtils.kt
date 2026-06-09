package com.awesomeproject.video

import androidx.exifinterface.media.ExifInterface
import java.io.File

object ExifUtils {

  fun writeLocation(
    imagePath: String,
    latitude: Double,
    longitude: Double
  ) {
    val file = File(imagePath)
    if (!file.exists()) return

    val exif = ExifInterface(file.absolutePath)

    exif.setGpsInfo(
      android.location.Location("gps").apply {
        this.latitude = latitude
        this.longitude = longitude
      }
    )

    exif.saveAttributes()
  }
}
