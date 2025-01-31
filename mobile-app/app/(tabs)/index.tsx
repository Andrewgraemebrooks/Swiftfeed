import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { XMLParser } from 'fast-xml-parser';
import { Article, FeedData, FeedItem, RawRSSData } from '../types';
import FeedListItem from '../components/FeedListItem';

export default function Index() {
  const navigation = useNavigation();
  const [feedUrls, setFeedUrls] = useState<string[]>([
    'https://lifehacker.com/feed/rss',
    'https://rss.art19.com/new-heights',
  ]);
  const [feedData, setFeedData] = useState<FeedData[]>([]);

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
      if (feedData.map((data) => data.url).includes(feed)) return;
      const response = await fetch(feed);
      const text = await response.text();
      const rssFeedData: RawRSSData = parser.parse(text);
      setFeedData((prevFeedData) => [
        ...prevFeedData,
        { url: feed, data: [formatFeedData(rssFeedData.rss.channel.item)[0]] },
      ]);
    });
  }, [feedData, feedUrls]);

  const formatFeedData = (data: FeedItem[]): Article[] => {
    return data.map((item: any) => ({
      title: item.title,
      content: item['content:encoded'],
      description: item.description,
      link: item.link,
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={feedData.flatMap((data) => data.data)}
        renderItem={({ item }) => <FeedListItem item={item} />}
        keyExtractor={(item) => item.link}
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
