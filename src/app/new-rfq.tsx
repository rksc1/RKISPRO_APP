import React, { useState } from 'react';
import { View, Text, ScrollView, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function NewRFQScreen() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    serviceType: '',
    material: '',
    description: '',
    location: '',
    deadline: '',
  });

  const handleSubmit = () => {
    if (!form.title || !form.serviceType || !form.description) {
      Alert.alert('Error', 'Please fill in the required fields (Title, Service Type, Description)');
      return;
    }

    setLoading(true);
    // Simulate API call to Supabase
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success', 
        'Your RFQ has been submitted! RKISPro will review and share it with shortlisted vendors.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-navy-950"
    >
      <View className={`px-6 pt-${Platform.OS === 'ios' ? '16' : '12'} pb-4 bg-navy-900 border-b border-navy-800 flex-row items-center`}>
        <Button 
          label="←" 
          variant="ghost" 
          size="sm" 
          onPress={() => router.back()} 
          className="mr-2"
          textClassName="text-2xl"
        />
        <Text className="text-2xl font-display font-bold text-white">Post Requirement</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <View className="bg-teal-500/10 border border-teal-500/20 p-4 rounded-xl mb-6">
          <Text className="text-teal-400 font-bold mb-1">RKISPro Managed Review</Text>
          <Text className="text-teal-100/70 text-sm">RKISPro reviews every requirement before sharing it with shortlisted vendors.</Text>
        </View>

        <Text className="text-white font-bold text-lg mb-4">Core Requirements</Text>

        <Input
          label="Project title *"
          placeholder="e.g. 500L SS Storage Tank"
          value={form.title}
          onChangeText={(val) => setForm({ ...form, title: val })}
        />

        <Input
          label="Service type *"
          placeholder="e.g. Fabrication, Machining"
          value={form.serviceType}
          onChangeText={(val) => setForm({ ...form, serviceType: val })}
        />

        <Input
          label="Material type"
          placeholder="e.g. SS 304, Mild Steel"
          value={form.material}
          onChangeText={(val) => setForm({ ...form, material: val })}
        />

        <Input
          label="Description *"
          placeholder="Describe what needs to be made or repaired..."
          value={form.description}
          onChangeText={(val) => setForm({ ...form, description: val })}
          multiline
          numberOfLines={4}
          inputClassName="h-32 text-top"
          textAlignVertical="top"
        />

        <View className="flex-row gap-4 mt-2 mb-6">
          <View className="flex-1">
            <Input
              label="City/Pincode"
              placeholder="Delivery loc"
              value={form.location}
              onChangeText={(val) => setForm({ ...form, location: val })}
            />
          </View>
          <View className="flex-1">
            <Input
              label="Deadline"
              placeholder="DD/MM/YYYY"
              value={form.deadline}
              onChangeText={(val) => setForm({ ...form, deadline: val })}
            />
          </View>
        </View>

        <Button
          label="Submit Request"
          onPress={handleSubmit}
          isLoading={loading}
          className="mt-4"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
