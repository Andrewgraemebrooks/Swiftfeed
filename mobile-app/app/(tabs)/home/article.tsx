import React from 'react';
import { Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { ArticleType } from '@/app/types';
import { useLocalSearchParams } from 'expo-router';
import useArticleStore from '@/app/store/useArticleStore';
import { DateTime } from 'luxon';
import { getLocales, getTimeZone } from 'react-native-localize';
import log from 'loglevel';

const Article: React.FC = () => {
  const params = useLocalSearchParams();
  const { guid } = params;
  const articles = useArticleStore((state) => state.articles);
  const article = articles.find((article) => article.guid === guid);
  const { title, content, description, domain, pubDate } = article as ArticleType;
  const source = { html: content ?? description };
  const { width } = useWindowDimensions();
  const date = DateTime.fromRFC2822(pubDate)
    .setZone(getTimeZone())
    .setLocale(getLocales()[0].languageCode)
    .toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
  log.debug('Article', article);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{`${domain} | ${date}`}</Text>
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
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
    marginLeft: 10,
  },
});

export default Article;
