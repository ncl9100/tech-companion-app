import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles';

export default function CameraAppScreen({ navigation, route }) {
  const { practiceTopic, fromGuide, onPracticeComplete } = route.params || {};
  const [photoTaken, setPhotoTaken] = useState(false);

  const handleTakePhoto = () => {
    setPhotoTaken(true);

    if (practiceTopic === 'Take a Photo') {
      onPracticeComplete && onPracticeComplete();
    }
  };

  const handleReturn = () => {
    if (fromGuide) {
      // Return to Learn Basics screen
      navigation.navigate('MainTabs', { screen: 'Learn' });
    } else {
      // Return to Practice Mode (for backward compatibility)
      navigation.reset({
        index: 0,
        routes: [{ name: 'PracticeMode' }],
      });
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.header}>Camera</Text>

      {photoTaken ? (
        <>
          <Text style={globalStyles.subheader}>📸 Photo Taken!</Text>
          <TouchableOpacity style={globalStyles.button} onPress={handleReturn}>
            <Text style={globalStyles.buttonText}>
              {fromGuide ? 'Back to Learn Basics' : 'Return'}
            </Text>
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
