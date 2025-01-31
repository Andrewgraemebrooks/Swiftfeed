import React from 'react';
import { Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { ArticleType } from './types';
import { useLocalSearchParams } from 'expo-router';
import useArticleStore from './store/useArticleStore';

const Article: React.FC = () => {
  const params = useLocalSearchParams();
  const { guid } = params;
  const articles = useArticleStore((state) => state.articles);
  const article = articles.find((article) => article.guid === guid);
  const { title, content } = article as ArticleType;
  const source = { html: content };
  const { width } = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <RenderHtml contentWidth={width} source={source} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'red',
  },
});

export default Article;
