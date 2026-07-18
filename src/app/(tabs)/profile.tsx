import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Platform, Alert } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import { Card } from '@/components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || 'Guest User';
  const [darkMode, setDarkMode] = useState(true);
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error logging out', error.message);
    } else {
      router.replace('/(auth)/login');
    }
  };

  return (
    <View className="flex-1 bg-background">
      <View className="absolute inset-0 opacity-20">
        <LinearGradient
          colors={['rgba(61, 218, 226, 0.15)', 'transparent']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 400 }}
        />
        <LinearGradient
          colors={['transparent', 'rgba(238, 152, 0, 0.1)']}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 400 }}
        />
      </View>

      <View style={{ paddingTop: insets.top || 48 }} className={`px-4 pb-4 bg-surface/80 border-b border-outline-variant/20 flex-row justify-between items-center z-50`}>
        <Text className="font-display font-bold text-xl text-primary tracking-tight">RKISPro</Text>
        <TouchableOpacity>
          <Text className="text-primary text-xl">🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} className="pt-8">
        
        {/* Profile Header */}
        <View className="items-center mb-10">
          <TouchableOpacity activeOpacity={0.8} className="relative mb-6 group">
            <View className="w-32 h-32 rounded-full border-4 border-primary/30 p-1 shadow-lg shadow-primary/20 bg-surface-container-highest">
              <View className="w-full h-full rounded-full overflow-hidden bg-primary/10 items-center justify-center">
                <Text className="text-[40px] text-primary font-bold">{userName.charAt(0)}</Text>
              </View>
            </View>
            <View className="absolute bottom-1 right-1 bg-primary w-8 h-8 rounded-full items-center justify-center border-2 border-background">
              <Text className="text-on-primary text-xs">✏️</Text>
            </View>
          </TouchableOpacity>
          
          <Text className="font-display font-bold text-[28px] text-on-surface mb-1">{userName}</Text>
          <Text className="font-body text-base text-on-surface-variant mb-3">Enterprise Account</Text>
          
          <View className="flex-row items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <View className="w-2 h-2 rounded-full bg-primary" />
            <Text className="font-body text-primary text-[10px] font-bold uppercase tracking-wider">Premium Member</Text>
          </View>
        </View>

        {/* Account Settings */}
        <Card className="mb-6 p-0 overflow-hidden border-outline-variant/30 bg-[#0A1825]/80">
          <View className="px-6 py-2 bg-surface-container-high/50 border-b border-outline-variant/10">
            <Text className="font-body text-primary uppercase tracking-widest text-[10px] font-bold">Account Management</Text>
          </View>
          
          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-outline-variant/10 active:bg-surface-container-highest/40">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-lg bg-primary-container/20 items-center justify-center">
                <Text className="text-primary text-lg">👤</Text>
              </View>
              <View>
                <Text className="font-body font-semibold text-base text-on-surface">Personal Information</Text>
                <Text className="font-body text-xs text-on-surface-variant mt-0.5">Manage your name, email, and bio</Text>
              </View>
            </View>
            <Text className="text-on-surface-variant">›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4 active:bg-surface-container-highest/40">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-lg bg-secondary-container/20 items-center justify-center">
                <Text className="text-secondary text-lg">🔒</Text>
              </View>
              <View>
                <Text className="font-body font-semibold text-base text-on-surface">Security & Privacy</Text>
                <Text className="font-body text-xs text-on-surface-variant mt-0.5">2FA, password, and active sessions</Text>
              </View>
            </View>
            <Text className="text-on-surface-variant">›</Text>
          </TouchableOpacity>
        </Card>

        {/* System Preferences */}
        <Card className="mb-8 p-0 overflow-hidden border-outline-variant/30 bg-[#0A1825]/80">
          <View className="px-6 py-2 bg-surface-container-high/50 border-b border-outline-variant/10">
            <Text className="font-body text-primary uppercase tracking-widest text-[10px] font-bold">System Preferences</Text>
          </View>
          
          <View className="flex-row items-center justify-between p-4 border-b border-outline-variant/10">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-lg bg-tertiary-container/20 items-center justify-center">
                <Text className="text-tertiary text-lg">🌙</Text>
              </View>
              <View>
                <Text className="font-body font-semibold text-base text-on-surface">Appearance</Text>
                <Text className="font-body text-xs text-on-surface-variant mt-0.5">Currently using system dark mode</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#1e3844', true: '#45e0e8' }}
              thumbColor={'#fff'}
            />
          </View>

          <TouchableOpacity className="flex-row items-center justify-between p-4 active:bg-surface-container-highest/40">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-lg bg-outline/10 items-center justify-center">
                <Text className="text-on-surface-variant text-lg">📱</Text>
              </View>
              <View>
                <Text className="font-body font-semibold text-base text-on-surface">Push Notifications</Text>
                <Text className="font-body text-xs text-on-surface-variant mt-0.5">Alerts for project updates and bids</Text>
              </View>
            </View>
            <Text className="text-on-surface-variant">›</Text>
          </TouchableOpacity>
        </Card>

        <TouchableOpacity 
          onPress={handleLogout}
          className="w-full h-14 bg-[#0A1825]/80 border border-red-500/20 rounded-xl flex-row items-center justify-center gap-2 active:bg-red-500/10 mb-4 shadow-sm"
        >
          <Text className="text-red-400 font-display font-bold text-lg">Logout Account</Text>
        </TouchableOpacity>
        
        <Text className="text-center font-body text-xs text-on-surface-variant/40">RKISPro Version 2.4.0 (Build 902) • Enterprise Tier</Text>

      </ScrollView>
    </View>
  );
}
