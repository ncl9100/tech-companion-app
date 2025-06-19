import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles';
import { SettingsContext } from '../SettingsContext';

export default function FavoritesScreen() {
  const { fontSize, favorites, setFavorites } = useContext(SettingsContext);

  const removeFavorite = (indexToRemove) => {
    const newFavorites = favorites.filter((_, index) => index !== indexToRemove);
    setFavorites(newFavorites);
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
          ⭐ My Favorite AI Responses
        </Text>

        {favorites.length === 0 && (
          <Text style={{ textAlign: 'center', fontSize, color: '#666' }}>
            No favorites yet.
          </Text>
        )}

        {favorites.map((item, index) => (
          <View key={index} style={[globalStyles.card, { position: 'relative' }]}>
            <Text style={{
              position: 'absolute',
              top: 10,
              right: 10,
              fontSize,
              color: 'gold',
            }}>
              ⭐
            </Text>

            <Text style={{ fontWeight: 'bold', fontSize }}>🧑 You: {item.question}</Text>
            <Text style={{ color: '#333', fontSize, marginTop: 5 }}>🤖 AI: {item.response}</Text>

            <TouchableOpacity
              onPress={() => removeFavorite(index)}
              style={{ marginTop: 10 }}
            >
              <Text style={{ color: '#FF3B30', fontSize }}>❌ Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
