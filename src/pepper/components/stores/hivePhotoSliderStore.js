import { inject, provide, reactive } from "vue";

export const createPhotoSliderStore = ({
  photos = [],
  speed = 1,
  delay = 3,
  cover = false,
  paused = true,
  keyEvent = false
}) => {
  const slides = reactive(photos);
  const state = reactive({
    speed,
    delay,
    cover,
    paused,
    cursor: 0,
    keyEvent
  });
  let intervalId;
  function play() {
    const timeout = state.delay + state.speed;
    pause();
    intervalId = setInterval(() => {
      goto(state.cursor + 1);
    }, timeout * 1000);
    state.paused = false;
  }
  function pause() {
    paused = true;
    if (intervalId) clearInterval(intervalId);
  }
  function slideTo(index) {
    goto(index);
    if (!state.paused) play();
  }
  function next() {
    slideTo(state.cursor + 1);
  }
  function prev() {
    slideTo(state.cursor - 1);
  }
  function goto(index) {
    let to = index;
    if (to >= slides.length) {
      to = 0;
    } else if (to < 0) {
      to = slides.length - 1;
    }

    state.cursor = to;
  }
  return {
    photos: slides,
    state,
    play,
    pause,
    goto: slideTo,
    next,
    prev
  };
};
export const providePhotoSliderStore = store => {
  provide("hive-photo-slider-controller", store);
};
export const injectPhotoSliderStore = () => {
  return inject("hive-photo-slider-controller");
};
