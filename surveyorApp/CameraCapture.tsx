import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function CameraCapture({
  onFrameCaptured,
  onClose,
}: {
  onFrameCaptured: (uri: string) => void;
  onClose: () => void;
}) {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');

  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const start = () => {
    if (!camera.current) return;

    setRunning(true);
    intervalRef.current = setInterval(async () => {
      try {
        const photo = await camera.current!.takePhoto({
          flash: 'off',
        });

        onFrameCaptured(`file://${photo.path}`);
      } catch (e) {
        console.error('Capture failed', e);
      }
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  };

  if (!device) return <Text>Loading camera…</Text>;

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo
      />

      <View style={styles.controls}>
        {!running ? (
          <Pressable style={styles.btn} onPress={start}>
            <Text style={styles.btnText}>Start</Text>
          </Pressable>
        ) : (
          <Pressable style={[styles.btn, styles.stop]} onPress={stop}>
            <Text style={styles.btnText}>Stop</Text>
          </Pressable>
        )}

        <Pressable style={styles.close} onPress={onClose}>
          <Text style={styles.btnText}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  controls: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    backgroundColor: '#4f46e5',
    padding: 14,
    borderRadius: 10,
  },
  stop: {
    backgroundColor: '#dc2626',
  },
  close: {
    backgroundColor: '#334155',
    padding: 14,
    borderRadius: 10,
  },
  btnText: { color: '#fff', fontWeight: '600' },
});
