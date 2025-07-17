import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles';

export default function ContactsAppScreen({ navigation, route }) {
  const { practiceTopic, fromGuide, onPracticeComplete } = route.params || {};
  const [completed, setCompleted] = useState(false);

  const contacts = ['Alice Johnson', 'Bob Smith', 'Charlie Davis', 'Diana Lee'];

  const handleCallContact = (contact) => {
    if (practiceTopic === 'Call a Contact') {
      onPracticeComplete && onPracticeComplete();
      setCompleted(true);
    }
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

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.header}>Contacts</Text>

      {completed ? (
        <>
          <Text style={globalStyles.subheader}>📞 Contact Called!</Text>
          <TouchableOpacity style={globalStyles.button} onPress={handleReturn}>
            <Text style={globalStyles.buttonText}>
              {fromGuide ? 'Back to Learn Basics' : 'Return'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => handleCallContact(item)}
            >
              <Text style={globalStyles.buttonText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}
