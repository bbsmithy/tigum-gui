import { topic } from "firebase-functions/v1/pubsub";
import { useEffect, useState } from "react";
import {
  getPublicNotes,
  getPublicLinks,
  getPublicVideos,
  getArticleSnippets,
  getPublicTopics,
  getPublicResources,
} from "../../../clib/api";

export const useNotes = (topicId: number) => {
  const [notes, setNotes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setIsLoading(true);
      const res = await getPublicNotes(topicId);
      setNotes(res.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (topicId) load();
  }, [topicId]);

  return [notes, isLoading, error];
};

export const useVideos = (topicId: number) => {
  const [videos, setVideos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setIsLoading(true);
      const res = await getPublicVideos(topicId);
      setVideos(res.videos);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    if (topicId) load();
  }, [topicId]);

  return [videos, isLoading, error];
};

export const useSnippets = (topicId: number) => {
  const [snippets, setSnippets] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setIsLoading(true);
      const res = await getPublicVideos(topicId);
      setSnippets(res.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (topicId) load();
  }, [topicId]);

  return [snippets, isLoading, error];
};

export const useLinks = (topicId: number) => {
  const [links, setLinks] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setIsLoading(true);
      const res = await getPublicVideos(topicId);
      setLinks(res.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (topicId) load();
  }, [topicId]);

  return [links, isLoading, error];
};
export const useProfile = (userName: string) => {
  const [topics, setTopics] = useState();
  const [error, setError] = useState<any>();
  const [isLoading, setLoading] = useState(false);

  const findProfile = async () => {
    try {
      const profile = await getPublicTopics(userName);
      if (profile.error) {
        throw profile.error;
      } else if (profile.topics) {
        setTopics(profile.topics);
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    findProfile();
  }, []);

  return [topics, error, isLoading];
};

export const usePublicResourcesForTopic = (topic: any) => {
  const [resources, setResources] = useState();
  const [error, setError] = useState<any>();
  const [isLoading, setLoading] = useState(false);

  const findPublicResourcesForTopic = async (topic_id: number) => {
    try {
      const resources = await getPublicResources(topic_id);
      if (resources.error) {
        throw resources.error;
      } else if (resources) {
        setResources(resources);
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (topic) {
      findPublicResourcesForTopic(topic.id);
    }
  }, [topic]);

  return [resources, error, isLoading];
};
