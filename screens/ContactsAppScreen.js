import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles';

export default function ContactsAppScreen({ navigation, route }) {
  const { practiceTopic, fromPracticeMode, onPracticeComplete } = route.params || {};
  const [completed, setCompleted] = useState(false);

  const contacts = ['Alice Johnson', 'Bob Smith', 'Charlie Davis', 'Diana Lee'];

  const handleCallContact = (contact) => {
    if (practiceTopic === 'Call a Contact') {
      onPracticeComplete && onPracticeComplete();
      setCompleted(true);
    }
  };

const handleReturn = () => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'PracticeMode' }],
  });
};

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.header}>Contacts</Text>

      {completed ? (
        <>
          <Text style={globalStyles.subheader}>📞 Contact Called!</Text>
          <TouchableOpacity style={globalStyles.button} onPress={handleReturn}>
            <Text style={globalStyles.buttonText}>Return</Text>
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
