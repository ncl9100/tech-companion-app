// StepComponent.js
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const StepComponent = ({ step, onComplete }) => {
  const [inputValue, setInputValue] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    if (step.input && step.input.correct_answer) {
      if (inputValue.trim() === step.input.correct_answer) {
        setCompleted(true);
        if (onComplete) {
          onComplete(step.next_action?.go_to_tab);
        }
      } else {
        Alert.alert('Incorrect', 'Please enter the correct password to proceed.');
      }
    } else {
      setCompleted(true);
      if (onComplete) {
        onComplete(step.next_action?.go_to_tab);
      }
    }
  };

  return (
    <View style={styles.container}>
      {step.image && (
        <Image
          source={{ uri: step.image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      {step.instruction && (
        <Text style={styles.instruction}>{step.instruction}</Text>
      )}
      {step.input && step.input.type === 'text' && !completed && (
        <TextInput
          style={styles.input}
          placeholder={step.input.placeholder || ''}
          value={inputValue}
          onChangeText={setInputValue}
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}
      {!completed ? (
        <TouchableOpacity style={styles.button} onPress={handleComplete}>
          <Text style={styles.buttonText}>Complete Step</Text>
        </TouchableOpacity>
      ) : (
        <>
          {step.completed_message && (
            <Text style={styles.completedMessage}>{step.completed_message}</Text>
          )}
          {step.next_action && step.next_action.type === 'button' && (
            <TouchableOpacity
              style={[styles.button, styles.nextButton]}
              onPress={() => {
                if (onComplete) onComplete(step.next_action.go_to_tab);
              }}
            >
              <Text style={styles.buttonText}>{step.next_action.label}</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 200,
    marginBottom: 16,
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    width: '90%',
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  nextButton: {
    backgroundColor: '#34C759',
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  completedMessage: {
    fontSize: 16,
    color: '#28a745',
    marginTop: 12,
    textAlign: 'center',
  },
});

export default StepComponent;
