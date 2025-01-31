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
  const { title, content, description, domain } = article as ArticleType;
  const source = { html: content ?? description };
  const { width } = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.domain}>{domain}</Text>
      <RenderHtml
        contentWidth={width}
        source={source}
        baseStyle={baseStyle}
        tagsStyles={tagsStyles}
      />
    </ScrollView>
  );
};

const tagsStyles = {
  p: {
    marginTop: 0,
  },
};

const baseStyle = {
  margin: 10,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    color: 'black',
  },
  domain: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
    marginLeft: 10,
  },
});

export default Article;
