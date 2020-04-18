const months_arr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getDate = (date) => {
  const year = date.getFullYear();

  // Month
  const month = months_arr[date.getMonth()];

  // Day
  const day = date.getDate();

  // Hours
  const hours = date.getHours();

  // Minutes
  const minutes = '0' + date.getMinutes();

  // Seconds
  const seconds = '0' + date.getSeconds();

  // Display date time in MM-dd-yyyy h:m:s format
  const convdataTime =
    month +
    '-' +
    day +
    '-' +
    year +
    ' ' +
    hours +
    ':' +
    minutes.substr(-2) +
    ':' +
    seconds.substr(-2);

  return convdataTime;
};

export const getEmbedFromUrl = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length == 11) {
    const embedUrl = `<iframe width='100%' height='100%' src='https://www.youtube.com/embed/${match[2]}' frameborder="0" allowfullscreen></iframe>`;
    const thumbnailUrl = `https://img.youtube.com/vi/${match[2]}/0.jpg`;
    return { embedUrl, thumbnailUrl };
  }
};

export const truncated = (title, cutAt) => {
  if (title.length > cutAt) {
    const shortTitle = title.slice(0, cutAt);
    return `${shortTitle}...`;
  }
  return title;
};

export const deleteJWT = () => {
  document.cookie = 'jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
};

export const debounce = (func, wait, immediate) => {
  var timeout;

  return function () {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

export const goto = (url) => {
  console.log(url);
  window.history.replaceState({}, '', `${url}`);
  window.dispatchEvent(new Event('locationChange'));
};

export const resourceTypeToScreen = (type) => {
  switch (type) {
    case 'notes':
      return 0;
    case 'videos':
      return 1;
    case 'snippets':
      return 2;
    case 'links':
      return 3;
    default:
      return false;
  }
};

export const screenToResourceType = (screen) => {
  switch (screen) {
    case 0:
      return 'notes';
    case 1:
      return 'videos';
    case 2:
      return 'snippets';
    case 3:
      return 'links';
    default:
      return false;
  }
};
