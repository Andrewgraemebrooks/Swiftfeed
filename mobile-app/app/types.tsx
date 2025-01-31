// Global types
export interface FeedItem {
  category: string;
  'content:encoded': string;
  'dc:creator': string;
  description: string;
  guid: string;
  link: string;
  'media.thumbnail': string;
  pubDate: string;
  title: string;
}

export interface RawRSSData {
  rss: {
    channel: {
      item: FeedItem[];
    };
  };
}

export interface Article {
  title: string;
  description: string;
  content: string;
  link: string;
}

export interface FeedData {
  url: string;
  data: Article[];
}
