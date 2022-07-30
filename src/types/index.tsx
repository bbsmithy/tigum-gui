export interface TopicsState {
  loading: boolean;
  data: any[];
}

export type VideoPlayerProps = {
  iframe: string;
  title: string;
};

export type CursorState = {
  absPos: {
    bottom: number;
    left: number;
    top: number;
    right: number;
  };
  cursorPos: any;
};

export type ResourceTypeName = "link" | "snippet" | "note" | "video";
export type ResourceResult = {
  misc: String;
  misc2: String;
  published: boolean;
  resource_id: number;
  result_type: ResourceTypeName;
  title: String;
  topic_id: number;
  updated: String;
  key?: String;
};

export type LinkResponse = {
  id: number;
  title: String;
  user_id: number;
  topic_id: number;
  date_created: String;
  source: String;
  date_updated: String;
  published: boolean;
  favicon_source: String;
};

export type NoteResponse = {
  id: number;
  title: String;
  date_created: String;
  topic_id: number;
  user_id: number;
  date_updated: string;
  published: boolean;
};

export type SnippetResponse = {
  id: number;
  content: String;
  origin: String;
  date_created: String;
  topic_id: number;
  user_id: number;
  title: String;
  date_updated: String;
  published: boolean;
};

export type VideoResponse = {
  id: number;
  title: String;
  iframe: String;
  origin: String;
  date_created: String;
  thumbnail_img: String;
  topic_id: number;
  user_id: number;
  date_updated: string;
  published: boolean;
};
