import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { globalStyles, responsiveFontSize, responsivePadding } from '../styles';
import { SettingsContext } from '../SettingsContext';

export default function SimulatedIphoneScreen({ navigation, route }) {
  const { practiceTopic, fromGuide, guideId } = route.params || {};
  const { fontSize, markGuideAsCompleted } = useContext(SettingsContext);
  const isPracticeMode = !!practiceTopic;

  const [practiceComplete, setPracticeComplete] = useState(false);

  const apps = [
    { name: 'Settings', screen: 'SettingsAppScreen' },
    { name: 'Camera', screen: 'CameraAppScreen' },
    { name: 'Contacts', screen: 'ContactsAppScreen' },
    { name: 'Safari', screen: 'SafariAppScreen' },
  ];

  const handleAppPress = (screenName) => {
    navigation.navigate(screenName, {
      practiceTopic,
      fromGuide,
      guideId,
      onPracticeComplete: () => {
        setPracticeComplete(true);
        if (guideId) {
          markGuideAsCompleted(guideId);
        }
      },
    });
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

  const renderAppIcon = ({ item }) => (
    <TouchableOpacity
      style={styles.appIcon}
      onPress={() => handleAppPress(item.screen)}
    >
      <Text style={styles.appIconText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.header}>Simulated iPhone</Text>

      {practiceComplete ? (
        <>
          <Text style={globalStyles.subheader}>✅ Task Completed!</Text>
          <TouchableOpacity style={globalStyles.button} onPress={handleReturn}>
            <Text style={globalStyles.buttonText}>
              {fromGuide ? 'Back to Learn Basics' : 'Return to All Guides'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={{
            fontSize: fontSize,
            textAlign: 'center',
            marginBottom: responsivePadding(20),
            color: '#666',
          }}>
            Practice: {practiceTopic}
          </Text>
          <FlatList
            data={apps}
            keyExtractor={(item) => item.name}
            renderItem={renderAppIcon}
            numColumns={2} // grid 2x2
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.appGrid}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
  },
  appGrid: {
    padding: responsivePadding(20),
  },
  appIcon: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsivePadding(20),
  },
  appIconText: {
    color: 'white',
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
  },
});
