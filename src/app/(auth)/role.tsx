import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { router, Link } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LinearGradient } from 'expo-linear-gradient';

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'vendor' | 'admin' | null>(null);

  const handleContinue = () => {
    if (!selectedRole) return;
    
    if (selectedRole === 'customer') {
      router.push('/(auth)/customer-register');
    } else if (selectedRole === 'vendor') {
      router.push('/(auth)/vendor-register');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="absolute inset-0 opacity-20">
        <LinearGradient
          colors={['rgba(69, 224, 232, 0.15)', 'transparent']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 400 }}
        />
      </View>

      <View className="flex-row items-center justify-center h-16 border-b border-outline-variant/20 z-50 px-4">
        <Text className="font-display font-bold text-xl text-primary tracking-tight">RKISPro</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <View className="w-full max-w-lg self-center">
          
          <View className="items-center mb-10">
            <Text className="font-display font-bold text-[32px] text-on-surface mb-2">Who are you?</Text>
            <Text className="font-body text-base text-on-surface-variant text-center max-w-[80%]">
              Select your primary role to customize your RKISPro experience.
            </Text>
          </View>

          <View className="gap-4 mb-10">
            {[
              { id: 'customer', icon: '👤', title: 'Customer', desc: 'Manage projects, hire vendors, and track construction progress in real-time.' },
              { id: 'vendor', icon: '🏗️', title: 'Vendor', desc: 'Find contracts, manage fleet operations, and streamline high-stakes bidding.' },
            ].map((role) => {
              const isActive = selectedRole === role.id;
              return (
                <TouchableOpacity
                  key={role.id}
                  activeOpacity={0.8}
                  onPress={() => {
                    setSelectedRole(role.id as any);
                    if (role.id === 'customer') router.push('/(auth)/customer-register');
                    if (role.id === 'vendor') router.push('/(auth)/vendor-register');
                  }}
                >
                  <Card intensity={isActive ? 40 : 20} className={`p-6 items-center flex-row gap-4 ${isActive ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20' : 'bg-[#0A1825]/60 border-outline-variant/30'}`}>
                    <View className={`w-14 h-14 rounded-full items-center justify-center ${isActive ? 'bg-primary/30' : 'bg-primary/10'}`}>
                      <Text className="text-2xl">{role.icon}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="font-display font-bold text-xl text-on-surface mb-1">{role.title}</Text>
                      <Text className="font-body text-sm text-on-surface-variant">{role.desc}</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="items-center mb-8 gap-4">
            <Button
              label="Continue"
              onPress={handleContinue}
              disabled={!selectedRole}
              size="lg"
              className="w-full max-w-[250px]"
            />
            <Text className="text-[13px] font-body text-on-surface-variant mt-4">
              Already have an account?{' '}
              <Link href="/(auth)/login" className="text-primary font-semibold">
                Sign in instead
              </Link>
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
