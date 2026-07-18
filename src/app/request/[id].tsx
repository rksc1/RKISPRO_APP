import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, FlatList } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRequestBids } from '@/hooks/api/useRequestBids';
import { useAcceptBid } from '@/hooks/api/useAcceptBid';
import { supabase } from '@/lib/supabase';
import type { MarketplaceRequestRow } from '@/models/MarketplaceRequest';

export default function RequestDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { bids, isLoading: bidsLoading } = useRequestBids(id);
  const { acceptBid, isAccepting } = useAcceptBid();
  
  const [rfq, setRfq] = React.useState<MarketplaceRequestRow | null>(null);
  const [rfqLoading, setRfqLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRFQ = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('marketplace_requests')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        setRfq(data as MarketplaceRequestRow);
      } catch (err) {
        console.error('Error fetching RFQ:', err);
      } finally {
        setRfqLoading(false);
      }
    };
    fetchRFQ();
  }, [id]);

  const handleAcceptBid = (bid: any) => {
    Alert.alert(
      'Accept Bid',
      'Are you sure you want to accept this quote? This will create an active Project.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Accept', 
          onPress: async () => {
            try {
              if (!rfq) return;
              await acceptBid({
                quote_id: bid.id,
                request_id: rfq.id,
                customer_id: rfq.customer_id,
                vendor_id: bid.vendor_id,
                amount: bid.amount
              });
              Alert.alert('Success', 'Quote Accepted! Project Created.');
              router.replace('/(tabs)');
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Failed to accept bid.');
            }
          }
        }
      ]
    );
  };

  if (rfqLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#45e0e8" />
      </View>
    );
  }

  if (!rfq) {
    return (
      <View className="flex-1 bg-background justify-center items-center p-4">
        <Text className="text-on-surface font-display text-xl mb-4">Request not found.</Text>
        <Button label="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <View className="absolute inset-0 opacity-20">
        <LinearGradient
          colors={['rgba(61, 218, 226, 0.15)', 'transparent']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300 }}
        />
      </View>

      <View style={{ paddingTop: insets.top || 48 }} className="px-4 pb-4 bg-surface/80 border-b border-outline-variant/20 flex-row items-center z-50">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full active:bg-surface-variant/50 mr-2">
          <MaterialIcons name="arrow-back" size={24} color="#45e0e8" />
        </TouchableOpacity>
        <Text className="font-display font-bold text-xl text-primary tracking-tight">Bid Review</Text>
      </View>

      <FlatList
        data={bids}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        className="pt-4"
        ListHeaderComponent={
          <>
            <View className="mb-6">
              <View className="flex-row items-center gap-2 mb-2">
                <View className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                  <Text className="text-primary text-[11px] font-medium uppercase">{rfq.service_type}</Text>
                </View>
                <Text className="text-on-surface-variant text-xs">Posted {new Date(rfq.created_at).toLocaleDateString()}</Text>
              </View>
              <Text className="font-display font-bold text-[28px] text-on-surface mb-4">{rfq.project_title}</Text>
              
              <View className="flex-row flex-wrap gap-4 mb-4">
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="location-on" size={16} color="#859394" />
                  <Text className="font-body text-sm text-on-surface-variant">{rfq.location}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="event" size={16} color="#859394" />
                  <Text className="font-body text-sm text-on-surface-variant">Deadline: {new Date(rfq.deadline).toLocaleDateString()}</Text>
                </View>
              </View>

              <Text className="font-body text-base text-on-surface-variant leading-relaxed">
                {rfq.description}
              </Text>
            </View>

            <View className="border-t border-outline-variant/20 pt-6 mb-6">
              <Text className="font-display text-xl text-on-surface mb-1">Vendor Quotes</Text>
              <Text className="font-body text-sm text-on-surface-variant">Review and compare bids from verified vendors.</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          bidsLoading ? (
            <ActivityIndicator className="m-8" color="#45e0e8" size="large" />
          ) : (
            <Card className="p-8 items-center border-dashed border-2 border-outline-variant/50 bg-surface-container/30 mt-4">
              <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-4">
                <MaterialIcons name="pending-actions" size={32} color="#45e0e8" />
              </View>
              <Text className="font-display text-lg text-on-surface font-bold text-center mb-2">No Bids Yet</Text>
              <Text className="font-body text-sm text-on-surface-variant text-center">
                Vendors have not submitted any quotes for this request yet. You will be notified when a bid is received.
              </Text>
            </Card>
          )
        }
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={({ item: bid }) => (
          <Card className="p-5 border-outline-variant/30 relative overflow-hidden">
            {bid.is_recommended && (
              <View className="absolute top-0 right-0 bg-secondary px-3 py-1 rounded-bl-lg">
                <Text className="text-on-secondary text-[10px] font-bold uppercase tracking-wider">Top Match</Text>
              </View>
            )}
            
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 bg-surface-container-highest rounded-full border border-primary/20 items-center justify-center">
                <Text className="text-primary font-bold text-lg">
                  {bid.vendors?.company_name?.charAt(0) || bid.vendors?.full_name?.charAt(0) || 'V'}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="font-display font-bold text-lg text-on-surface">
                  {bid.vendors?.company_name || bid.vendors?.full_name || 'Verified Vendor'}
                </Text>
                <View className="flex-row items-center gap-1 mt-0.5">
                  <MaterialIcons name="star" size={14} color="#ffb95f" />
                  <Text className="font-body text-xs text-on-surface-variant">
                    4.8 (24 reviews) • {bid.vendors?.experience_years || 5} yrs exp
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row flex-wrap bg-surface-container-lowest rounded-xl p-3 mb-4 border border-outline-variant/10">
              <View className="w-1/2 mb-2">
                <Text className="text-on-surface-variant text-[11px] uppercase tracking-wider mb-1">Bid Amount</Text>
                <Text className="font-display font-bold text-xl text-primary">${bid.amount.toLocaleString()}</Text>
              </View>
              <View className="w-1/2 mb-2">
                <Text className="text-on-surface-variant text-[11px] uppercase tracking-wider mb-1">Timeline</Text>
                <Text className="font-body font-semibold text-on-surface mt-1">{bid.timeline || 'Not specified'}</Text>
              </View>
              <View className="w-full">
                <Text className="text-on-surface-variant text-[11px] uppercase tracking-wider mb-1 mt-2">Vendor Notes</Text>
                <Text className="font-body text-sm text-on-surface">{bid.notes || 'No additional notes provided.'}</Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <Button label="Message" variant="secondary" size="sm" className="flex-1" onPress={() => router.push(`/chat/${bid.id}`)} />
              <Button label={isAccepting ? "Accepting..." : "Accept Bid"} variant="primary" size="sm" className="flex-1" onPress={() => handleAcceptBid(bid)} disabled={isAccepting} />
            </View>
          </Card>
        )}
      />
    </View>
  );
}
