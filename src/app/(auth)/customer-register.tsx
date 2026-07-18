import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router, Link } from 'expo-router';
import Toast from 'react-native-toast-message';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { useProfileRegistration } from '@/hooks/api/useProfileRegistration';

export default function CustomerRegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerRole } = useProfileRegistration();

  const handleRegister = async () => {
    if (!fullName || !email || !password || !phone || !city || !state) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all required fields',
      });
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'customer',
        },
      },
    });

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error.message,
      });
      setLoading(false);
    } else if (data.user) {
      try {
        await registerRole(data.user.id, 'customer', fullName, email, {
          phone,
          companyName,
          city,
          state,
          location: `${city}, ${state}`
        });
        setLoading(false);
        router.replace('/(tabs)');
      } catch (err: any) {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Profile Creation Failed',
          text2: err.message,
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <View className="absolute inset-0 opacity-20">
        <LinearGradient
          colors={['rgba(69,224,232,0.15)', 'transparent']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 400 }}
        />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <View className="w-full max-w-[440px] self-center">
          
          <View className="items-center mb-8">
            <View className="relative items-center justify-center mb-6">
              <View className="absolute w-24 h-24 bg-primary/20 rounded-full" style={{ shadowColor: '#45e0e8', shadowOpacity: 0.5, shadowRadius: 30 }} />
              <Image 
                source={require('@/assets/images/rkispro-logo.svg')}
                style={{ width: 80, height: 80, resizeMode: 'contain' }}
              />
            </View>
            <Text className="text-[28px] font-display font-bold text-on-surface mb-2 tracking-tight text-center">
              Customer Registration
            </Text>
            <Text className="text-[13px] font-body text-on-surface-variant text-center">
              Post RFQs, compare verified quotations, and manage industrial projects.
            </Text>
          </View>

          <Card intensity={20} className="p-6 bg-[#0A1825]/60 border-outline-variant/30">
            <View className="gap-4">
              <Input
                label="Full Name *"
                placeholder=" "
                value={fullName}
                onChangeText={setFullName}
              />
              
              <Input
                label="Company Name (Optional)"
                placeholder=" "
                value={companyName}
                onChangeText={setCompanyName}
              />

              <Input
                label="Phone Number *"
                placeholder=" "
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <View className="flex-row gap-4">
                <View className="flex-1">
                  <Input
                    label="City *"
                    placeholder=" "
                    value={city}
                    onChangeText={setCity}
                  />
                </View>
                <View className="flex-1">
                  <Input
                    label="State *"
                    placeholder=" "
                    value={state}
                    onChangeText={setState}
                  />
                </View>
              </View>

              <Input
                label="Work Email Address *"
                placeholder=" "
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <Input
                label="Create Password"
                placeholder=" "
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Button
                label="Create Customer Account"
                onPress={handleRegister}
                isLoading={loading}
                className="mt-4"
              />

            </View>
          </Card>

          <View className="mt-8 items-center gap-4">
            <Text className="text-[13px] font-body text-on-surface-variant">
              Already have an account?{' '}
              <Link href="/(auth)/login" className="text-primary font-semibold">
                Sign in instead
              </Link>
            </Text>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
