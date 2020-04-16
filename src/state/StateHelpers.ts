import { Topic } from '../clib/models';

export const topicsToKeys = (topics: Array<Topic>) => {
  const keys = [];
  const data = {};
  topics.forEach((topic: Topic) => {
    keys.push(topic.id);
    data[topic.id] = topic;
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
