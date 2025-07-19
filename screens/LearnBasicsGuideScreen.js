import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { globalStyles, responsivePadding } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../SettingsContext';

const PracticeTasks = {
    'connect_wifi': 'Connect to Wi-Fi',
    'settings_guide': 'Settings Guide',
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
  const { fontSize, markGuideAsCompleted, markGuideAsRead, isGuideCompleted, isGuideRead } = useContext(SettingsContext);

  // Use real guide data from guides.json
  const guide = topic.steps ? topic : null;
  const steps = guide ? guide.steps : [
    { instruction: 'Step 1: Placeholder content for this guide.' },
    { instruction: 'Step 2: More placeholder content.' },
    { instruction: 'Step 3: Final placeholder step.' },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];
  const isCompleted = isGuideCompleted(topic.guide_id);
  const isRead = isGuideRead(topic.guide_id);

  useEffect(() => {
    if (currentStep && currentStep.instruction) {
      Speech.speak(currentStep.instruction, {
        language: 'en-US',
      });
    }

    return () => {
      Speech.stop();
    };
  }, [currentStepIndex]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Mark guide as read when user finishes reading all steps
      markGuideAsRead(topic.guide_id);
      
      Alert.alert(
        '📚 Guide Steps Completed!',
        `You've finished reading the "${topic.title}" guide. Now let's practice what you learned!`,
        [
          {
            text: 'Practice Now',
            onPress: () => {
              const practiceTask = PracticeTasks[topic.guide_id];
              if (practiceTask) {
                navigation.navigate('SimulatedIphoneScreen', {
                  practiceTopic: practiceTask,
                  fromGuide: true,
                  guideId: topic.guide_id,
                });
              }
            }
          },
          {
            text: 'Back to Learn Basics',
            onPress: () => navigation.navigate('MainTabs', { screen: 'Learn' }),
            style: 'cancel'
          }
        ]
      );
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handlePractice = () => {
    const practiceTask = PracticeTasks[topic.guide_id];
    if (practiceTask) {
      navigation.navigate('SimulatedIphoneScreen', {
        practiceTopic: practiceTask,
        fromGuide: true,
        guideId: topic.guide_id,
      });
    } else {
      Alert.alert('No Practice Task', 'No practice task is available for this guide.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: responsivePadding(20) }}>
      <Text style={{
        fontSize: fontSize + 4,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
      }}>
        {topic.title} Guide
      </Text>

      <Text style={{
        fontSize: fontSize,
        textAlign: 'center',
        marginBottom: 10,
        color: '#666',
      }}>
        Step {currentStepIndex + 1} of {steps.length}
      </Text>

      {isCompleted && (
        <View style={{
          backgroundColor: '#4CD964',
          padding: responsivePadding(10),
          borderRadius: 8,
          marginBottom: responsivePadding(20),
        }}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: fontSize }}>
            ✅ This guide has been completed!
          </Text>
        </View>
      )}

      {isRead && !isCompleted && (
        <View style={{
          backgroundColor: '#FF9500',
          padding: responsivePadding(10),
          borderRadius: 8,
          marginBottom: responsivePadding(20),
        }}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: fontSize }}>
            📖 Guide read! Now practice to complete it.
          </Text>
        </View>
      )}

      <View style={[globalStyles.card, { marginBottom: 20 }]}>
        <Text style={{ fontSize: fontSize + 2 }}>{currentStep.instruction}</Text>
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

      {/* Practice button - show if guide is completed OR if user has finished reading the guide */}
      {isCompleted || isRead || currentStepIndex === steps.length - 1 ? (
        <TouchableOpacity
          style={[globalStyles.button, { marginTop: 10, backgroundColor: '#FF9500' }]}
          onPress={handlePractice}
        >
          <Text style={globalStyles.buttonText}>
            {isCompleted ? '🎯 Practice Again' : '🎯 Practice What You Learned'}
          </Text>
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
