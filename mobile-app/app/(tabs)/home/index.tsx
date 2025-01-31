import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { XMLParser } from 'fast-xml-parser';
import { ArticleType, FeedItemType, RawRSSDataType } from '@/app/types';
import FeedListItem from './FeedListItem';
import useArticleStore from '@/app/store/useArticleStore';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [feedUrls, setFeedUrls] = useState<string[]>([
    'https://lifehacker.com/feed/rss',
    'https://rss.art19.com/new-heights',
  ]);
  const articles = useArticleStore((state) => state.articles);
  const addArticle = useArticleStore((state) => state.addArticle);

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
      const rssFeedData: RawRSSDataType = parser.parse(text);
      const firstArticle = formatFeedData(rssFeedData.rss.channel.item)[0];
      if (articles.some((article) => article.guid === firstArticle.guid)) {
        return;
      }
      addArticle(formatFeedData(rssFeedData.rss.channel.item)[0]);
    });
  }, [addArticle, articles, feedUrls]);

  const formatFeedData = (data: FeedItemType[]): ArticleType[] => {
    return data.map((item: FeedItemType) => ({
      title: item.title,
      content: item['content:encoded'],
      description: item.description,
      link: item.link,
      guid: item.guid.toString(),
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => <FeedListItem item={item} />}
        keyExtractor={(item) => item.guid}
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
