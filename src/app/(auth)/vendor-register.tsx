import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import { router, Link } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { useProfileRegistration } from '@/hooks/api/useProfileRegistration';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function VendorRegisterScreen() {
  const [step, setStep] = useState(1);
  
  // Step 1 fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [vendorType, setVendorType] = useState<'individual' | 'company'>('individual');
  const [companyName, setCompanyName] = useState('');
  
  // Step 2 fields
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [skillCategories, setSkillCategories] = useState('');
  const [services, setServices] = useState('');
  const [workshopAddress, setWorkshopAddress] = useState('');

  const [loading, setLoading] = useState(false);
  const { registerRole } = useProfileRegistration();

  const handleNextStep = () => {
    if (!fullName || !email || !password || !phone || (vendorType === 'company' && !companyName)) {
      Alert.alert('Error', 'Please fill in all required fields to continue.');
      return;
    }
    setStep(2);
  };

  const handleRegister = async () => {
    if (!city || !state || !experienceYears) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (vendorType === 'individual' && !skillCategories) {
       Alert.alert('Error', 'Please enter your skill categories');
       return;
    }

    if (vendorType === 'company' && (!services || !workshopAddress)) {
       Alert.alert('Error', 'Please enter workshop address and services');
       return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'vendor',
        },
      },
    });

    if (error) {
      Alert.alert('Registration Failed', error.message);
      setLoading(false);
    } else if (data.user) {
      try {
        await registerRole(data.user.id, 'vendor', fullName, email, undefined, {
          type: vendorType,
          companyName: vendorType === 'company' ? companyName : undefined,
          phone,
          city,
          state,
          experienceYears: parseInt(experienceYears) || 0,
          skillCategories: vendorType === 'individual' ? skillCategories.split(',').map(s => s.trim()) : undefined,
          services: vendorType === 'company' ? services.split(',').map(s => s.trim()) : undefined,
          workshopAddress: vendorType === 'company' ? workshopAddress : undefined,
        });
        setLoading(false);
        router.replace('/(tabs)/vendor');
      } catch (err: any) {
        setLoading(false);
        Alert.alert('Profile Creation Failed', err.message);
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
          
          {step === 1 && (
             <TouchableOpacity className="mb-4 flex-row items-center gap-1" onPress={() => router.back()}>
               <MaterialIcons name="arrow-back" size={20} color="#45e0e8" />
               <Text className="text-primary font-bold">Back</Text>
             </TouchableOpacity>
          )}

          {step === 2 && (
             <TouchableOpacity className="mb-4 flex-row items-center gap-1" onPress={() => setStep(1)}>
               <MaterialIcons name="arrow-back" size={20} color="#45e0e8" />
               <Text className="text-primary font-bold">Back to Basic Info</Text>
             </TouchableOpacity>
          )}

          <View className="items-center mb-8">
            <View className="relative items-center justify-center mb-6">
              <View className="absolute w-24 h-24 bg-primary/20 rounded-full" style={{ shadowColor: '#45e0e8', shadowOpacity: 0.5, shadowRadius: 30 }} />
              <Image 
                source={require('@/assets/images/rkispro-logo.svg')}
                style={{ width: 80, height: 80, resizeMode: 'contain' }}
              />
            </View>
            <Text className="text-[28px] font-display font-bold text-on-surface mb-2 tracking-tight text-center">
              Vendor Onboarding
            </Text>
            <Text className="text-[13px] font-body text-on-surface-variant text-center">
              Step {step} of 2: {step === 1 ? 'Basic Details' : 'Professional Profile'}
            </Text>
          </View>

          <Card intensity={20} className="p-6 bg-[#0A1825]/60 border-outline-variant/30">
            <View className="gap-4">
              
              {step === 1 ? (
                <>
                  <View className="flex-row gap-2 mb-2 p-1 bg-surface-container-highest rounded-xl border border-outline-variant/30">
                    <TouchableOpacity 
                      className={`flex-1 items-center justify-center py-2 rounded-lg ${vendorType === 'individual' ? 'bg-primary/20 border border-primary/30' : ''}`}
                      onPress={() => setVendorType('individual')}
                    >
                      <Text className={`text-[12px] font-body font-bold ${vendorType === 'individual' ? 'text-primary' : 'text-on-surface-variant'}`}>Individual</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      className={`flex-1 items-center justify-center py-2 rounded-lg ${vendorType === 'company' ? 'bg-primary/20 border border-primary/30' : ''}`}
                      onPress={() => setVendorType('company')}
                    >
                      <Text className={`text-[12px] font-body font-bold ${vendorType === 'company' ? 'text-primary' : 'text-on-surface-variant'}`}>Company</Text>
                    </TouchableOpacity>
                  </View>

                  {vendorType === 'company' && (
                    <Input
                      label="Company Name *"
                      placeholder=" "
                      value={companyName}
                      onChangeText={setCompanyName}
                    />
                  )}

                  <Input
                    label="Full Name *"
                    placeholder=" "
                    value={fullName}
                    onChangeText={setFullName}
                  />
                  
                  <Input
                    label="Phone Number *"
                    placeholder=" "
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />

                  <Input
                    label="Work Email Address *"
                    placeholder=" "
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />

                  <Input
                    label="Create Password *"
                    placeholder=" "
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />

                  <Button
                    label="Continue"
                    onPress={handleNextStep}
                    className="mt-4"
                  />
                </>
              ) : (
                <>
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
                    label="Experience (Years) *"
                    placeholder=" "
                    value={experienceYears}
                    onChangeText={setExperienceYears}
                    keyboardType="numeric"
                  />

                  {vendorType === 'individual' && (
                    <Input
                      label="Skill Categories (comma separated) *"
                      placeholder="e.g. welder, mechanic"
                      value={skillCategories}
                      onChangeText={setSkillCategories}
                    />
                  )}

                  {vendorType === 'company' && (
                    <>
                      <Input
                        label="Services (comma separated) *"
                        placeholder="e.g. fabrication, machining"
                        value={services}
                        onChangeText={setServices}
                      />
                      <Input
                        label="Workshop Address *"
                        placeholder=" "
                        value={workshopAddress}
                        onChangeText={setWorkshopAddress}
                      />
                    </>
                  )}

                  <Button
                    label="Submit Vendor Profile"
                    onPress={handleRegister}
                    isLoading={loading}
                    className="mt-4"
                  />
                </>
              )}

            </View>
          </Card>

          {step === 1 && (
            <View className="mt-8 items-center gap-4">
              <Text className="text-[13px] font-body text-on-surface-variant">
                Already have an account?{' '}
                <Link href="/(auth)/login" className="text-primary font-semibold">
                  Sign in instead
                </Link>
              </Text>
            </View>
          )}

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
