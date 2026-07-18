import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import type { Vendor } from '@/hooks/api/useVendors';

export default function VendorProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('vendors')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        setVendor(data as Vendor);
      } catch (err) {
        console.error('Error fetching Vendor:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVendor();
  }, [id]);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#45e0e8" />
      </View>
    );
  }

  if (!vendor) {
    return (
      <View className="flex-1 bg-background justify-center items-center p-4">
        <Text className="text-on-surface font-display text-xl mb-4">Vendor not found.</Text>
        <Button label="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const nameToDisplay = vendor.company_name || vendor.full_name || 'Verified Vendor';

  return (
    <View className="flex-1 bg-background">
      <View className="absolute inset-0 opacity-20">
        <LinearGradient
          colors={['rgba(255, 185, 95, 0.15)', 'transparent']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300 }}
        />
      </View>

      <View style={{ paddingTop: insets.top || 48 }} className="px-4 pb-4 bg-surface/80 border-b border-outline-variant/20 flex-row items-center justify-between z-50">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full active:bg-surface-variant/50 mr-2">
          <MaterialIcons name="arrow-back" size={24} color="#ffb95f" />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full active:bg-surface-variant/50">
          <MaterialIcons name="share" size={24} color="#ffb95f" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 100) }} className="flex-1">
        
        {/* Header Profile Section */}
        <View className="items-center px-6 pt-8 pb-6 border-b border-outline-variant/10">
          <View className="w-24 h-24 bg-surface-container-highest rounded-full border-[3px] border-secondary/30 items-center justify-center mb-4 shadow-lg shadow-secondary/20">
            <Text className="text-secondary font-display text-4xl">
              {nameToDisplay.charAt(0)}
            </Text>
          </View>
          <Text className="font-display font-bold text-3xl text-on-surface text-center mb-1">
            {nameToDisplay}
          </Text>
          
          <View className="flex-row items-center gap-1 mb-4">
            <MaterialIcons name="verified" size={16} color="#45e0e8" />
            <Text className="text-primary font-bold text-sm">RKISPro Verified • {vendor.vendor_type || 'Professional'}</Text>
          </View>

          <View className="flex-row items-center justify-center gap-6 w-full mb-6">
            <View className="items-center">
              <View className="flex-row items-center gap-1 mb-1">
                <MaterialIcons name="star" size={20} color="#ffb95f" />
                <Text className="font-display font-bold text-xl text-on-surface">4.8</Text>
              </View>
              <Text className="text-on-surface-variant text-xs uppercase tracking-wider">Rating</Text>
            </View>
            <View className="w-[1px] h-8 bg-outline-variant/30" />
            <View className="items-center">
              <Text className="font-display font-bold text-xl text-on-surface mb-1">
                {vendor.experience_years || 5}+
              </Text>
              <Text className="text-on-surface-variant text-xs uppercase tracking-wider">Years Exp</Text>
            </View>
            <View className="w-[1px] h-8 bg-outline-variant/30" />
            <View className="items-center">
              <Text className="font-display font-bold text-xl text-on-surface mb-1">98%</Text>
              <Text className="text-on-surface-variant text-xs uppercase tracking-wider">Completion</Text>
            </View>
          </View>

          <View className="flex-row gap-3 w-full">
            <Button label="Request Quote" variant="primary" className="flex-1 shadow-lg shadow-primary/30" onPress={() => router.push('/new-rfq')} />
            <Button label="Message" variant="secondary" className="flex-1" />
          </View>
        </View>

        <View className="p-6">
          <Text className="font-display font-bold text-xl text-on-surface mb-4">About the Company</Text>
          <Text className="font-body text-base text-on-surface-variant leading-relaxed mb-8">
            {nameToDisplay} is a premier provider of construction and maintenance services in the {vendor.city || 'local'} area. With over {vendor.experience_years || 5} years of experience, we specialize in delivering high-quality results on time and within budget for both residential and commercial clients.
          </Text>

          <Text className="font-display font-bold text-xl text-on-surface mb-4">Service Areas</Text>
          <View className="flex-row flex-wrap gap-2 mb-8">
            {vendor.services && vendor.services.length > 0 ? (
              vendor.services.map((service, i) => (
                <View key={i} className="bg-surface-container-low border border-outline-variant/30 px-4 py-2 rounded-full">
                  <Text className="text-on-surface text-sm font-medium">{service}</Text>
                </View>
              ))
            ) : (
              <View className="bg-surface-container-low border border-outline-variant/30 px-4 py-2 rounded-full">
                <Text className="text-on-surface text-sm font-medium">General Contracting</Text>
              </View>
            )}
          </View>

          <Text className="font-display font-bold text-xl text-on-surface mb-4">Contact Info</Text>
          <Card className="p-4 bg-surface-container-lowest">
            <View className="flex-row items-center gap-3 mb-3">
              <View className="w-8 h-8 rounded-full bg-secondary/10 items-center justify-center">
                <MaterialIcons name="location-city" size={16} color="#ffb95f" />
              </View>
              <Text className="font-body text-on-surface">{vendor.location || `${vendor.city}, ${vendor.state}`}</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
                <MaterialIcons name="email" size={16} color="#45e0e8" />
              </View>
              <Text className="font-body text-on-surface">{vendor.email || 'Contact via platform'}</Text>
            </View>
          </Card>
        </View>

      </ScrollView>
    </View>
  );
}
