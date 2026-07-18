import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/providers/AuthProvider';
import type { Message } from '@/models/Message';

export default function ChatScreen() {
  const { id: quoteId } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock fetching messages
  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          id: '1',
          quoteId: quoteId || '',
          senderId: 'mock-vendor-id',
          receiverId: user?.id || '',
          content: 'Hi! I saw your project request and submitted a quote. Let me know if you have any questions about my timeline.',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          readAt: null
        },
        {
          id: '2',
          quoteId: quoteId || '',
          senderId: user?.id || '',
          receiverId: 'mock-vendor-id',
          content: 'Thanks for the quote. Are you able to start this week?',
          createdAt: new Date(Date.now() - 1800000).toISOString(),
          readAt: null
        }
      ]);
      setIsLoading(false);
    }, 800);
  }, [quoteId, user?.id]);

  const handleSend = () => {
    if (!inputText.trim() || !user) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      quoteId: quoteId || '',
      senderId: user.id,
      receiverId: 'mock-vendor-id',
      content: inputText.trim(),
      createdAt: new Date().toISOString(),
      readAt: null
    };

    // Prepend because inverted FlatList
    setMessages([newMessage, ...messages]);
    setInputText('');
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.senderId === user?.id;
    
    return (
      <View className={`mb-4 max-w-[80%] ${isMe ? 'self-end' : 'self-start'}`}>
        <View 
          className={`p-3 rounded-2xl ${
            isMe 
              ? 'bg-primary rounded-tr-none' 
              : 'bg-surface-container-high border border-outline-variant/20 rounded-tl-none'
          }`}
        >
          <Text className={`font-body text-base ${isMe ? 'text-on-primary' : 'text-on-surface'}`}>
            {item.content}
          </Text>
        </View>
        <Text className={`text-[10px] text-on-surface-variant mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <View className="absolute inset-0 opacity-20">
        <LinearGradient
          colors={['rgba(61, 218, 226, 0.15)', 'transparent']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
        />
      </View>

      <View style={{ paddingTop: insets.top || 48 }} className="px-4 pb-4 bg-surface/90 border-b border-outline-variant/20 flex-row items-center z-50">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full active:bg-surface-variant/50 mr-2">
          <MaterialIcons name="arrow-back" size={24} color="#45e0e8" />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center">
          <View className="w-10 h-10 bg-secondary/20 rounded-full items-center justify-center mr-3 border border-secondary/30">
            <Text className="text-secondary font-bold text-lg">V</Text>
          </View>
          <View>
            <Text className="font-display font-bold text-lg text-on-surface">Vendor Discussion</Text>
            <Text className="font-body text-xs text-secondary font-medium">Quote #{quoteId?.substring(0, 6)}</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        className="flex-1"
      >
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#45e0e8" />
          </View>
        ) : (
          <FlatList
            data={messages}
            inverted
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={{ padding: 16 }}
            className="flex-1"
          />
        )}

        <View style={{ paddingBottom: Math.max(insets.bottom, 16) }} className="px-4 pt-3 bg-surface border-t border-outline-variant/20 flex-row items-center">
          <View className="flex-1 bg-surface-container-lowest border border-outline-variant/30 rounded-full px-4 py-2 flex-row items-center mr-3">
            <TextInput
              className="flex-1 text-on-surface font-body text-base max-h-24"
              placeholder="Type a message..."
              placeholderTextColor="#859394"
              multiline
              value={inputText}
              onChangeText={setInputText}
            />
          </View>
          <TouchableOpacity 
            onPress={handleSend}
            disabled={!inputText.trim()}
            className={`w-12 h-12 rounded-full items-center justify-center ${inputText.trim() ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-surface-variant'}`}
          >
            <MaterialIcons name="send" size={20} color={inputText.trim() ? '#003639' : '#859394'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
