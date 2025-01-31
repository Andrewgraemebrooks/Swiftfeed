import React from 'react';
import { Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { ArticleType } from '@/app/types';
import { useLocalSearchParams } from 'expo-router';
import useArticleStore from '@/app/store/useArticleStore';

const Article: React.FC = () => {
  const params = useLocalSearchParams();
  const { guid } = params;
  const articles = useArticleStore((state) => state.articles);
  const article = articles.find((article) => article.guid === guid);
  const { title, content, description } = article as ArticleType;
  const source = { html: content ?? description };
  const { width } = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <RenderHtml contentWidth={width} source={source} baseStyle={styles.htmlStyling} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'black',
  },
  htmlStyling: {
    margin: 10,
  },
});

export default Article;
