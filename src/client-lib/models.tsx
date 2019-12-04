export type Topic = {
  id: number;
  title: string;
  date_created: string;
  notes: number[];
  videos: number[];
  code: number[];
  article_snippets: number[];
  documents: number[];
  excercises: number[];
  user_id: number;
};

export type NewVideo = {
  topic_id: number;
  user_id: number;
  title: String;
  iframe: String;
  origin: String;
  thumbnail_img: String;
};

export type ArticleSnippet = {
  id: number;
  content: string;
  origin: string;
  date_created: string;
  topic_id: number;
  user_id: number;
};

export type NewArticleSnippet = {
  content: string;
  origin: string;
  topic_id: number;
  user_id: number;
};

export type NewCode = {
  content: string;
  language: string;
  origin: string;
  topic_id: number;
  user_id: number;
};
