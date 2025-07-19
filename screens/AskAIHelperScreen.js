import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import React, { useState, useRef, useContext } from 'react';
import {
  View, TextInput, Text, ScrollView, TouchableOpacity, Keyboard, Alert
} from 'react-native';
import axios from 'axios';
import { globalStyles, responsiveFontSize, responsivePadding } from '../styles';
import { SettingsContext } from '../SettingsContext';

// IMPORTANT: You must securely provide your OpenAI API key for production use.
// DO NOT hardcode your API key in the source code for App Store submission.
// Recommended: Use environment variables or a secure backend proxy.
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

export default function AskAIHelperScreen() {
  const { fontSize, speechRate, favorites, setFavorites } = useContext(SettingsContext);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollViewRef = useRef();

  const askAI = async () => {
    if (!question) return;

    // Check if API key is available
    if (!OPENAI_API_KEY) {
      setResponse('AI service is not configured. Please contact support.');
      setLoading(false);
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    setResponse('🤖 AI is typing...');

    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant for elderly people trying to use new technology. Answer simply and clearly.',
            },
            {
              role: 'user',
              content: question,
            },
          ],
          max_tokens: 300,
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const aiMessage = result.data.choices[0].message.content.trim();
      setResponse('');
      setQuestion('');

      const newEntry = { question, response: aiMessage };
      setHistory(prev => [...prev, newEntry]);

      setIsSpeaking(true);
      setTimeout(() => {
        Speech.speak(aiMessage, {
          language: 'en-US',
          rate: speechRate,
          onDone: () => setIsSpeaking(false),
        });
      }, 100);

      scrollViewRef.current?.scrollToEnd({ animated: true });

    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        setResponse('AI service authentication failed. Please contact support.');
      } else if (error.response?.status === 429) {
        setResponse('AI service is busy. Please try again later.');
      } else {
        setResponse('Error contacting AI. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setResponse('');
    Speech.stop();
    setIsSpeaking(false);
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      if (history.length > 0) {
        const lastEntry = history[history.length - 1];
        setIsSpeaking(true);
        setTimeout(() => {
          Speech.speak(lastEntry.response, {
            language: 'en-US',
            rate: speechRate,
            onDone: () => setIsSpeaking(false),
          });
        }, 100);
      }
    }
  };

  const toggleFavorite = (item) => {
    const isFavorited = favorites.some(
      fav => fav.response === item.response && fav.question === item.question
    );

    if (isFavorited) {
      setFavorites(
        favorites.filter(
          fav => !(fav.response === item.response && fav.question === item.question)
        )
      );
      Alert.alert('❌ Removed from Favorites');
    } else {
      setFavorites([...favorites, item]);
      Alert.alert('⭐ Added to Favorites');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        contentContainerStyle={{
          padding: responsivePadding(20),
          paddingBottom: responsivePadding(50),
          flexGrow: 1,
        }}
        ref={scrollViewRef}
      >
        <Text style={{
          fontSize: responsiveFontSize(fontSize),
          fontWeight: 'bold',
          marginBottom: responsivePadding(15),
          textAlign: 'center'
        }}>
          Ask AI Helper 🤖
        </Text>

        {/* Single suggestion button for clean UI */}
        <TouchableOpacity
          style={[globalStyles.button, { marginBottom: responsivePadding(10) }]}
          onPress={() => setQuestion("How do I use my iPhone camera?")}
        >
          <Text style={[globalStyles.buttonText, { fontSize: responsiveFontSize(fontSize) }]}>
            Example: How do I use my iPhone camera?
          </Text>
        </TouchableOpacity>

        <TextInput
          style={globalStyles.input}
          placeholder="Ask a question..."
          value={question}
          onChangeText={setQuestion}
        />

        <TouchableOpacity style={globalStyles.button} onPress={askAI} disabled={loading}>
          <Text style={[globalStyles.buttonText, { fontSize }]}>
            {loading ? 'Loading...' : 'Send'}
          </Text>
        </TouchableOpacity>

        <Text style={{ marginTop: responsivePadding(20), fontSize: responsiveFontSize(fontSize), fontWeight: 'bold' }}>Conversation History:</Text>
        {history.map((item, index) => {
          const isFavorited = favorites.some(
            fav => fav.response === item.response && fav.question === item.question
          );

          return (
            <View
              key={index}
              style={[globalStyles.card, { position: 'relative', paddingRight: 50 }]} // add paddingRight so text never overlaps star
            >
              <TouchableOpacity
                onPress={() => toggleFavorite(item)}
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  width: 40, // big hit area
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  fontSize: fontSize + 6, // big star
                  color: isFavorited ? 'gold' : '#ccc',
                }}>
                  ⭐
                </Text>
              </TouchableOpacity>

              <Text style={{ fontWeight: 'bold', fontSize }}>🧑 You: {item.question}</Text>
              <Text style={{ color: '#333', fontSize, marginTop: 5 }}>🤖 AI: {item.response}</Text>
            </View>
          );
        })}

        <TouchableOpacity
          style={[
            globalStyles.button,
            { backgroundColor: isSpeaking ? '#FF9500' : '#4CD964', marginTop: 10 }
          ]}
          onPress={toggleSpeaking}
        >
          <Text style={[globalStyles.buttonText, { fontSize }]}>
            {isSpeaking ? '🛑 Stop Speaking' : '▶️ Play Last Response'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.button, { backgroundColor: '#FF3B30', marginTop: 10 }]}
          onPress={clearHistory}
        >
          <Text style={[globalStyles.buttonText, { fontSize }]}>🗑️ Clear Conversation History</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
