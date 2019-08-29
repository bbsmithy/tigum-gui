const BASE_API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://app-e3018b9e-b898-41f7-888f-bc656e5af4e1.cleverapps.io';

export const getTopics = async (topicIds: Array<number>) => {
  try {
    const res = await fetch(`${BASE_API_URL}/topics/`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": "test-user-id",
      },
      body: JSON.stringify({ids: topicIds})
    });
    const data = await res.json();
    console.log(data)
    return data;
  } catch (e) {
    console.log(e);
  }
};