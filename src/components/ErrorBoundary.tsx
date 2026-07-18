import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught React Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 bg-background justify-center items-center p-6">
          <View className="w-16 h-16 rounded-full bg-error/10 items-center justify-center mb-6">
            <MaterialIcons name="error-outline" size={32} color="#ffb4ab" />
          </View>
          <Text className="font-display text-2xl text-error font-bold mb-2">Something went wrong</Text>
          <Text className="font-body text-base text-on-surface-variant text-center mb-8">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </Text>
          
          <TouchableOpacity 
            onPress={this.handleReset}
            className="bg-primary px-8 py-3 rounded-full shadow-lg shadow-primary/30"
          >
            <Text className="text-on-primary font-bold text-base">Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
