import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { globalStyles } from '../styles';

export default function SettingsAppScreen({ navigation, route }) {
  const { practiceTopic, fromPracticeMode, onPracticeComplete } = route.params || {};
  const [wifiEnabled, setWifiEnabled] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleToggleWifi = (value) => {
    setWifiEnabled(value);

    if (practiceTopic === 'Connect to Wi-Fi' && value) {
      onPracticeComplete && onPracticeComplete();
      setCompleted(true);
    }
  };

// inside handleReturn replace with this:
const handleReturn = () => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'PracticeMode' }],
  });
};


  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.header}>Settings</Text>

      {completed ? (
        <>
          <Text style={globalStyles.subheader}>✅ Wi-Fi Connected!</Text>
          <TouchableOpacity style={globalStyles.button} onPress={handleReturn}>
            <Text style={globalStyles.buttonText}>Return</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text style={globalStyles.subheader}>Wi-Fi</Text>
          <Switch value={wifiEnabled} onValueChange={handleToggleWifi} />
        </View>
      )}
    </SafeAreaView>
  );
}
