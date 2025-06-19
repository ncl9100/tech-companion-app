import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles';

export default function SafariAppScreen({ navigation, route }) {
  const { practiceTopic, fromPracticeMode, onPracticeComplete } = route.params || {};
  const [url, setUrl] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleGoToUrl = () => {
    if (practiceTopic === 'Open a Website' && url.length > 0) {
      onPracticeComplete && onPracticeComplete();
      setCompleted(true);
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
      <Text style={globalStyles.header}>Safari</Text>

      {completed ? (
        <>
          <Text style={globalStyles.subheader}>✅ Website Opened!</Text>
          <TouchableOpacity style={globalStyles.button} onPress={handleReturn}>
            <Text style={globalStyles.buttonText}>Return</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={globalStyles.input}
            placeholder="Enter URL"
            value={url}
            onChangeText={setUrl}
          />
          <TouchableOpacity style={globalStyles.button} onPress={handleGoToUrl}>
            <Text style={globalStyles.buttonText}>Go</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}
