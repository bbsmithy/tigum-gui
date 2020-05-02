import { Topic, Video, Note } from '../clib/models';

export const topicsToKeys = (topics: Array<Topic>) => {
  const keys = [];
  const data = {};
  topics.forEach((topic: Topic) => {
    keys.push(topic.id);
    data[topic.id] = topic;
  });

  return { data, keys };
};

export const deleteTopic = (data: any, keys: Array<number>, id: number) => {
  const newTopicData = { ...data };
  delete newTopicData[id];
  const newKeys = keys.filter((key) => key !== id);
  return { data: newTopicData, keys: newKeys };
};

export const notesToKeys = (notes: Array<Note>) => {
  const keys = [];
  const data = {};
  debugger;
  notes.forEach((n: Note) => {
    keys.push(n.id);
    data[n.id] = n;
  });
  return { data, keys };
};

export const addNote = (note_id: number, topic_id: number, state: any) => {
  const updatedTopicNoteIds = [note_id, ...state.topics.data[topic_id].notes];
  const updatedTopic = state.topics.data[topic_id];
  updatedTopic.notes = updatedTopicNoteIds;
  return updatedTopicNoteIds;
};

export const addSnippet = (
  snippet_id: number,
  topic_id: number,
  state: any
) => {
  const updatedTopicNoteIds = [
    snippet_id,
    ...state.topics.data[topic_id].article_snippets,
  ];
  const updatedTopic = state.topics.data[topic_id];
  updatedTopic.article_snippets = updatedTopicNoteIds;
  return updatedTopic;
};

export const videosToKey = (videos: Array<Video>) => {
  const keys = [];
  const data = {};
  videos.forEach((v: Video) => {
    keys.push(v.id);
    data[v.id] = v;
  });

  return { data, keys };
};

export const addVideo = (video_id: number, topic_id: number, state: any) => {
  const updatedTopicVideoIds = [
    video_id,
    ...state.topics.data[topic_id].videos,
  ];
  const updatedTopic = state.topics.data[topic_id];
  updatedTopic.videos = updatedTopicVideoIds;
  return updatedTopic;
};

export const addLink = (link_id: number, topic_id: number, state: any) => {
  const updatedTopicLinkIds = [link_id, ...state.topics.data[topic_id].links];
  const updatedTopic = state.topics.data[topic_id];
  updatedTopic.links = updatedTopicLinkIds;
  return updatedTopic;
};
