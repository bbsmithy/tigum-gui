export type Topic = {
  id: number;
  title: string;
  date_created: string;
  date_updated: string;
  notes: number[];
  videos: number[];
  code: number[];
  article_snippets: number[];
  images: [];
  links: number[];
  excercises: number[];
  published: boolean;
};

export type NewVideo = {
  topic_id: number;
  title: string;
  iframe: string; // YT Embed URL
  origin: string; // YT URL
  thumbnail_img: string;
};

export type Video = {
  id: number;
  topic_id: number;
  user_id: number;
  title: string;
  iframe: string;
  origin: string;
  date_created: string;
  thumbnail_img: string;
};

export type ArticleSnippet = {
  id: number;
  content: string;
  origin: string;
  date_created: string;
  topic_id: number;
};

export type NewArticleSnippet = {
  id?: number;
  title: string;
  content: string;
  origin: string;
  topic_id: number;
};

export type NewCode = {
  content: string;
  language: string;
  origin: string;
  topic_id: number;
};

export type Code = {
  id: number;
  content: string;
  date_created: string;
  language: string;
  origin: string;
  topic_id: number;
};

export type Note = {
  id: number;
  title: string;
  date_created: string;
  topic_id: number;
};

export type Image = {
  id: number;
  src: string;
  origin: string;
  date_created: string;
  topic_id: number;
};

export type NewImage = {
  src: string;
  origin: string;
  topic_id: number;
};

export type Link = {
  id: number;
  title: string;
  topic_id: number;
  source: string;
  date_created: string;
};

export type NewLink = {
  title: string;
  topic_id: number;
  source: string;
  favicon_source: string;
};
