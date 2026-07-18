import React from 'react';
import { View, Text, TouchableOpacity, Image, Platform, ActivityIndicator, FlatList } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { useProjects } from '@/hooks/api/useProjects';
import { useCustomerRFQs } from '@/hooks/api/useCustomerRFQs';
import { Card } from '@/components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user } = useAuth();
  const { projects, isLoading } = useProjects(user?.id, 'customer');
  const { rfqs, isLoading: rfqsLoading } = useCustomerRFQs(user?.id);
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'Guest';
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      {/* Ambient Mesh Background */}
      <View className="absolute inset-0 opacity-20">
        <LinearGradient
          colors={['rgba(61, 218, 226, 0.15)', 'transparent']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300 }}
        />
        <LinearGradient
          colors={['transparent', 'rgba(238, 152, 0, 0.05)']}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 300 }}
        />
      </View>

      {/* TopAppBar */}
      <View style={{ paddingTop: insets.top || 48 }} className={`px-4 pb-4 bg-surface/80 border-b border-outline-variant/20 flex-row justify-between items-center z-50`}>
        <View className="flex-row items-center gap-2">
          <View className="w-10 h-10 rounded-full border border-primary/30 overflow-hidden bg-surface-container-highest items-center justify-center">
            <Text className="text-primary font-bold">{userName.charAt(0)}</Text>
          </View>
          <Text className="font-display font-bold text-xl text-primary tracking-tight">RKISPro</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full active:bg-surface-variant/50">
          <MaterialIcons name="notifications" size={24} color="#45e0e8" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        className="pt-4"
        ListHeaderComponent={
          <>
            {/* Greeting */}
            <View className="mb-6 flex-row justify-between items-center">
              <View>
                <Text className="font-display text-display-lg text-on-surface mb-1">Good Morning, {userName}</Text>
                <Text className="font-body text-body-md text-on-surface-variant">Here is your project overview for today.</Text>
              </View>
              {!user && (
                <TouchableOpacity onPress={() => router.replace('/(auth)/login')} className="bg-primary/20 px-4 py-2 rounded-full border border-primary/30">
                  <Text className="text-primary font-bold text-xs uppercase">Login / Register</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Stats Bento */}
            <View className="flex-row flex-wrap justify-between mb-6">
              <Card className="w-[48%] p-4 mb-4">
                <View className="flex-row items-center justify-between mb-3">
                  <MaterialIcons name="construction" size={24} color="#45e0e8" />
                  <View className="bg-primary/10 px-2 py-0.5 rounded-lg">
                    <Text className="text-primary text-caption">Active</Text>
                  </View>
                </View>
                <Text className="text-on-surface-variant text-label-md mb-1">Active Projects</Text>
                <Text className="text-on-surface font-display text-display-md">
                  {!user ? '-' : isLoading ? '...' : projects.filter(p => p.status === 'in_progress' || p.status === 'awarded').length}
                </Text>
              </Card>

              <Card className="w-[48%] p-4 mb-4">
                <View className="flex-row items-center justify-between mb-3">
                  <MaterialIcons name="request-quote" size={24} color="#ffb95f" />
                  <View className="bg-secondary/10 px-2 py-0.5 rounded-lg">
                    <Text className="text-secondary text-caption">New</Text>
                  </View>
                </View>
                <Text className="text-on-surface-variant text-label-md mb-1">Open Requests</Text>
                <Text className="text-on-surface font-display text-display-md">{!user ? '-' : rfqsLoading ? '...' : rfqs.length}</Text>
              </Card>

              <Card className="w-full p-4 flex-row items-center justify-between">
                <View>
                  <View className="flex-row items-center gap-2 mb-3">
                    <MaterialIcons name="account-balance-wallet" size={24} color="#00e2eb" />
                    <View className="bg-tertiary/10 px-2 py-0.5 rounded-lg">
                      <Text className="text-tertiary text-caption">Pending</Text>
                    </View>
                  </View>
                  <Text className="text-on-surface-variant text-label-md mb-1">Pending Quotes</Text>
                </View>
                <Text className="text-on-surface font-display text-display-md">{!user ? '-' : '0'}</Text>
              </Card>
            </View>

            {/* Quick Book CTA */}
            <TouchableOpacity 
              activeOpacity={0.9} 
              onPress={() => router.push('/new-rfq')}
              className="mb-8 rounded-2xl overflow-hidden shadow-lg shadow-primary/20"
            >
              <LinearGradient
                colors={['#45e0e8', '#00c4cc']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="p-6 relative"
              >
                <View className="absolute right-0 top-0 opacity-20 transform translate-x-1/4 -translate-y-1/4">
                  <MaterialIcons name="add-circle" size={120} color="white" />
                </View>
                <View className="relative z-10">
                  <Text className="font-display text-display-md text-on-primary mb-2">Quick Book New Service</Text>
                  <Text className="font-body text-body-md text-on-primary/80 mb-6 max-w-[80%]">Start a new project request or schedule a site inspection instantly.</Text>
                  
                  <View className="bg-on-primary self-start px-6 py-2 rounded-full shadow-md">
                    <Text className="text-primary font-bold text-label-md uppercase tracking-wider">Get Started</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Open Requests Section */}
            {user && rfqs && rfqs.length > 0 && (
              <View className="mb-8">
                <View className="mb-4 flex-row justify-between items-end">
                  <Text className="font-display text-display-sm text-on-surface">Open Requests</Text>
                </View>
                {rfqs.map((rfq, index) => (
                  <TouchableOpacity 
                    key={rfq.id}
                    onPress={() => router.push(`/request/${rfq.id}`)}
                    className={twMerge(
                      clsx(
                        "p-4 flex-row items-center justify-between active:bg-surface-variant/50 bg-surface-container-low",
                        index === 0 && "rounded-t-xl",
                        index === rfqs.length - 1 && "rounded-b-xl",
                        index !== rfqs.length - 1 && "border-b border-outline-variant/10"
                      )
                    )}
                  >
                    <View className="flex-row items-center gap-3 flex-1">
                      <View className="w-12 h-12 bg-secondary/10 rounded-lg border border-secondary/20 items-center justify-center">
                         <MaterialIcons name="request-quote" size={24} color="#ffb95f" />
                      </View>
                      <View className="flex-1">
                        <Text className="font-body font-semibold text-body-lg text-on-surface" numberOfLines={1}>{rfq.project_title}</Text>
                        <Text className="font-body text-caption text-on-surface-variant mt-1">Pending Bids</Text>
                      </View>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color="#bbc9ca" />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Recent Projects Header */}
            <View className="mb-4 flex-row justify-between items-end">
              <Text className="font-display text-display-sm text-on-surface">Recent Projects</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator className="m-8" color="#45e0e8" size="large" />
          ) : (
            <Card className="p-8 items-center border-dashed border-2 border-outline-variant/50 bg-surface-container/30">
              <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-4">
                <MaterialIcons name="post-add" size={32} color="#45e0e8" />
              </View>
              <Text className="font-display text-lg text-on-surface font-bold text-center mb-2">No Active Projects</Text>
              <Text className="font-body text-sm text-on-surface-variant text-center mb-6">
                You haven't posted any project requests yet. Start your first project to receive bids from verified vendors.
              </Text>
              <TouchableOpacity onPress={() => router.push('/new-rfq')} className="bg-primary px-6 py-3 rounded-full shadow-lg shadow-primary/30">
                <Text className="text-on-primary font-bold">Post a Request</Text>
              </TouchableOpacity>
            </Card>
          )
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            onPress={() => router.push(`/project/${item.id}`)}
            className={twMerge(
              clsx(
                "p-4 flex-row items-center justify-between active:bg-surface-variant/50 bg-surface-container-low",
                index === 0 && "rounded-t-xl",
                index === projects.length - 1 && "rounded-b-xl mb-8",
                index !== projects.length - 1 && "border-b border-outline-variant/10"
              )
            )}
          >
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 bg-surface-container-highest rounded-lg border border-outline-variant/10 items-center justify-center">
                 <MaterialIcons name="business" size={24} color="#bbc9ca" />
              </View>
              <View>
                <Text className="font-body font-semibold text-body-lg text-on-surface">{item.id.substring(0, 8)}</Text>
                <Text className="font-body text-caption text-on-surface-variant mt-1">Status: {item.status.replace('_', ' ')}</Text>
              </View>
            </View>
            <View className={`bg-primary/10 border border-primary/20 px-3 py-1 rounded-full`}>
              <Text className={`text-primary text-[11px] font-medium`}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
