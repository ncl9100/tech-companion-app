import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles';

export default function LearnBasicsScreen({ navigation }) {
  // Fixed topics array → include guide_id for each topic:
  const topics = [
    { guide_id: 'connect_wifi', title: 'Connect to Wi-Fi' },
    { guide_id: 'settings_guide', title: 'Settings Guide' },
    { guide_id: 'camera_guide', title: 'Camera Guide' },
    { guide_id: 'contacts_guide', title: 'Contacts Guide' },
    { guide_id: 'safari_guide', title: 'Safari Guide' },
    { guide_id: 'enable_notifications', title: 'Enable Notifications' },
    { guide_id: 'adjust_volume', title: 'Adjust Volume' },
    { guide_id: 'open_maps', title: 'Open Maps' },
  ];

  const handleSelectTopic = (item) => {
    navigation.navigate('LearnBasicsGuide', { topic: item });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      }}>
        Learn the Basics
      </Text>

      <FlatList
        data={topics}
        keyExtractor={(item) => item.guide_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[globalStyles.card, { marginBottom: 10 }]}
            onPress={() => handleSelectTopic(item)}
          >
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
