export const getEmbedFromUrl = url => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length == 11) {
    const url = `<iframe width='100%' height='100%' src='https://www.youtube.com/embed/${
      match[2]
    }' frameborder="0" allowfullscreen></iframe>`;
    return url;
  } else {
    return "error";
  }
};
