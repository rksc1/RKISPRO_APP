import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, Modal, Alert, ActivityIndicator, KeyboardAvoidingView, FlatList } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { useRFQs } from '@/hooks/api/useRFQs';
import { useQuotes } from '@/hooks/api/useQuotes';
import { useAuth } from '@/providers/AuthProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRfq, setSelectedRfq] = useState<any>(null);
  
  // Bid State
  const [amount, setAmount] = useState('');
  const [timeline, setTimeline] = useState('');
  const [notes, setNotes] = useState('');

  const { rfqs, isLoading, error } = useRFQs();
  const { submitQuote, isSubmitting } = useQuotes();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  const openQuoteModal = (rfq: any) => {
    setSelectedRfq(rfq);
    setAmount('');
    setTimeline('');
    setNotes('');
    setModalVisible(true);
  };

  const handleSubmitQuote = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to submit a quote.');
      return;
    }
    if (!amount || !timeline || !notes) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      await submitQuote({
        vendor_id: user.id,
        request_id: selectedRfq.id,
        amount: parseFloat(amount),
        timeline,
        notes,
      });
      setModalVisible(false);
      Alert.alert('Success', 'Bid submitted successfully! The customer will review it shortly.');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to submit quote.');
    }
  };

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
        <TouchableOpacity>
          <Text className="text-primary text-xl">🔔</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={rfqs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        className="pt-4"
        ListHeaderComponent={
          <>
            <View className="mb-6 flex-col gap-1">
              <Text className="font-display font-bold text-[28px] text-on-surface">Request for Quotes</Text>
              <Text className="font-body text-base text-on-surface-variant">Review incoming vendor requests and submit your bids.</Text>
            </View>

            {/* Filters */}
            <Card className="mb-8 p-4 bg-surface-container-low/50">
              <View className="flex-row items-center gap-2 mb-4">
                <Text className="text-on-surface text-lg">⚙️</Text>
                <Text className="font-display font-bold text-lg text-on-surface">Filters</Text>
              </View>
              <View className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 mb-4">
                <Text className="text-on-surface">All Categories ▾</Text>
              </View>
              <Button label="Apply Filters" variant="secondary" size="sm" />
            </Card>
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator className="m-8" color="#45e0e8" size="large" />
          ) : (
            <Card className="p-8 items-center border-dashed border-2 border-outline-variant/50 bg-surface-container/30 mt-4">
              <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-4">
                <Text className="text-3xl">📋</Text>
              </View>
              <Text className="font-display text-lg text-on-surface font-bold text-center mb-2">No Open Requests</Text>
              <Text className="font-body text-sm text-on-surface-variant text-center">
                There are currently no new Request for Quotes matching your service categories. Check back later or adjust your filters.
              </Text>
            </Card>
          )
        }
        ItemSeparatorComponent={() => <View className="h-6" />}
        renderItem={({ item: rfq }) => (
          <Card intensity={30} className="p-6 border-outline-variant/30 hover:border-primary/30">
            <View className="flex-row items-center gap-3 mb-3">
              <View className="bg-secondary-container/20 border border-secondary-container/30 px-3 py-1 rounded-full">
                <Text className="text-secondary-fixed-dim text-xs font-medium">{rfq.budget_range || 'TBD'}</Text>
              </View>
              <Text className="text-caption text-on-surface-variant">Posted {new Date(rfq.created_at).toLocaleDateString()}</Text>
            </View>

            <Text className="font-display font-bold text-lg text-on-surface mb-2">{rfq.project_title}</Text>
            
            <View className="flex-row items-center gap-4 mb-3">
              <Text className="font-body text-xs text-on-surface-variant">📍 {rfq.location}</Text>
              <Text className="font-body text-xs text-on-surface-variant">⏱ Deadline: {new Date(rfq.deadline).toLocaleDateString()}</Text>
            </View>

            <Text className="font-body text-sm text-on-surface-variant mb-6" numberOfLines={2}>
              {rfq.description}
            </Text>

            <View className="flex-row gap-3 mt-auto">
              <Button label="Submit Quote" variant="primary" size="sm" className="flex-1" onPress={() => openQuoteModal(rfq)} />
              <Button label="View Details" variant="secondary" size="sm" className="flex-1" />
            </View>
          </Card>
        )}
      />

      {/* Quote Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          className="flex-1 justify-center items-center bg-background/80 px-4"
        >
          <Card intensity={50} className="w-full p-6 bg-[#0A1825]/90 border-primary/30 shadow-2xl">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="font-display font-bold text-xl text-on-surface">Submit Quote</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-on-surface-variant text-xl">✕</Text>
              </TouchableOpacity>
            </View>

            <View className="bg-primary-container/10 border border-primary/20 p-4 rounded-xl mb-6">
              <Text className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">RFQ REFERENCE</Text>
              <Text className="font-body font-bold text-on-surface">{selectedRfq?.id?.substring(0, 8)} - {selectedRfq?.project_title}</Text>
            </View>

            <View className="mb-4">
              <Text className="font-body text-sm font-medium text-on-surface-variant mb-2">Bid Amount ($)</Text>
              <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 flex-row items-center">
                <Text className="text-on-surface-variant mr-2">$</Text>
                <TextInput 
                  className="flex-1 text-on-surface font-body text-base" 
                  placeholderTextColor="#859394" 
                  placeholder="0.00" 
                  keyboardType="numeric" 
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="font-body text-sm font-medium text-on-surface-variant mb-2">Estimated Timeline</Text>
              <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 flex-row items-center">
                <TextInput 
                  className="flex-1 text-on-surface font-body text-base" 
                  placeholderTextColor="#859394" 
                  placeholder="e.g. 2 weeks" 
                  value={timeline}
                  onChangeText={setTimeline}
                />
              </View>
            </View>

            <View className="mb-8">
              <Text className="font-body text-sm font-medium text-on-surface-variant mb-2">Project Notes</Text>
              <TextInput 
                className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-on-surface font-body h-24 text-top" 
                placeholderTextColor="#859394" 
                placeholder="Outline your approach..." 
                multiline 
                textAlignVertical="top" 
                value={notes}
                onChangeText={setNotes}
              />
            </View>

            <View className="flex-row gap-4">
              <Button label="Cancel" variant="ghost" size="md" className="flex-1" onPress={() => setModalVisible(false)} disabled={isSubmitting} />
              <Button label={isSubmitting ? "Submitting..." : "Submit Bid"} variant="primary" size="md" className="flex-1" onPress={handleSubmitQuote} disabled={isSubmitting} />
            </View>
          </Card>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
