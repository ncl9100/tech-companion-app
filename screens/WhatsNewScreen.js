import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { globalStyles, responsiveFontSize, responsivePadding } from '../styles';
import { SettingsContext } from '../SettingsContext'; // Optional: for global font size

export default function WhatsNewScreen() {
  const { fontSize } = useContext(SettingsContext); // Optional
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Use environment variable for API key
      const newsApiKey = process.env.NEWS_API_KEY || '';
      
      if (!newsApiKey) {
        setArticles([]);
        return;
      }
      
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=artificial%20intelligence&sortBy=publishedAt&pageSize=10&apiKey=${newsApiKey}`
      );
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      setArticles([]);
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
          fontSize: responsiveFontSize(fontSize),
          fontWeight: 'bold',
          marginBottom: responsivePadding(15),
          textAlign: 'center'
        }}>
          📰 Latest AI News
        </Text>

        {loading && (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 20 }} />
        )}

        {!loading && articles.length === 0 && (
          <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(fontSize), color: '#666' }}>
            No news articles available.
          </Text>
        )}

        {articles.map((article, index) => (
          <View key={index} style={globalStyles.card}>
            <Text style={{ fontSize: responsiveFontSize(fontSize), fontWeight: 'bold', marginBottom: responsivePadding(5) }}>
              {article.title}
            </Text>
            {article.description && (
              <Text style={{ fontSize: responsiveFontSize(fontSize - 2), color: '#333', marginBottom: responsivePadding(10) }}>
                {article.description}
              </Text>
            )}
            <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
              <Text style={{ color: '#007AFF', fontSize: responsiveFontSize(fontSize) }}>Read More →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
