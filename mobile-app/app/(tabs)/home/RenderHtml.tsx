import React from 'react';
import { RenderHtmlProps } from '@/app/types';
import { View, Text } from 'react-native';
import { parseDocument, ElementType } from 'htmlparser2';

const RenderHtml: React.FC<RenderHtmlProps> = ({ html }) => {
  const ignoredTags = ['head'];
  const textTags = ['span', 'strong', 'em'];
  const document = parseDocument(html);

  const renderTextNode = (textNode, index) => {
    return <Text key={index}>{textNode.data}</Text>;
  };

  const renderElement = (element, index) => {
    if (ignoredTags.indexOf(element.name) > -1) {
      return null;
    }
    if (textTags.indexOf(element.name) > -1) {
      return <Text key={index}>{element.children.map((c, i) => renderNode(c, i))}</Text>;
    } else {
      return <View key={index}>{element.children.map((c, i) => renderNode(c, i))}</View>;
    }
  };

  const renderNode = (node, index) => {
    switch (node.type) {
      case ElementType.Text:
        return renderTextNode(node, index);
      case ElementType.Tag:
        return renderElement(node, index);
    }
    return null;
  };

  return document.children.map((c, i) => renderNode(c, i));
};

export default RenderHtml;
