import React from 'react';
import { View, Text, TouchableOpacity, Platform, ActivityIndicator, FlatList } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import { useProjects } from '@/hooks/api/useProjects';
import { useRFQs } from '@/hooks/api/useRFQs';
import { Card } from '@/components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/ui/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function VendorDashboardScreen() {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || 'Site Solutions Ltd.';
  const { projects, isLoading: projectsLoading } = useProjects(user?.id, 'vendor');
  const { rfqs, isLoading: rfqsLoading } = useRFQs();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <View className="absolute inset-0 opacity-20">
        <LinearGradient
          colors={['rgba(69, 224, 232, 0.15)', 'transparent']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300 }}
        />
        <LinearGradient
          colors={['transparent', 'rgba(238, 152, 0, 0.1)']}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 300 }}
        />
      </View>

      <View style={{ paddingTop: insets.top || 48 }} className={`px-4 pb-4 bg-surface/80 border-b border-outline-variant/20 flex-row justify-between items-center z-50`}>
        <Text className="font-display font-bold text-xl text-primary tracking-tight">RKISPro</Text>
        <View className="flex-row items-center gap-3">
          <View className="w-8 h-8 rounded-full border border-primary/30 overflow-hidden bg-surface-container-highest items-center justify-center">
            <Text className="text-primary font-bold">V</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-primary text-xl">🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={rfqs.slice(0, 3)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        className="pt-4"
        ListHeaderComponent={
          <>
            <View className="mb-6">
              <Text className="font-display font-bold text-[28px] text-on-surface mb-1">Vendor Dashboard</Text>
              <Text className="font-body text-base text-on-surface-variant">Welcome back, {userName}.</Text>
            </View>

            <View className="mb-6 flex-row flex-wrap justify-between">
              <Card className="w-full p-6 mb-4 overflow-hidden relative">
                <View className="absolute -right-8 -bottom-8 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
                <Text className="font-body font-medium text-xs text-on-surface-variant uppercase tracking-wider mb-2">Total Earnings</Text>
                <Text className="font-display font-bold text-[32px] text-primary mb-2">{!user ? '-' : '$0.00'}</Text>
              </Card>

              <View className="flex-row justify-between w-full gap-4">
                <Card className="flex-1 p-4 flex-row items-center justify-between">
                  <View>
                    <Text className="text-on-surface-variant text-xs font-medium mb-1">Active Projects</Text>
                    <Text className="text-on-surface font-display font-bold text-2xl">
                      {projectsLoading ? '-' : projects.filter(p => p.status === 'in_progress' || p.status === 'awarded').length}
                    </Text>
                  </View>
                  <View className="bg-primary/10 w-10 h-10 rounded-lg items-center justify-center">
                    <Text className="text-primary text-lg">🏗️</Text>
                  </View>
                </Card>
                
                <Card className="flex-1 p-4 flex-row items-center justify-between">
                  <View>
                    <Text className="text-on-surface-variant text-xs font-medium mb-1">Pending RFQs</Text>
                    <Text className="text-secondary font-display font-bold text-2xl">
                      {rfqsLoading ? '-' : rfqs.length}
                    </Text>
                  </View>
                  <View className="bg-secondary/10 w-10 h-10 rounded-lg items-center justify-center">
                    <Text className="text-secondary text-lg">📋</Text>
                  </View>
                </Card>
              </View>
            </View>

            <View className="flex-row gap-3 mb-8">
              <Button label="New RFQ Response" variant="primary" size="sm" className="flex-1" />
              <Button label="Earnings" variant="ghost" size="sm" />
              <Button label="Support" variant="ghost" size="sm" />
            </View>

            <View className="mb-6 flex-row justify-between items-end">
              <Text className="font-display font-bold text-[20px] text-on-surface">New Opportunities</Text>
              <TouchableOpacity>
                <Text className="text-primary font-medium text-xs hover:underline">View All RFQs</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        ListEmptyComponent={
          rfqsLoading ? (
            <ActivityIndicator size="large" color="#45e0e8" className="m-8" />
          ) : (
            <Card className="p-8 items-center border-dashed border-2 border-outline-variant/50 bg-surface-container/30">
              <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-4">
                <Text className="text-3xl">📭</Text>
              </View>
              <Text className="font-display text-lg text-on-surface font-bold text-center mb-2">No New Opportunities</Text>
              <Text className="font-body text-sm text-on-surface-variant text-center mb-6">
                There are currently no new Request for Quotes. Expand your service coverage in your profile settings to receive more opportunities.
              </Text>
              <Button label="Update Profile Services" variant="primary" size="sm" />
            </Card>
          )
        }
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={({ item: rfq }) => (
          <Card className="p-4">
            <View className="flex-row gap-3 mb-3">
              <View className="w-12 h-12 bg-surface-container-highest rounded-lg border border-outline-variant/30 items-center justify-center">
                <Text className={`text-primary text-xl`}>🏢</Text>
              </View>
              <View className="flex-1">
                <View className="flex-row items-center gap-2 mb-1">
                  <Text className="font-body font-bold text-base text-on-surface flex-1" numberOfLines={1}>{rfq.project_title}</Text>
                </View>
                <View className={`bg-primary/10 self-start px-2 py-0.5 rounded-full mb-1`}>
                  <Text className={`text-primary text-[10px] font-bold uppercase`}>{rfq.service_type}</Text>
                </View>
                <Text className="font-body text-[12px] text-on-surface-variant">📍 {rfq.location}</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between mt-2">
              <View>
                <Text className="text-on-surface-variant text-[11px] mb-0.5">Estimated Value</Text>
                <Text className="text-on-surface font-bold text-sm">{rfq.budget_range || 'TBD'}</Text>
              </View>
              <Button label="Submit Quote" variant="ghost" size="sm" className="bg-primary-container/20 border-0" textClassName="text-primary" />
            </View>
          </Card>
        )}
      />
    </View>
  );
}
