import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import { router, Link } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Login Failed', error.message);
    } else {
      router.replace('/');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      {/* Ambient Mesh Background (Simulated via Gradients) */}
      <View className="absolute inset-0 opacity-20">
        <LinearGradient
          colors={['rgba(69,224,232,0.15)', 'transparent']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 400 }}
        />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <View className="w-full max-w-[440px] self-center">
          
          {/* Header */}
          <View className="items-center mb-8">
            <View className="relative items-center justify-center mb-6">
              <View className="absolute w-24 h-24 bg-primary/20 rounded-full" style={{ shadowColor: '#45e0e8', shadowOpacity: 0.5, shadowRadius: 30 }} />
              <Image 
                source={require('@/assets/images/rkispro-logo.svg')} // Placeholder, replace with actual imported PNG if SVG unsupported
                style={{ width: 80, height: 80, resizeMode: 'contain' }}
              />
            </View>
            <Text className="text-[28px] font-display font-bold text-on-surface mb-2 tracking-tight text-center">
              Welcome to RKISPro
            </Text>
            <Text className="text-[13px] font-body text-on-surface-variant text-center">
              Precision infrastructure management for B2B professionals.
            </Text>
            
            <TouchableOpacity 
              className="mt-6 flex-row items-center justify-center gap-2 bg-surface-container-highest border border-outline-variant/30 rounded-full px-5 py-2 w-full"
              onPress={() => router.replace('/(tabs)')}
            >
              <Text className="text-[13px] font-body font-semibold text-primary">Browse as Guest</Text>
            </TouchableOpacity>
          </View>

          {/* Login Form Card */}
          <Card intensity={20} className="p-6 bg-[#0A1825]/60 border-outline-variant/30">
            <View className="gap-4">
              <Input
                label="Work Email Address"
                placeholder=" "
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <View>
                <Input
                  label="Password"
                  placeholder=" "
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <TouchableOpacity className="self-end mt-2">
                  <Text className="text-[12px] font-body font-medium text-primary tracking-wide">
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                label="Sign In to Workspace"
                onPress={handleLogin}
                isLoading={loading}
                className="mt-4"
              />
            </View>
          </Card>

          {/* Footer Links */}
          <View className="mt-8 items-center gap-4">
            <Text className="text-[13px] font-body text-on-surface-variant">
              New to RKISPro?{' '}
              <Link href="/(auth)/role" className="text-primary font-semibold">
                Create workspace account
              </Link>
            </Text>
            
            <View className="flex-row items-center gap-6 mt-4">
              <Text className="text-[11px] font-body font-medium text-outline">Privacy Policy</Text>
              <View className="w-1 h-1 rounded-full bg-outline-variant" />
              <Text className="text-[11px] font-body font-medium text-outline">Terms of Service</Text>
              <View className="w-1 h-1 rounded-full bg-outline-variant" />
              <Text className="text-[11px] font-body font-medium text-outline">Security</Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
