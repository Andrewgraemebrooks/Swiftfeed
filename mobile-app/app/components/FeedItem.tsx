import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

interface FeedItemProps {
  item: {
    title: string;
    'content:encoded': string;
  };
}

const FeedItem: React.FC<FeedItemProps> = (props) => {
  const { item } = props;
  const source = {
    html: item['content:encoded'],
  };
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Text>{item.title}</Text>
      {/* <Text>{item['content.encoded']}</Text> */}
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
});

export default FeedItem;
