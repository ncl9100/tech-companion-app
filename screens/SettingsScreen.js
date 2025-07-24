import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { globalStyles, responsiveFontSize, responsivePadding } from '../styles';
import { SettingsContext } from '../SettingsContext';

export default function SettingsScreen({
  currentGuideStep,
  onCompleteStep,
  onOpenWifiSettings,
  onToggleWifi,
  onSelectNetwork,
}) {
  const {
    fontSize,
    setFontSize,
    speechRate,
    setSpeechRate,
    favorites,
    setFavorites,
    clearCompletedGuides,
    completedGuides,
    readGuides,
  } = useContext(SettingsContext);

  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    // Clear password input when step changes
    setPasswordInput('');
  }, [currentGuideStep]);

  const clearFavorites = () => {
    setFavorites([]);
    Alert.alert('Favorites cleared!');
  };

  const handleClearCompletedGuides = () => {
    clearCompletedGuides();
    Alert.alert('Progress cleared!');
  };

  const handleSubmitPassword = () => {
    if (passwordInput === currentGuideStep.input.correct_answer) {
      Alert.alert('Success', 'Password accepted!');
      onCompleteStep();
    } else {
      Alert.alert('Error', 'Incorrect password, please try again.');
    }
  };

  // Check if current step requires password input
  const isPasswordStep = currentGuideStep?.input?.type === 'text';

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={{ padding: responsivePadding(15) }}>
        <Text
          style={{
            fontSize: responsiveFontSize(fontSize),
            fontWeight: 'bold',
            marginBottom: responsivePadding(15),
            textAlign: 'center',
          }}
        >
          Settings ⚙️
        </Text>

        {/* If we're on a guide step, show its instruction */}
        {currentGuideStep && (
          <View style={{ marginBottom: responsivePadding(20) }}>
            <Text
              style={{
                fontSize: responsiveFontSize(fontSize),
                marginBottom: responsivePadding(10),
              }}
            >
              {currentGuideStep.instruction}
            </Text>

            {/* Render hotspots/buttons if any */}
            {currentGuideStep.hotspots?.map((hotspot, index) => {
              // Render a button that triggers the action for the hotspot
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    // Call action handlers based on hotspot.action
                    switch (hotspot.action) {
                      case 'open_settings':
                        Alert.alert('Opening Settings...');
                        break;
                      case 'open_wifi':
                        onOpenWifiSettings?.();
                        break;
                      case 'toggle_wifi':
                        onToggleWifi?.();
                        break;
                      case 'select_network':
                        onSelectNetwork?.();
                        break;
                      default:
                        Alert.alert(`Action: ${hotspot.action}`);
                    }
                  }}
                  style={[
                    styles.hotspotButton,
                    {
                      width: `${hotspot.width * 100}%`,
                      height: 40,
                      marginVertical: 5,
                      backgroundColor: '#007AFF',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                    },
                  ]}
                >
                  <Text style={{ color: 'white' }}>{hotspot.action || 'Tap Here'}</Text>
                </TouchableOpacity>
              );
            })}

            {/* Password input step */}
            {isPasswordStep && (
              <View style={{ marginTop: responsivePadding(10) }}>
                <TextInput
                  placeholder={currentGuideStep.input.placeholder || 'Enter password'}
                  value={passwordInput}
                  onChangeText={setPasswordInput}
                  secureTextEntry={true}
                  style={styles.passwordInput}
                />
                <TouchableOpacity
                  style={[globalStyles.button, { marginTop: 10 }]}
                  onPress={handleSubmitPassword}
                >
                  <Text style={globalStyles.buttonText}>Submit Password</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Regular Settings options below */}

        <Text
          style={{
            marginTop: responsivePadding(20),
            fontSize: responsiveFontSize(fontSize),
            fontWeight: 'bold',
          }}
        >
          Font Size:
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: responsivePadding(10),
          }}
        >
          {[16, 20, 24, 28].map((size) => (
            <TouchableOpacity key={size} style={globalStyles.button} onPress={() => setFontSize(size)}>
              <Text style={globalStyles.buttonText}>
                {size} {fontSize === size ? '✅' : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text
          style={{
            marginTop: responsivePadding(20),
            fontSize: responsiveFontSize(fontSize),
            fontWeight: 'bold',
          }}
        >
          Speech Speed:
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: responsivePadding(10),
          }}
        >
          {[
            { label: 'Slow', value: 0.7 },
            { label: 'Normal', value: 1.0 },
            { label: 'Fast', value: 1.3 },
          ].map(({ label, value }) => (
            <TouchableOpacity
              key={label}
              style={globalStyles.button}
              onPress={() => setSpeechRate(value)}
            >
              <Text style={globalStyles.buttonText}>
                {label} {speechRate === value ? '✅' : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text
          style={{
            marginTop: responsivePadding(20),
            fontSize: responsiveFontSize(fontSize),
            fontWeight: 'bold',
          }}
        >
          Progress:
        </Text>
        <View>
          <Text style={{ fontSize: responsiveFontSize(fontSize - 2), color: '#666' }}>
            📖 Guides read: {readGuides.length}
          </Text>
          <Text style={{ fontSize: responsiveFontSize(fontSize - 2), color: '#666' }}>
            ✅ Guides completed: {completedGuides.length}
          </Text>
          <Text style={{ fontSize: responsiveFontSize(fontSize - 2), color: '#666' }}>
            ⭐ Favorites saved: {favorites.length}
          </Text>
        </View>

        <TouchableOpacity
          style={[globalStyles.button, { backgroundColor: '#FF9500', marginTop: responsivePadding(10) }]}
          onPress={handleClearCompletedGuides}
        >
          <Text style={globalStyles.buttonText}>🔄 Reset Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.button, { backgroundColor: '#FF3B30', marginTop: responsivePadding(10) }]}
          onPress={clearFavorites}
        >
          <Text style={globalStyles.buttonText}>🗑️ Clear Favorites</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hotspotButton: {
    // You can customize hotspot buttons here
  },
  passwordInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: 'white',
  },
});
