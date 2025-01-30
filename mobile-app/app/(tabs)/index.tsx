import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { XMLParser } from 'fast-xml-parser';
import FeedItem from '../components/FeedItem';

export default function Index() {
  const navigation = useNavigation();
  const [feedUrls, setFeedUrls] = useState<string[]>([
    'https://lifehacker.com/feed/rss',
    'https://rss.art19.com/new-heights',
  ]);
  const [feedData, setFeedData] = useState<{ url: string; data: any }[]>([]);

  useEffect(() => {
    const onPress = () => {
      Alert.prompt(
        'Add a RSS feed',
        undefined,
        (newFeed: string) => setFeedUrls([...feedUrls, newFeed]),
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
  }, [feedUrls, navigation]);

  useEffect(() => {
    const parser = new XMLParser();
    feedUrls.forEach(async (feed) => {
      const response = await fetch(feed);
      const text = await response.text();
      const rssFeedData = parser.parse(text);
      setFeedData((prevFeedData) => [
        ...prevFeedData,
        { url: feed, data: [formatFeedData(rssFeedData.rss.channel.item)[0]] },
      ]);
    });
  }, [feedUrls]);

  const formatFeedData = (data: any) => {
    return data.map((item: any) => ({
      title: item.title,
      content: item['content:encoded'],
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={feedData.flatMap((data) => data.data)}
        renderItem={({ item }) => <FeedItem title={item.title} content={item.content} />}
      />
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
