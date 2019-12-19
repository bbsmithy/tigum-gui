import { Topic } from "../client-lib/models";

export const topicsToKeys = (topics: Array<Topic>) => {
  const keys = [];
  const data = {};
  topics.forEach((topic: Topic) => {
    keys.push(topic.id);
    data[topic.id] = topic;
  });

  return { data, keys };
};
