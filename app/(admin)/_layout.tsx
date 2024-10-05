import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '@/provider/AuthProvider';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {isAdmin} = useAuth();
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Tabs
        screenOptions={{
          tabBarHideOnKeyboard:true,
          tabBarActiveTintColor: Colors.light.background,
          tabBarInactiveTintColor: "gainsboro",
          headerShown: useClientOnlyValue(false, true),
          tabBarStyle: {
            backgroundColor: Colors.light.tint,
          },
        }}
      >
        <Tabs.Screen name='index' options={{ href: null }} />
        <Tabs.Screen
          name="menu"
          options={{
            title: 'menu',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            headerShown:false,
            title: 'Orders',
            tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          }}
        />

<Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
       
        }}
      />
      </Tabs>
    </KeyboardAvoidingView>
  );
}
