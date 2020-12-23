const axios = require("axios")

const handleResponse = async (response) => {
  try {
    for (var i = 0; i < response.data.length; i++) {
      let videoToUpdate = response.data[i]

      const embedUrl = videoToUpdate.iframe.slice(40, 81)
      if (embedUrl) {
        videoToUpdate.iframe = embedUrl
        console.log(`Updating: ${videoToUpdate}`)
        await updateVideo(videoToUpdate)
      }
    }
  } catch (err) {
    console.log(err)
  }
}

const updateVideo = async ({
  topic_id,
  title,
  iframe,
  origin,
  thumbnail_img,
  id
}) => {
  await axios.put(`https://bsmithapp.ngrok.io/videos/update/${id}`, {
    topic_id,
    title,
    iframe,
    origin,
    thumbnail_img
  })
}

axios.get('https://bsmithapp.ngrok.io/videos/all')
  .then(handleResponse)
  .catch(function (error) {
    console.log(error.message);
  });


