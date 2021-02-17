/**
 * Deprecated. Use hivePhotoSliderStore.
 */

import { getCurrentInstance, isRef, reactive, toRefs } from "vue";
import gsap from "gsap";
import { when, invoke } from "@vueuse/core";
import { getComputedStyleValue } from "../../utils/domUtils";
// import { tryOnUnmounted } from "@vueuse/shared";

export function useSliderController(slides = [], options = {}) {
  const { autoPlay = false, speed = 1, delay = 3, cover = true } = options;
  let intervalId;
  let instance;
  const state = reactive({
    currentSlide: 0
  });
  let paused = true;
  function play() {
    const timeout = paused ? delay : delay + speed;
    pause();
    intervalId = setInterval(() => {
      goto(state.currentSlide + 1);
    }, timeout * 1000);
    paused = false;
  }
  function pause() {
    paused = true;
    if (intervalId) clearInterval(intervalId);
  }
  function slideTo(index) {
    goto(index);
    if (!paused) play();
  }
  function next() {
    slideTo(state.currentSlide + 1);
  }
  function prev() {
    slideTo(state.currentSlide - 1);
  }
  function goto(index) {
    let to = index;
    if (to >= slides.length) {
      to = 0;
    } else if (to < 0) {
      to = slides.length - 1;
    }
    if (instance) instance.emit("slide", to);
    const outSlider = sliderContainers[currentSlideContainer];
    currentSlideContainer = 1 - currentSlideContainer;
    const inSlider = sliderContainers[currentSlideContainer];
    state.currentSlide = to;
    setImage(inSlider, to);
    gsap.set(inSlider, {
      opacity: 0,
      duration: speed
    });
    gsap.to(outSlider, {
      opacity: 0,
      duration: speed
    });
    gsap.to(inSlider, { opacity: 1, duration: speed });
  }
  let currentSlideContainer = 0;
  const sliderContainers = [];

  function setImage(div, index) {
    // console.log("setImage", index, slides[index]);
    const style = div.style;
    style.backgroundImage = "url('" + slides[index] + "')";
  }
  function doInstall(container) {
    const style = container.style;

    const position = getComputedStyleValue(container, "position");
    if (position !== "fixed" && position !== "absolute") {
      style.position = "relative";
    }
    for (let i = 0; i < 2; i++) {
      const slideDiv = document.createElement("div");
      container.append(slideDiv);
      gsap.set(slideDiv, {
        width: "100%",
        "background-size": cover ? "cover" : "contain",
        "background-position": "center",
        "background-repeat": "no-repeat",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        opacity: 0,
        "user-select": "none"
      });
      sliderContainers[i] = slideDiv;
    }
    console.log(sliderContainers);
    goto(0);
    if (autoPlay) play();
    container.addEventListener("swiped-left", () => {
      next();
    });
    container.addEventListener("swiped-right", () => {
      prev();
    });
  }
  function install(container) {
    instance = getCurrentInstance();
    if (isRef(container)) {
      if (container.value) {
        doInstall(container.value);
      } else {
        invoke(async () => {
          await when(container).toBeTruthy();
          console.log("go..........");
          doInstall(container.value);
        });
      }
    } else {
      doInstall(container);
    }
    // tryOnUnmounted(() => {});
  }
  const { currentSlide } = toRefs(state);
  return {
    install,
    slideTo,
    play,
    pause,
    currentSlide,
    totalSlides: slides.length,
    next,
    prev
  };
}
