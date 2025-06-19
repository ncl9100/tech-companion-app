import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import guides from '../guides.json';

export default function PracticeModeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.guideItem}
      onPress={() =>
        navigation.navigate('SimulatedIphoneScreen', {
          practiceTopic: item.title,
          fromPracticeMode: true, // 👈 Add this param to control return flow
        })
      }
    >
      <Text style={styles.guideTitle}>{item.title}</Text>
      <Text style={styles.guideCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Practice Mode</Text>
      <FlatList
        data={guides}
        keyExtractor={(item) => item.guide_id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  guideItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  guideCategory: {
    fontSize: 14,
    color: 'gray',
  },
});
