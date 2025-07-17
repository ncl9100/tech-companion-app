import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import LearnBasicsScreen from './screens/LearnBasicsScreen';
import LearnBasicsGuideScreen from './screens/LearnBasicsGuideScreen';
import SimulatedIphoneScreen from './screens/SimulatedIphoneScreen';
import SettingsAppScreen from './screens/SettingsAppScreen';
import CameraAppScreen from './screens/CameraAppScreen';
import ContactsAppScreen from './screens/ContactsAppScreen';
import SafariAppScreen from './screens/SafariAppScreen';
import AskAIHelperScreen from './screens/AskAIHelperScreen';
import WhatsNewScreen from './screens/WhatsNewScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SettingsScreen from './screens/SettingsScreen';
import GuidePlayerScreen from './screens/GuidePlayerScreen';
import { SettingsProvider } from './SettingsContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Learn') iconName = 'book';
          else if (route.name === 'Ask AI') iconName = 'chatbox-ellipses';
          else if (route.name === 'Favorites') iconName = 'star';
          else if (route.name === 'WhatsNew') iconName = 'newspaper';
          else if (route.name === 'Settings') iconName = 'settings';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 14 },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Learn" component={LearnBasicsScreen} />
      <Tab.Screen name="Ask AI" component={AskAIHelperScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="WhatsNew" component={WhatsNewScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LearnBasicsGuide"
            component={LearnBasicsGuideScreen}
            options={{ title: 'Guide' }}
          />
          <Stack.Screen
            name="GuidePlayerScreen"
            component={GuidePlayerScreen}
            options={{ title: 'Guide Player' }}
          />
          <Stack.Screen
            name="SimulatedIphoneScreen"
            component={SimulatedIphoneScreen}
            options={{ title: 'Simulated iPhone' }}
          />
          <Stack.Screen
            name="SettingsAppScreen"
            component={SettingsAppScreen}
            options={{ title: 'Settings' }}
          />
          <Stack.Screen
            name="CameraAppScreen"
            component={CameraAppScreen}
            options={{ title: 'Camera' }}
          />
          <Stack.Screen
            name="ContactsAppScreen"
            component={ContactsAppScreen}
            options={{ title: 'Contacts' }}
          />
          <Stack.Screen
            name="SafariAppScreen"
            component={SafariAppScreen}
            options={{ title: 'Safari' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}
