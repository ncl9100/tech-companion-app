import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles';
import { SettingsContext } from '../SettingsContext';

export default function SettingsScreen() {
  const {
    fontSize,
    setFontSize,
    speechRate,
    setSpeechRate,
    favorites,
    setFavorites,
    clearCompletedGuides,
    completedGuides,
    readGuides
  } = useContext(SettingsContext);

  const clearFavorites = () => {
    setFavorites([]);
    alert('Favorites cleared!');
  };

  const handleClearCompletedGuides = () => {
    clearCompletedGuides();
    alert('Progress cleared!');
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <Text style={{
          fontSize,
          fontWeight: 'bold',
          marginBottom: 15,
          textAlign: 'center'
        }}>
          Settings ⚙️
        </Text>

        <Text style={{ marginTop: 20, fontSize, fontWeight: 'bold' }}>Font Size:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          {[16, 20, 24, 28].map(size => (
            <TouchableOpacity
              key={size}
              style={globalStyles.button}
              onPress={() => setFontSize(size)}
            >
              <Text style={globalStyles.buttonText}>
                {size} {fontSize === size ? '✅' : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{ marginTop: 20, fontSize, fontWeight: 'bold' }}>Speech Speed:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          {[
            { label: 'Slow', value: 0.7 },
            { label: 'Normal', value: 1.0 },
            { label: 'Fast', value: 1.3 },
          ].map(({ label, value }) => (
            <TouchableOpacity
              key={label}
              style={globalStyles.button}
              onPress={() => setSpeechRate(value)}
            >
              <Text style={globalStyles.buttonText}>
                {label} {speechRate === value ? '✅' : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{ marginTop: 20, fontSize, fontWeight: 'bold' }}>Progress:</Text>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: fontSize - 2, color: '#666' }}>
            📖 Guides read: {readGuides.length}
          </Text>
          <Text style={{ fontSize: fontSize - 2, color: '#666' }}>
            ✅ Guides completed: {completedGuides.length}
          </Text>
          <Text style={{ fontSize: fontSize - 2, color: '#666' }}>
            ⭐ Favorites saved: {favorites.length}
          </Text>
        </View>

        <TouchableOpacity
          style={[globalStyles.button, { backgroundColor: '#FF9500', marginTop: 10 }]}
          onPress={handleClearCompletedGuides}
        >
          <Text style={globalStyles.buttonText}>🔄 Reset Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.button, { backgroundColor: '#FF3B30', marginTop: 10 }]}
          onPress={clearFavorites}
        >
          <Text style={globalStyles.buttonText}>🗑️ Clear Favorites</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
