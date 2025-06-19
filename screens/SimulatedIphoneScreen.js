import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { globalStyles } from '../styles';

export default function SimulatedIphoneScreen({ navigation, route }) {
  const { practiceTopic, fromPracticeMode } = route.params || {};
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
      fromPracticeMode,
      onPracticeComplete: () => setPracticeComplete(true),
    });
  };

  const handleReturn = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'PracticeMode' }],
    });
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
            <Text style={globalStyles.buttonText}>Return to All Guides</Text>
          </TouchableOpacity>
        </>
      ) : (
        <FlatList
          data={apps}
          keyExtractor={(item) => item.name}
          renderItem={renderAppIcon}
          numColumns={2} // grid 2x2
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.appGrid}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  appGrid: {
    paddingTop: 20,
  },
  appIcon: {
    backgroundColor: '#eee',
    borderRadius: 20,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appIconText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
