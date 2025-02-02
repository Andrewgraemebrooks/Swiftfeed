import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { XMLParser } from 'fast-xml-parser';
import { ArticleType, RSSItemType, RawRSSDataType } from '@/app/types';
import FeedListItem from './FeedListItem';
import useArticleStore from '@/app/store/useArticleStore';
import log from 'loglevel';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [feedUrls, setFeedUrls] = useState<string[]>([
    'https://lifehacker.com/feed/rss',
    'https://rss.art19.com/new-heights',
    'https://techcrunch.com/feed/',
  ]);
  const articles = useArticleStore((state) => state.articles);
  const addArticle = useArticleStore((state) => state.addArticle);
  const reset = useArticleStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [reset]);

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
      const firstArticle = rssFeedData.rss.channel.item[0];
      if (articles.some((article) => article.guid === firstArticle.guid)) {
        return;
      }
      const domain = new URL(feed).hostname;
      addArticle(formatFeedData(rssFeedData.rss.channel.item, domain)[0]);
      log.debug('feed', feed);
      log.debug('url', domain);
      log.debug(firstArticle.title, firstArticle);
    });
  }, [addArticle, articles, feedUrls]);

  const formatFeedData = (data: RSSItemType[], domain: string): ArticleType[] => {
    return data.map((item: RSSItemType) => ({
      title: item.title,
      content: item['content:encoded'],
      description: item.description,
      link: item.link,
      guid: item.guid.toString(),
      domain: domain,
      pubDate: item.pubDate,
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
