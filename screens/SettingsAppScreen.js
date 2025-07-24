import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { globalStyles } from '../styles';

export default function SettingsAppScreen({ navigation, route }) {
  const { practiceTopic, fromGuide, onPracticeComplete } = route.params || {};
  const [wifiEnabled, setWifiEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [completed, setCompleted] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);

  const handleToggleWifi = (value) => {
    setWifiEnabled(value);

    if (!value) {
      // Reset if Wi-Fi is turned off again
      setCompleted(false);
      setPasswordSubmitted(false);
      setPassword('');
    }
  };

  const handleCheckPassword = () => {
    if (password.trim() === 'supersecure123') {
      setCompleted(true);
      setPasswordSubmitted(true);
      onPracticeComplete && onPracticeComplete(); // ✅ Mark practice complete
    } else {
      Alert.alert('Incorrect Password', 'Please try again.');
    }
  };

  const handleReturn = () => {
    if (fromGuide) {
      navigation.navigate('MainTabs', { screen: 'Learn' });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'PracticeMode' }],
      });
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.header}>Settings</Text>

      {completed ? (
        <>
          <Text style={globalStyles.subheader}>✅ Wi-Fi Connected!</Text>
          <TouchableOpacity style={globalStyles.button} onPress={handleReturn}>
            <Text style={globalStyles.buttonText}>
              {fromGuide ? 'Back to Learn Basics' : 'Return'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{ alignItems: 'center', width: '100%' }}>
          <Text style={globalStyles.subheader}>Wi-Fi</Text>
          <Switch value={wifiEnabled} onValueChange={handleToggleWifi} />

          {wifiEnabled && !passwordSubmitted && (
            <View style={{ marginTop: 20, width: '100%', paddingHorizontal: 20 }}>
              <Text style={{ marginBottom: 8, fontSize: 16 }}>Enter Wi-Fi Password:</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 6,
                  padding: 10,
                  fontSize: 16,
                }}
                placeholder="Enter password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  { marginTop: 16, backgroundColor: '#007AFF' },
                ]}
                onPress={handleCheckPassword}
              >
                <Text style={globalStyles.buttonText}>Connect</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
