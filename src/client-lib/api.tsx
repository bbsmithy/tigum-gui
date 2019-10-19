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
      body: JSON.stringify({ ids: topicIds })
    });
    return await res.json();
  } catch (e) {
    throw e;
  }
};

export const createTopic = async (
  title: String,
  notes: Array<number>,
  resources: Array<number>
) => {
  try {
    const res = await fetch(`${BASE_API_URL}/topics/create-topic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      body: JSON.stringify({ title, notes, resources })
    });
    return await res;
  } catch (e) {
    throw e;
  }
};

export const updateTopic = async (topic: any) => {
  try {
    const res = await fetch(`${BASE_API_URL}/topics/${topic.topic_id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      body: JSON.stringify({ ...topic })
    });
    return await res;
  } catch (e) {
    throw e;
  }
};

export const createNote = async (title: String) => {
  try {
    const res = await fetch(`${BASE_API_URL}/notes/create-note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      body: JSON.stringify({ title, note_content: [] })
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
    const res = await fetch(`${BASE_API_URL}/resources/create-resource`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
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
      body: JSON.stringify({ ids })
    });
    return await res;
  } catch (e) {
    throw e;
  }
};