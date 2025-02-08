import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ArticleType } from '@/app/types';
import isHtml from 'is-html';
import { parse } from 'node-html-parser';
import { Link } from 'expo-router';
import { DateTime } from 'luxon';
import { getTimeZone, getLocales } from 'react-native-localize';

const FeedListItem: React.FC<{ item: ArticleType }> = ({ item }) => {
  const { title, description, domain } = item;
  let renderedDescription: string | null = description;
  if (isHtml(description)) {
    const html = parse(description);
    renderedDescription = html.firstChild?.textContent ?? null;
  }
  const date = DateTime.fromRFC2822(item.pubDate)
    .setZone(getTimeZone())
    .setLocale(getLocales()[0].languageCode)
    .toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);

  return (
    <Link href={{ pathname: '/home/article', params: { guid: item.guid } }} asChild>
      <Pressable>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.domain}>{domain}</Text>
          <Text style={styles.domain}>{date}</Text>
          {renderedDescription && (
            <Text style={styles.description} numberOfLines={2}>
              {renderedDescription}
            </Text>
          )}
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  domain: {
    fontSize: 14,
    color: 'lightgray',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default FeedListItem;
