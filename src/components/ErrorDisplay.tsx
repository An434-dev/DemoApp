import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ErrorDisplayProps {
  error: string | null;
  onRetry?: () => void;
  showRetry?: boolean;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  showRetry = true,
}) => {
  if (!error) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.message}>{error}</Text>
      {showRetry && onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ErrorDisplay;
