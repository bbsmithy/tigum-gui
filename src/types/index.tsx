export interface TopicsState {
  loading: boolean;
  data: any[];
}

export type Video = {
  html: string;
  title: string;
};

export type ArticleCardProps = {
  origin: string;
  content: string;
};
