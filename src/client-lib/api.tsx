import {
  NewVideo,
  NewArticleSnippet,
  NewCode,
  Code,
  NewImage,
  NewLink
} from "./models";

const BASE_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://app-e3018b9e-b898-41f7-888f-bc656e5af4e1.cleverapps.io";

export const getTopics = async (topicIds: Array<number>) => {
  try {
    const res = await fetch(`${BASE_API_URL}/topics/`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ ids: topicIds })
    });
    if (res.status === 200) {
      return await res.json();
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const createTopic = async (title: String, user_id: number) => {
  try {
    const res = await fetch(`${BASE_API_URL}/topics/create-topic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ title, user_id })
    });
    return await res;
  } catch (e) {
    throw e;
  }
};

export const updateTopic = async (topic: any) => {
  try {
    const res = await fetch(`${BASE_API_URL}/topics/${topic.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ ...topic })
    });
    return await res;
  } catch (e) {
    throw e;
  }
};

export const createNote = async (
  title: String,
  topic_id: number,
  user_id: number
) => {
  try {
    const res = await fetch(`${BASE_API_URL}/notes/create-note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ title, topic_id, user_id })
    });
    return await res;
  } catch (e) {
    throw e;
  }
};

export const deleteNote = async (note_id: number) => {
  try {
    const res = await fetch(`${BASE_API_URL}/notes/${note_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      }
    });
    return await res;
  } catch (e) {
    throw e;
  }
};

export const getNotes = async (note_ids: Array<number>) => {
  try {
    const res = await fetch(`${BASE_API_URL}/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ ids: note_ids })
    });
    return await res;
  } catch (e) {
    throw e;
  }
};

export const createResource = async (
  content_type: String,
  content: String,
  generated_by: String,
  title: String,
  thumbnail_img: String
) => {
  try {
    const res = await fetch(`${BASE_API_URL}/videos/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({
        content_type,
        content,
        generated_by,
        title,
        thumbnail_img
      })
    });
    return await res;
  } catch (e) {
    throw e;
  }
};

export const deleteResource = async (resource_id: number) => {
  try {
    const res = await fetch(`${BASE_API_URL}/resources/${resource_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      }
    });
    console.log(res);
    return res;
  } catch (e) {
    throw e;
  }
};

export const getResources = async (ids: Array<number>) => {
  try {
    const res = await fetch(`${BASE_API_URL}/resources/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ ids })
    });
    return await res;
  } catch (e) {
    throw e;
  }
};

export const getVideos = async (ids: Array<number>) => {
  try {
    const res = await fetch(`${BASE_API_URL}/videos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ ids })
    });
    return await res;
  } catch (e) {
    throw e;
  }
};

export const createVideo = async (newVideo: NewVideo) => {
  try {
    const res = await fetch(`${BASE_API_URL}/videos/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ ...newVideo })
    });
    return await res;
  } catch (e) {
    throw e;
  }
};

export const deleteVideo = async (id: number) => {
  try {
    const res = await fetch(`${BASE_API_URL}/videos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      }
    });
    return res;
  } catch (e) {
    throw e;
  }
};

export const getArticleSnippets = async (ids: number[]) => {
  try {
    const res = await fetch(`${BASE_API_URL}/article_snippets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ ids })
    });
    const article_snippets_list = await res.json();
    return article_snippets_list.reverse();
  } catch (e) {
    throw e;
  }
};

export const createArticleSnippet = async (
  newArticleSnippet: NewArticleSnippet
) => {
  try {
    const res = await fetch(`${BASE_API_URL}/article_snippets/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ ...newArticleSnippet })
    });
    const data = await res.json();
    return data;
  } catch (e) {
    throw e;
  }
};

export const deleteArticleSnippet = async (id: number) => {
  try {
    const res = await fetch(`${BASE_API_URL}/article_snippets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      }
    });
    return res;
  } catch (e) {
    throw e;
  }
};

export const getCodes = async (ids: number[]): Promise<Code[]> => {
  try {
    const res = await fetch(`${BASE_API_URL}/code/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ ids })
    });
    return await res.json();
  } catch (e) {
    throw e;
  }
};

export const createCode = async (newCode: NewCode) => {
  try {
    const res = await fetch(`${BASE_API_URL}/code/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ ...newCode })
    });
    return await res.json();
  } catch (e) {
    throw e;
  }
};

export const deleteCode = async (id: number) => {
  try {
    const res = await fetch(`${BASE_API_URL}/code/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      }
    });
    return res;
  } catch (e) {
    throw e;
  }
};

export const getImages = async (ids: number[]) => {
  try {
    const res = await fetch(`${BASE_API_URL}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ ids })
    });
    return await res.json();
  } catch (e) {
    throw e;
  }
};

export const createImage = async (newImage: NewImage) => {
  try {
    const res = await fetch(`${BASE_API_URL}/images/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ ...newImage })
    });
    return await res.json();
  } catch (e) {
    throw e;
  }
};

export const deleteImage = async (id: number) => {
  try {
    const res = await fetch(`${BASE_API_URL}/images/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      }
    });
    return res;
  } catch (e) {
    throw e;
  }
};

export const getLinks = async (ids: number[]) => {
  try {
    const res = await fetch(`${BASE_API_URL}/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ ids })
    });
    return await res.json();
  } catch (e) {
    throw e;
  }
};

export const createLink = async (newLink: NewLink) => {
  try {
    const res = await fetch(`${BASE_API_URL}/links/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ ...newLink })
    });
    return await res.json();
  } catch (e) {
    throw e;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  } catch (e) {
    throw e;
  }
};

export const checkLogin = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}/user/checklogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      credentials: "include"
    });
    return await res.json();
  } catch (e) {
    throw e;
  }
};
