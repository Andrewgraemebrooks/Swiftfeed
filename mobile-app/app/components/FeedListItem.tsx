import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Article } from '../types';
import isHtml from 'is-html';
import { parse } from 'node-html-parser';

const FeedListItem: React.FC<{ item: Article }> = ({ item }) => {
  const { title, description } = item;
  let renderedDescription: string | null = description;
  if (isHtml(description)) {
    const html = parse(description);
    renderedDescription = html.firstChild?.textContent ?? null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {renderedDescription && (
        <Text style={styles.description} numberOfLines={2}>
          {renderedDescription}
        </Text>
      )}
    </View>
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
