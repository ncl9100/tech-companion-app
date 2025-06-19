import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles';
import { useNavigation } from '@react-navigation/native';

const PracticeTasks = {
    'connect_wifi': 'Connect to Wi-Fi',
    'settings_guide': 'Connect to Wi-Fi',
    'camera_guide': 'Take a Photo',
    'contacts_guide': 'Call a Contact',
    'safari_guide': 'Open a Website',
    'enable_notifications': 'Enable Notifications',
    'adjust_volume': 'Adjust Volume',
    'open_maps': 'Open Maps',
};

export default function LearnBasicsGuideScreen({ route }) {
  const navigation = useNavigation();
  const { topic } = route.params;

  const steps = [
    { text: 'Step 1: Placeholder content for this guide.' },
    { text: 'Step 2: More placeholder content.' },
    { text: 'Step 3: Final placeholder step.' },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    Speech.speak(currentStep.text, {
      language: 'en-US',
    });

    return () => {
      Speech.stop();
    };
  }, [currentStepIndex]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      alert('✅ You have completed this guide!');
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
      }}>
        {topic.title} Guide
      </Text>

      <Text style={{
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        color: '#666',
      }}>
        Step {currentStepIndex + 1} of {steps.length}
      </Text>

      <View style={[globalStyles.card, { marginBottom: 20 }]}>
        <Text style={{ fontSize: 18 }}>{currentStep.text}</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={[globalStyles.button, { flex: 1, marginRight: 5 }]}
          onPress={handlePrevious}
          disabled={currentStepIndex === 0}
        >
          <Text style={globalStyles.buttonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.button, { flex: 1, marginLeft: 5 }]}
          onPress={handleNext}
        >
          <Text style={globalStyles.buttonText}>
            {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Practice button */}
      {currentStepIndex === steps.length - 1 ? (
        <TouchableOpacity
          style={[globalStyles.button, { marginTop: 10 }]}
          onPress={() => {
            const practiceTask = PracticeTasks[topic.guide_id]; // <--- THIS IS THE FIXED LINE
            if (practiceTask) {
              navigation.navigate('SimulatedIphoneScreen', {
                practiceTopic: practiceTask,
              });
            } else {
              alert('No Practice Task mapped for this guide.');
            }
          }}
        >
          <Text style={globalStyles.buttonText}>Practice this now</Text>
        </TouchableOpacity>
      ) : (
        <View style={[globalStyles.button, { marginTop: 10, backgroundColor: '#ccc' }]}>
          <Text style={[globalStyles.buttonText, { color: '#666' }]}>
            Complete the guide to unlock Practice
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
