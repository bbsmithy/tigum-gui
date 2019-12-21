export type Topic = {
  id: number;
  title: string;
  date_created: string;
  notes: number[];
  videos: number[];
  code: number[];
  article_snippets: number[];
  images: [];
  links: number[];
  excercises: number[];
  user_id: number;
};

export type NewVideo = {
  topic_id: number;
  user_id: number;
  title: string;
  iframe: string;
  origin: string;
  thumbnail_img: string;
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

export type Code = {
  id: number;
  content: string;
  date_created: string;
  language: string;
  origin: string;
  topic_id: number;
  user_id: number;
};

export type Note = {
  id: number;
  title: string;
  date_created: string;
  topic_id: number;
  user_id: number;
};

export type Image = {
  id: number;
  src: string;
  origin: string;
  date_created: string;
  topic_id: number;
  user_id: number;
};

export type NewImage = {
  src: string;
  origin: string;
  topic_id: number;
  user_id: number;
};

export type Link = {
  id: number;
  title: string;
  topic_id: number;
  user_id: number;
  source: string;
  date_created: string;
};

export type NewLink = {
  title: string;
  topic_id: number;
  user_id: number;
  source: string;
};
