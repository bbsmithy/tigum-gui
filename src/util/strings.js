export const truncated = (title, cutAt) => {
  if (title.length > cutAt) {
    const shortTitle = title.slice(0, cutAt);
    return `${shortTitle}...`;
  }
  return title;
};
