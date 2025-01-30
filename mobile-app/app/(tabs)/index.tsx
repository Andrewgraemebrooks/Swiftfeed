import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Text, View, StyleSheet, Alert } from 'react-native';

export default function Index() {
  const navigation = useNavigation();
  const [feeds, setFeeds] = useState<string[]>([]);
  useEffect(() => {
    const onPress = () => {
      // e.g. https://lifehacker.com/feed/rss
      Alert.prompt(
        'Add a RSS feed',
        undefined,
        (newFeed: string) => setFeeds([...feeds, newFeed]),
        'plain-text',
      );
    };
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          onPress={onPress}
          name="add"
          color={'red'}
          size={30}
          style={{ paddingRight: 10 }}
        />
      ),
    });
  }, [feeds, navigation]);

  return (
    <View style={styles.container}>
      {feeds.length === 0 && <Text style={styles.text}>Home screen</Text>}
      {feeds.map((feed, index) => (
        <Text key={index} style={styles.text}>
          {feed}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
