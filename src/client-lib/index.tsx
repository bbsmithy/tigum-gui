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
    console.log(e);
  }
};

export const createTopic = async (
  title: String,
  topic_content: Array<number>
) => {
  try {
    const res = await fetch(`${BASE_API_URL}/topics/create-topic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id"
      },
      body: JSON.stringify({ title, topic_content })
    });
    return await res;
  } catch (e) {}
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
  } catch (e) {}
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
    console.log(e);
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
    console.log(e);
  }
};
