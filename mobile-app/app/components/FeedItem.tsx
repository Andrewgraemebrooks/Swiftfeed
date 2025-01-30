import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

interface FeedItemProps {
  title: string;
  content: string;
}

const FeedItem: React.FC<FeedItemProps> = ({ title, content }) => {
  const source = { html: content };
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <RenderHtml contentWidth={width} source={source} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'red',
  },
});

export default FeedItem;
