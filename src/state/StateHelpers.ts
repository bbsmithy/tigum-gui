import { Topic, Video, Note } from "../clib/models";

export const topicsToKeys = (topics: Array<Topic>) => {
  const keys = [];
  const data = {};
  if (topics) {
    topics.forEach((topic: Topic) => {
      keys.push(topic.id);
      data[topic.id] = topic;
    });

    return { data, keys };
  } else {
    return { data: {}, keys: [] };
  }
};

export const resourceResponseToState = (resources) => {
  const resourcesForTopic = {};
  resources.forEach((r) => {
    resourcesForTopic[`${r.result_type}_${r.resource_id}`] = r;
  });
  return resourcesForTopic;
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
  notes.forEach((n: Note) => {
    keys.unshift(n.id);
    data[n.id] = n;
  });
  return { data, keys };
};

export const addNote = (note: any, state: any) => {
  const updatedTopicWithNoteId = state.topics.data[note.topic_id];
  const updatedNoteKeys = [note.id, ...state.notes.keys];
  const updatedNotesData = {
    [note.id]: note,
    ...state.notes.data,
  };
  updatedTopicWithNoteId.notes = updatedNoteKeys;
  return { updatedNotesData, updatedTopicWithNoteId };
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

export const addVideo = (video: any, state: any) => {
  const updatedTopicWithVideoId = state.topics.data[video.topic_id];
  const updatedVideoKeys = [video.id, ...state.videos.keys];
  const updatedVideoData = {
    [video.id]: video,
    ...state.videos.data,
  };
  updatedTopicWithVideoId.videos = updatedVideoKeys;
  return { updatedVideoData, updatedTopicWithVideoId };
};

export const deleteResource = (
  id: number,
  topic_id: number,
  resourceType: "notes" | "videos",
  state: any
) => {
  const updatedTopic = state.topics.data[topic_id];
  const updatedResourceData = state[resourceType].data;
  delete updatedResourceData[id];
  const updatedResourceKeys = state[resourceType].keys.filter(
    (key) => key !== id
  );
  updatedTopic[resourceType] = updatedResourceKeys;
  return { updatedResourceData, updatedTopic };
};

export const deleteVideo = (id: number, topic_id: number, state: any) => {
  const updatedTopic = state.topics.data[topic_id];
  const updatedVideoData = state.videos.data;
  delete updatedVideoData[id];
  const updatedVideoKeys = state.videos.keys.filter((key) => key !== id);
  updatedTopic.videos = updatedVideoKeys;
  return { updatedVideoData, updatedTopic };
};

export const addLink = (link_id: number, topic_id: number, state: any) => {
  const updatedTopicLinkIds = [link_id, ...state.topics.data[topic_id].links];
  const updatedTopic = state.topics.data[topic_id];
  updatedTopic.links = updatedTopicLinkIds;
  return updatedTopic;
};
