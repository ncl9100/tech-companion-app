import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { globalStyles } from '../styles';
import { SettingsContext } from '../SettingsContext'; // Optional: for global font size

export default function WhatsNewScreen() {
  const { fontSize } = useContext(SettingsContext); // Optional
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=artificial%20intelligence&sortBy=publishedAt&pageSize=10&apiKey=2c772e2c750d4e839e6e938c64b9d1c3`
      );
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <Text style={{
          fontSize,
          fontWeight: 'bold',
          marginBottom: 15,
          textAlign: 'center'
        }}>
          📰 Latest AI News
        </Text>

        {loading && (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 20 }} />
        )}

        {!loading && articles.length === 0 && (
          <Text style={{ textAlign: 'center', fontSize, color: '#666' }}>
            No news articles available.
          </Text>
        )}

        {articles.map((article, index) => (
          <View key={index} style={globalStyles.card}>
            <Text style={{ fontSize, fontWeight: 'bold', marginBottom: 5 }}>
              {article.title}
            </Text>
            {article.description && (
              <Text style={{ fontSize: fontSize - 2, color: '#333', marginBottom: 10 }}>
                {article.description}
              </Text>
            )}
            <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
              <Text style={{ color: '#007AFF', fontSize }}>Read More →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
