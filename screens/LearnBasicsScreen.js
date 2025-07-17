import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles';
import { SettingsContext } from '../SettingsContext';
import guides from '../guides.json';

export default function LearnBasicsScreen({ navigation }) {
  const { fontSize, isGuideCompleted, isGuideRead } = useContext(SettingsContext);

  const handleSelectTopic = (item) => {
    navigation.navigate('LearnBasicsGuide', { topic: item });
  };

  const renderGuideItem = ({ item }) => {
    const isCompleted = isGuideCompleted(item.guide_id);
    const isRead = isGuideRead(item.guide_id);
    
    let borderColor = '#007AFF'; // Default blue
    let backgroundColor = '#fff';
    let statusIcon = '';
    
    if (isCompleted) {
      borderColor = '#4CD964'; // Green for completed
      backgroundColor = '#F0FFF0';
      statusIcon = '✅';
    } else if (isRead) {
      borderColor = '#FF9500'; // Orange for read but not practiced
      backgroundColor = '#FFF8F0';
      statusIcon = '📖';
    }
    
    return (
      <TouchableOpacity
        style={[
          globalStyles.card, 
          { 
            marginBottom: 10,
            borderLeftWidth: 4,
            borderLeftColor: borderColor,
            backgroundColor: backgroundColor
          }
        ]}
        onPress={() => handleSelectTopic(item)}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: fontSize + 2, fontWeight: 'bold' }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: fontSize - 2, color: '#666', marginTop: 4 }}>
              {item.category} • {item.tags.join(', ')}
            </Text>
            {isRead && !isCompleted && (
              <Text style={{ fontSize: fontSize - 2, color: '#FF9500', marginTop: 2 }}>
                📖 Read - Practice to complete
              </Text>
            )}
          </View>
          {statusIcon && (
            <Text style={{ fontSize: fontSize + 4, color: borderColor }}>
              {statusIcon}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <Text style={{
        fontSize: fontSize + 6,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      }}>
        Learn the Basics 📚
      </Text>

      <Text style={{
        fontSize: fontSize - 2,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
      }}>
        Tap on any guide to start learning. Complete both the guide and practice to earn a checkmark! ✅
      </Text>

      <FlatList
        data={guides}
        keyExtractor={(item) => item.guide_id}
        renderItem={renderGuideItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
