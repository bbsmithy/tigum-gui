import { Topic } from '../client-lib/models';

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
    ...state.topics.data[topic_id].article_snippets
  ];
  const updatedTopic = state.topics.data[topic_id];
  updatedTopic.article_snippets = updatedTopicNoteIds;
  return updatedTopic;
};
