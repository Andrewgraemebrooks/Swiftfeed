// Global types
export interface FeedItemType {
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
      item: FeedItemType[];
    };
  };
}

export interface ArticleType {
  title: string;
  description: string;
  content: string;
  link: string;
  guid: string;
}
