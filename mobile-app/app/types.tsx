// Global types
export interface RSSItemType {
  category: string;
  'content:encoded': string;
  'dc:creator': string;
  description: string;
  guid: string | number;
  link: string;
  'media.thumbnail': string;
  pubDate: string;
  title: string;
}

export interface RawRSSDataType {
  rss: {
    channel: {
      item: RSSItemType[];
    };
  };
}

export interface ArticleType {
  title: string;
  description: string;
  content: string;
  link: string;
  guid: string;
  domain: string;
  pubDate: string;
}
