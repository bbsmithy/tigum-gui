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
