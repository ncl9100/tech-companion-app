import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import guides from '../guides.json';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function GuidePlayerScreen({ route, navigation }) {
  const { guideId } = route.params;
  const guide = guides.find(g => g.guide_id === guideId);

  const [isCompleted, setIsCompleted] = useState(false);

  // SAFETY CHECK: if guide not found → do not crash
  if (!guide) {
    console.error(`Guide with id '${guideId}' not found!`);
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Guide not found!</Text>
        <Text style={styles.instruction}>
          The guide with ID '{guideId}' was not found. Please check your guides.json.
        </Text>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {!isCompleted ? (
        <>
          <Text style={styles.title}>{guide.title}</Text>
          <Text style={styles.instruction}>
            Please follow the instructions to complete this task.
          </Text>

          {/* Placeholder — in future you can display guide steps here */}

          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => setIsCompleted(true)}
          >
            <Text style={styles.buttonText}>Task Completed</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.completedText}>✅ You completed this guide!</Text>
          <TouchableOpacity
            style={styles.returnButton}
            onPress={() => navigation.navigate('PracticeModeScreen')}
          >
            <Text style={styles.buttonText}>Return to All Guides</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  returnButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  homeButton: {
    backgroundColor: '#aaa',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 30,
    textAlign: 'center',
  },
});
