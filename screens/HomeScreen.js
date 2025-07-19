import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles, responsiveFontSize } from '../styles';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={styles.header}>Welcome to ElderlyAI👋</Text>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Learn')}
      >
        <Text style={globalStyles.buttonText}>📖 Learn Basics</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Ask AI')}
      >
        <Text style={globalStyles.buttonText}>🤖 Ask AI Helper</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('WhatsNew')}
      >
        <Text style={globalStyles.buttonText}>📰 What's New</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: responsiveFontSize(26),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
});
