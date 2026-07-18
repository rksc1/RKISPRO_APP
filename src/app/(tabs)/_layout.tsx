import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '@/providers/AuthProvider';

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  
  // Filter out routes that have href === null
  const visibleRoutes = state.routes.filter((route: any) => descriptors[route.key].options.href !== null);

  return (
    <View style={{ paddingBottom: insets.bottom }} className="absolute bottom-0 left-0 right-0 z-50 rounded-t-xl overflow-hidden border-t border-outline-variant/20 shadow-lg">
      <BlurView intensity={20} tint="dark" className="bg-[#06222e]/80">
        <View className="flex-row justify-around items-center h-20 px-2 w-full">
          {visibleRoutes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === state.routes.findIndex((r: any) => r.key === route.key);

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          let iconName: any = 'help';
          if (route.name === 'index') iconName = 'home';
          if (route.name === 'vendors') iconName = 'groups';
          if (route.name === 'explore') iconName = 'request-quote';
          if (route.name === 'vendor') iconName = 'construction';
          if (route.name === 'profile') iconName = 'person';

          let label = route.name;
          if (route.name === 'index') label = 'Home';
          if (route.name === 'vendors') label = 'Directory';
          if (route.name === 'explore') label = 'Requests';
          if (route.name === 'vendor') label = 'Projects';
          if (route.name === 'profile') label = 'Profile';

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              className={`flex-col items-center justify-center gap-1 rounded-xl px-4 py-1 transition-transform active:scale-90 ${isFocused ? 'bg-primary-container/20' : ''}`}
            >
              <MaterialIcons 
                name={iconName} 
                size={24} 
                color={isFocused ? '#45e0e8' : '#bbc9ca'} 
              />
              <Text className={`font-label-md text-[12px] font-medium ${isFocused ? 'text-primary' : 'text-on-surface-variant'}`}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
        </View>
      </BlurView>
    </View>
  );
}

export default function TabsLayout() {
  const { user } = useAuth();
  const role = user?.user_metadata?.role || 'guest'; // 'customer', 'vendor', or 'guest'

  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ href: '/(tabs)' }} />
      <Tabs.Screen name="vendors" options={{ href: role === 'vendor' ? null : '/(tabs)/vendors' }} />
      <Tabs.Screen name="vendor" options={{ href: role === 'vendor' ? '/(tabs)/vendor' : null }} />
      <Tabs.Screen name="explore" options={{ href: role === 'vendor' ? '/(tabs)/explore' : null }} />
      <Tabs.Screen name="profile" options={{ href: role === 'guest' ? null : '/(tabs)/profile' }} />
    </Tabs>
  );
}
