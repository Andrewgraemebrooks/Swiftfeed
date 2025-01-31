import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ArticleType } from '../app/types';
import isHtml from 'is-html';
import { parse } from 'node-html-parser';
import { Link } from 'expo-router';

const FeedListItem: React.FC<{ item: ArticleType }> = ({ item }) => {
  const { title, description } = item;
  let renderedDescription: string | null = description;
  if (isHtml(description)) {
    const html = parse(description);
    renderedDescription = html.firstChild?.textContent ?? null;
  }
  return (
    <Link
      href={{
        pathname: '/article',
        // /* 1. Navigate to the details route with query params */
        params: { guid: item.guid },
      }}
      asChild>
      <Pressable>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
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
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default FeedListItem;
