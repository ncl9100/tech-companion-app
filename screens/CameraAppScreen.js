import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles';

export default function CameraAppScreen({ navigation, route }) {
  const { practiceTopic, fromPracticeMode, onPracticeComplete } = route.params || {};
  const [photoTaken, setPhotoTaken] = useState(false);

  const handleTakePhoto = () => {
    setPhotoTaken(true);

    if (practiceTopic === 'Take a Photo') {
      onPracticeComplete && onPracticeComplete();
    }
  };

const handleReturn = () => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'PracticeMode' }],
  });
};

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.header}>Camera</Text>

      {photoTaken ? (
        <>
          <Text style={globalStyles.subheader}>📸 Photo Taken!</Text>
          <TouchableOpacity style={globalStyles.button} onPress={handleReturn}>
            <Text style={globalStyles.buttonText}>Return</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={globalStyles.button} onPress={handleTakePhoto}>
          <Text style={globalStyles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
