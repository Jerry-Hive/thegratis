export function getComputedStyle(element, value) {
  const s = window.getComputedStyle(element);
  return s.getPropertyValue(value);
}
export function pauseAllVideos(element) {
  const videos = element.querySelectorAll("video"); // get all videos using "video" css selector
  /*Loop*/
  for (let video of videos) {
    // use var video if "strict mode" is enabled
    video.pause();
  }
}
export function playAllVideos(element) {
  const videos = element.querySelectorAll("video"); // get all videos using "video" css selector
  /*Loop*/
  for (let video of videos) {
    // use var video if "strict mode" is enabled
    video.play();
  }
}
export function setStyle(element, obj) {
  for (const [key, value] of Object.entries(obj)) {
    element.style[key] = value;
  }
}
