import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { globalStyles, responsiveFontSize, responsivePadding } from '../styles';
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
          fontSize: responsiveFontSize(fontSize),
          fontWeight: 'bold',
          marginBottom: responsivePadding(15),
          textAlign: 'center'
        }}>
          ⭐ My Favorite AI Responses
        </Text>

        {favorites.length === 0 && (
          <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(fontSize), color: '#666' }}>
            No favorites yet.
          </Text>
        )}

        {favorites.map((item, index) => (
          <View key={index} style={[globalStyles.card, { position: 'relative' }]}>
            <Text style={{
              position: 'absolute',
              top: responsivePadding(10),
              right: responsivePadding(10),
              fontSize: responsiveFontSize(fontSize),
              color: 'gold',
            }}>
              ⭐
            </Text>

            <Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(fontSize) }}>🧑 You: {item.question}</Text>
            <Text style={{ color: '#333', fontSize: responsiveFontSize(fontSize), marginTop: responsivePadding(5) }}>🤖 AI: {item.response}</Text>

            <TouchableOpacity
              onPress={() => removeFavorite(index)}
              style={{ marginTop: responsivePadding(10) }}
            >
              <Text style={{ color: '#FF3B30', fontSize: responsiveFontSize(fontSize) }}>❌ Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
