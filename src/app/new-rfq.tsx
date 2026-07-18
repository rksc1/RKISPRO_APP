import React, { useState } from 'react';
import { View, Text, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function NewRFQScreen() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    serviceType: '',
    material: '',
    description: '',
    location: '',
    deadline: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = () => {
    const newErrors: Record<string, boolean> = {};
    if (!form.title) newErrors.title = true;
    if (!form.serviceType) newErrors.serviceType = true;
    if (!form.description) newErrors.description = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please fill in the required fields',
      });
      return;
    }

    setErrors({});
    setLoading(true);
    
    // Simulate API call to Supabase
    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Request Submitted',
        text2: 'RKISPro will review and share it with shortlisted vendors.',
      });
      router.back();
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <View style={{ paddingTop: insets.top || 48 }} className="px-4 pb-4 bg-surface/80 border-b border-outline-variant/20 flex-row items-center z-50">
        <Button 
          label="←" 
          variant="ghost" 
          size="sm" 
          onPress={() => router.back()} 
          className="mr-2"
          textClassName="text-2xl text-on-surface"
        />
        <Text className="text-2xl font-display font-bold text-on-surface">Post Requirement</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <View className="bg-primary/10 border border-primary/20 p-4 rounded-xl mb-6">
          <Text className="text-primary font-bold mb-1">RKISPro Managed Review</Text>
          <Text className="text-on-surface-variant text-sm">RKISPro reviews every requirement before sharing it with shortlisted vendors.</Text>
        </View>

        <Text className="text-on-surface font-display font-bold text-lg mb-4">Core Requirements</Text>

        <Card intensity={20} className="p-4 bg-surface-container-low border-outline-variant/30 mb-6">
          <View className="gap-4">
            <Input
              label="Project title *"
              placeholder="e.g. 500L SS Storage Tank"
              value={form.title}
              onChangeText={(val) => { setForm({ ...form, title: val }); setErrors(prev => ({...prev, title: false})); }}
            />
            {errors.title && <Text className="text-error text-xs -mt-3">Title is required</Text>}

            <Input
              label="Service type *"
              placeholder="e.g. Fabrication, Machining"
              value={form.serviceType}
              onChangeText={(val) => { setForm({ ...form, serviceType: val }); setErrors(prev => ({...prev, serviceType: false})); }}
            />
            {errors.serviceType && <Text className="text-error text-xs -mt-3">Service type is required</Text>}

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
              onChangeText={(val) => { setForm({ ...form, description: val }); setErrors(prev => ({...prev, description: false})); }}
              multiline
              numberOfLines={4}
              inputClassName="h-32 text-top"
              textAlignVertical="top"
            />
            {errors.description && <Text className="text-error text-xs -mt-3">Description is required</Text>}
          </View>
        </Card>

        <Text className="text-on-surface font-display font-bold text-lg mb-4">Logistics & Timeline</Text>

        <Card intensity={20} className="p-4 bg-surface-container-low border-outline-variant/30 mb-6">
          <View className="flex-row gap-4">
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
        </Card>

        <Button
          label="Submit Request"
          onPress={handleSubmit}
          isLoading={loading}
          className="mt-2"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
