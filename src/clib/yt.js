import Youtube from 'simple-youtube-api';
const youtube = new Youtube(process.env.YOUTUBE_ACCESS_KEY);

export const getVideoTitle = async (url) => {
  try {
    const video = await youtube.getVideo(url);
    return video;
  } catch (e) {
    throw e;
  }
};
