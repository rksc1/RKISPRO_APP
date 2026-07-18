import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import * as Linking from 'expo-linking';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { useProjectMilestones } from '@/hooks/api/useProjectMilestones';
import { useProjectPayments } from '@/hooks/api/useProjectPayments';
import { useAuth } from '@/providers/AuthProvider';
import { useUnlockProject } from '@/hooks/api/useUnlockProject';

export default function ProjectDashboardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'milestones' | 'financials'>('milestones');
  const [isUploadingPI, setIsUploadingPI] = useState(false);

  const { user } = useAuth();
  const { unlockProject, isUnlocking } = useUnlockProject();
  const { milestones, isLoading: milestonesLoading } = useProjectMilestones(id);
  const { payments, isLoading: paymentsLoading } = useProjectPayments(id);

  const handleUploadPI = async () => {
    try {
      setIsUploadingPI(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const file = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(file.uri, { encoding: 'base64' });
      
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `vendor_${user?.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('invoices')
        .upload(filePath, decode(base64), { contentType: 'application/pdf' });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('invoices')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from('projects')
        .update({ proforma_invoice_url: publicUrl })
        .eq('id', project.id);

      if (updateError) throw updateError;

      setProject({ ...project, proforma_invoice_url: publicUrl });
      alert('Proforma Invoice uploaded successfully!');
    } catch (err: any) {
      console.error('Error uploading PI:', err);
      alert('Failed to upload Proforma Invoice: ' + err.message);
    } finally {
      setIsUploadingPI(false);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*, marketplace_requests(project_title, service_type)')
          .eq('id', id)
          .single();
        if (error) throw error;
        setProject(data);
      } catch (err) {
        console.error('Error fetching Project:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#45e0e8" />
      </View>
    );
  }

  if (!project) {
    return (
      <View className="flex-1 bg-background justify-center items-center p-4">
        <Text className="text-on-surface font-display text-xl mb-4">Project not found.</Text>
      </View>
    );
  }

  const isLockedForCustomer = user?.role === 'customer' && project.status === 'awarded';

  return (
    <View className="flex-1 bg-background">
      <View className="absolute inset-0 opacity-20">
        <LinearGradient
          colors={['rgba(69, 224, 232, 0.15)', 'transparent']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 250 }}
        />
      </View>

      <View style={{ paddingTop: insets.top || 48 }} className="px-4 pb-4 bg-surface/90 border-b border-outline-variant/20 z-50">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full active:bg-surface-variant/50">
            <MaterialIcons name="arrow-back" size={24} color="#45e0e8" />
          </TouchableOpacity>
          <View className="bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
            <Text className="text-primary font-bold text-xs uppercase tracking-wider">{project.status?.replace('_', ' ')}</Text>
          </View>
        </View>
        
        <Text className="font-display font-bold text-2xl text-on-surface mb-1">
          {project.marketplace_requests?.project_title || 'Active Project'}
        </Text>
        <Text className="font-body text-sm text-on-surface-variant mb-4">
          {project.marketplace_requests?.service_type || 'General Service'} • ${project.project_value?.toLocaleString()}
        </Text>

        <View className="flex-row bg-surface-container-lowest rounded-xl p-1 border border-outline-variant/30">
          <TouchableOpacity 
            onPress={() => setActiveTab('milestones')}
            className={`flex-1 py-2 items-center rounded-lg ${activeTab === 'milestones' ? 'bg-primary shadow-sm' : ''}`}
          >
            <Text className={`font-bold text-sm ${activeTab === 'milestones' ? 'text-on-primary' : 'text-on-surface-variant'}`}>Milestones</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('financials')}
            className={`flex-1 py-2 items-center rounded-lg ${activeTab === 'financials' ? 'bg-primary shadow-sm' : ''}`}
          >
            <Text className={`font-bold text-sm ${activeTab === 'financials' ? 'text-on-primary' : 'text-on-surface-variant'}`}>Financials</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLockedForCustomer ? (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <Card className="p-6 items-center border-2 border-secondary/50 bg-surface-container/50 mt-4">
            <View className="w-16 h-16 rounded-full bg-secondary/10 items-center justify-center mb-4 shadow-lg shadow-secondary/20">
              <MaterialIcons name="account-balance" size={32} color="#ffb95f" />
            </View>
            <Text className="font-display font-bold text-2xl text-on-surface text-center mb-2">Mobilization Escrow</Text>
            <Text className="font-body text-base text-on-surface-variant text-center mb-6">
              To officially unlock the project workspace, please pay the Mobilization Advance to RKISPro Escrow.
            </Text>

            {project.proforma_invoice_url ? (
              <View className="w-full mb-4">
                <Button 
                  label="View Vendor PI (PDF)" 
                  variant="secondary"
                  className="w-full bg-secondary/10 border border-secondary"
                  onPress={() => Linking.openURL(project.proforma_invoice_url)}
                />
              </View>
            ) : (
              <View className="w-full mb-4 p-3 bg-surface-variant/30 rounded-lg">
                <Text className="text-sm text-center text-on-surface-variant">
                  Awaiting Vendor Proforma Invoice...
                </Text>
              </View>
            )}
            
            <View className="w-full bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 mb-6">
              <View className="flex-row justify-between mb-2">
                <Text className="font-body text-on-surface-variant">Project Value:</Text>
                <Text className="font-bold text-on-surface">${project.project_value?.toLocaleString()}</Text>
              </View>
              <View className="flex-row justify-between border-t border-outline-variant/20 pt-2">
                <Text className="font-body font-bold text-on-surface">Advance Due (20%):</Text>
                <Text className="font-display font-bold text-lg text-secondary">
                  ${(project.project_value * 0.2).toLocaleString()}
                </Text>
              </View>
            </View>

            <Button 
              label="Pay via Bank Wire" 
              variant="primary" 
              className="w-full mb-4"
              onPress={() => alert('Bank details: RKISPro Escrow Account...')}
            />
            
            <View className="bg-surface-variant/30 p-3 rounded-lg w-full flex-row items-center gap-3">
              <MaterialIcons name="security" size={16} color="#859394" />
              <Text className="text-on-surface-variant text-xs flex-1">
                Your funds are held securely. We will not release the advance to the vendor until mobilization is confirmed.
              </Text>
            </View>
          </Card>
        </ScrollView>
      ) : activeTab === 'milestones' ? (
        <FlatList
          data={milestones}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          ListEmptyComponent={
            milestonesLoading ? (
              <ActivityIndicator color="#45e0e8" className="mt-8" />
            ) : (
              <Card className="p-8 items-center border-dashed border-2 border-outline-variant/50 bg-surface-container/30 mt-4">
                <MaterialIcons name="flag" size={32} color="#859394" className="mb-4" />
                <Text className="font-display text-lg text-on-surface font-bold text-center mb-2">No Milestones</Text>
                <Text className="font-body text-sm text-on-surface-variant text-center">
                  Project milestones will appear here once created.
                </Text>
              </Card>
            )
          }
          renderItem={({ item, index }) => (
            <View className="flex-row mb-6">
              <View className="items-center mr-4">
                <View className={`w-8 h-8 rounded-full items-center justify-center border-2 ${item.status === 'completed' ? 'bg-primary border-primary' : 'bg-surface-container border-outline-variant'}`}>
                  {item.status === 'completed' ? (
                    <MaterialIcons name="check" size={16} color="#003639" />
                  ) : (
                    <Text className="text-on-surface-variant font-bold text-xs">{index + 1}</Text>
                  )}
                </View>
                {index !== milestones.length - 1 && (
                  <View className={`w-0.5 flex-1 mt-2 ${item.status === 'completed' ? 'bg-primary/50' : 'bg-outline-variant/30'}`} />
                )}
              </View>
              <Card className="flex-1 p-4 mb-2">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="font-display font-bold text-base text-on-surface flex-1">{item.title}</Text>
                  <View className={`px-2 py-0.5 rounded ${item.status === 'completed' ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                    <Text className={`text-[10px] font-bold uppercase ${item.status === 'completed' ? 'text-primary' : 'text-secondary'}`}>
                      {item.status}
                    </Text>
                  </View>
                </View>
                <Text className="font-body text-sm text-on-surface-variant mb-3">{item.description}</Text>
                {item.due_date && (
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons name="event" size={14} color="#859394" />
                    <Text className="text-xs text-on-surface-variant">Due: {new Date(item.due_date).toLocaleDateString()}</Text>
                  </View>
                )}
              </Card>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={payments}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          ListHeaderComponent={
            user?.role === 'vendor' && project.status === 'awarded' ? (
              <Card className="p-4 mb-4 border-2 border-primary/50 bg-primary/10">
                <View className="flex-row items-center gap-3 mb-3">
                  <MaterialIcons name="assignment" size={24} color="#45e0e8" />
                  <Text className="font-display font-bold text-lg text-on-surface flex-1">
                    {project.proforma_invoice_url ? 'Proforma Invoice Uploaded' : 'Upload Proforma Invoice'}
                  </Text>
                </View>
                <Text className="font-body text-sm text-on-surface-variant mb-4">
                  {project.proforma_invoice_url 
                    ? 'Your PI is successfully attached to this project. Awaiting customer advance.'
                    : 'Please upload your PI so the customer can pay the mobilization advance via RKISPro Escrow.'}
                </Text>
                {!project.proforma_invoice_url && (
                  <Button 
                    label={isUploadingPI ? "Uploading..." : "Upload Document"} 
                    variant="secondary" 
                    size="small" 
                    onPress={handleUploadPI} 
                    disabled={isUploadingPI}
                  />
                )}
              </Card>
            ) : null
          }
          ListEmptyComponent={
            paymentsLoading ? (
              <ActivityIndicator color="#45e0e8" className="mt-8" />
            ) : (
              <Card className="p-8 items-center border-dashed border-2 border-outline-variant/50 bg-surface-container/30 mt-4">
                <MaterialIcons name="account-balance-wallet" size={32} color="#859394" className="mb-4" />
                <Text className="font-display text-lg text-on-surface font-bold text-center mb-2">No Payments</Text>
                <Text className="font-body text-sm text-on-surface-variant text-center">
                  Financial records and invoices will appear here.
                </Text>
              </Card>
            )
          }
          renderItem={({ item }) => (
            <Card className="p-4 mb-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-4 flex-1">
                <View className={`w-12 h-12 rounded-full items-center justify-center ${item.status === 'completed' ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                  <MaterialIcons name="attach-money" size={24} color={item.status === 'completed' ? '#45e0e8' : '#ffb95f'} />
                </View>
                <View>
                  <Text className="font-display font-bold text-base text-on-surface capitalize">{item.payment_type.replace('_', ' ')}</Text>
                  <Text className="font-body text-sm text-on-surface-variant">Invoice #{item.id.substring(0, 8).toUpperCase()}</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="font-display font-bold text-lg text-on-surface">${item.amount.toLocaleString()}</Text>
                <Text className={`text-xs font-bold uppercase ${item.status === 'completed' ? 'text-primary' : 'text-secondary'}`}>
                  {item.status}
                </Text>
              </View>
            </Card>
          )}
        />
      )}
    </View>
  );
}
