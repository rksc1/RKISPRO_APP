import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Platform, FlatList } from 'react-native';
import { Card } from '@/components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useVendors } from '@/hooks/api/useVendors';
import { router } from 'expo-router';

export default function VendorsDirectoryScreen() {
  const insets = useSafeAreaInsets();
  const { vendors, isLoading } = useVendors();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'company' | 'individual'>('all');

  const filteredVendors = vendors.filter(v => {
    // Apply type filter
    if (selectedFilter !== 'all' && v.vendor_type !== selectedFilter) return false;
    
    // Apply search filter (city, company name, skill, etc)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = (v.company_name || v.full_name || v.owner_name || '').toLowerCase().includes(q);
      const matchCity = (v.city || v.location || '').toLowerCase().includes(q);
      const matchServices = [...(v.services || []), ...(v.skill_categories || [])].some(s => s.toLowerCase().includes(q));
      return matchName || matchCity || matchServices;
    }
    
    return true;
  });

  return (
    <View className="flex-1 bg-background">
      <View className="absolute inset-0 opacity-20">
        <LinearGradient
          colors={['rgba(69, 224, 232, 0.15)', 'transparent']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 400 }}
        />
      </View>

      <View style={{ paddingTop: insets.top || 48 }} className={`px-4 pb-4 bg-surface/80 border-b border-outline-variant/20 flex-row justify-between items-center z-50`}>
        <Text className="font-display font-bold text-xl text-primary tracking-tight">RKISPro</Text>
      </View>

      <FlatList
        data={filteredVendors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        className="pt-4"
        ListHeaderComponent={
          <>
            <View className="mb-6 flex-col gap-1">
              <Text className="font-display font-bold text-[28px] text-on-surface">Vendor Directory</Text>
              <Text className="font-body text-base text-on-surface-variant">Find and connect with verified industrial vendors.</Text>
            </View>

            {/* Search & Filters */}
            <Card className="mb-8 p-4 bg-surface-container-low/50">
              <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 flex-row items-center mb-4">
                <MaterialIcons name="search" size={20} color="#859394" />
                <TextInput 
                  className="flex-1 ml-2 text-on-surface font-body text-base"
                  placeholderTextColor="#859394"
                  placeholder="Search by name, city, or service..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              
              <View className="flex-row gap-2">
                {(['all', 'company', 'individual'] as const).map(f => (
                  <TouchableOpacity 
                    key={f}
                    onPress={() => setSelectedFilter(f)}
                    className={`px-4 py-2 rounded-full border ${selectedFilter === f ? 'bg-primary/20 border-primary' : 'border-outline-variant/30 bg-surface-container'}`}
                  >
                    <Text className={`font-body text-sm capitalize ${selectedFilter === f ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{f}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator className="m-8" color="#45e0e8" size="large" />
          ) : (
            <Card className="p-8 items-center border-dashed border-2 border-outline-variant/50 bg-surface-container/30 mt-4">
              <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-4">
                <Text className="text-3xl">🔍</Text>
              </View>
              <Text className="font-display text-lg text-on-surface font-bold text-center mb-2">No Vendors Found</Text>
              <Text className="font-body text-sm text-on-surface-variant text-center">
                We couldn't find any vendors matching your search or filters. Try adjusting your search terms.
              </Text>
            </Card>
          )
        }
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={({ item: vendor }) => {
          const displayName = vendor.vendor_type === 'company' ? (vendor.company_name || vendor.owner_name) : (vendor.full_name || vendor.owner_name);
          const location = vendor.city ? `${vendor.city}, ${vendor.state}` : vendor.location;
          const tags = vendor.vendor_type === 'company' ? vendor.services : vendor.skill_categories;

          return (
            <TouchableOpacity onPress={() => router.push(`/vendor/profile/${vendor.id}`)} activeOpacity={0.8}>
              <Card className="p-5">
                <View className="flex-row gap-4 mb-4">
                  <View className="w-14 h-14 bg-surface-container-highest rounded-xl border border-outline-variant/30 items-center justify-center">
                    <Text className="text-2xl">{vendor.vendor_type === 'company' ? '🏭' : '👷‍♂️'}</Text>
                  </View>
                  <View className="flex-1">
                    <View className="flex-row justify-between items-start">
                      <Text className="font-display font-bold text-lg text-on-surface flex-1" numberOfLines={1}>{displayName}</Text>
                      <View className="bg-primary/10 px-2 py-0.5 rounded flex-row items-center gap-1">
                        <Text className="text-primary text-[10px] font-bold uppercase">{vendor.vendor_type}</Text>
                      </View>
                    </View>
                    <Text className="font-body text-sm text-on-surface-variant mt-1">📍 {location || 'No location specified'}</Text>
                    {vendor.experience_years > 0 && (
                      <Text className="font-body text-xs text-on-surface-variant mt-1">⭐ {vendor.experience_years} Years Experience</Text>
                    )}
                  </View>
                </View>

                {tags && tags.length > 0 && (
                  <View className="flex-row flex-wrap gap-2">
                    {tags.slice(0, 3).map((tag, i) => (
                      <View key={i} className="bg-secondary-container/20 border border-secondary-container/30 px-2 py-1 rounded">
                        <Text className="text-secondary-fixed-dim text-[10px] uppercase font-bold">{tag}</Text>
                      </View>
                    ))}
                    {tags.length > 3 && (
                      <View className="bg-surface-variant/30 px-2 py-1 rounded">
                        <Text className="text-on-surface-variant text-[10px] font-bold">+{tags.length - 3} MORE</Text>
                      </View>
                    )}
                  </View>
                )}
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
