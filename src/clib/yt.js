import Youtube from 'simple-youtube-api';
const youtube = new Youtube('AIzaSyCFE_UHkFBB6I1unCD4oI5_gnr8b4FT1gU');

export const getVideoTitle = async (url) => {
  try {
    const video = await youtube.getVideo(url);
    return video;
  } catch (e) {
    throw e;
  }
};
