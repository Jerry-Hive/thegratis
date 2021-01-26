import { reactive, toRefs } from "vue";
import gsap from "gsap";

export function useSliderController(slides = [], options = {}) {
  const { autoPlay = false, speed = 1, delay = 3 } = options;
  let intervalId;
  const state = reactive({
    currentSlide: 0
  });
  let paused = true;
  function play() {
    const timeout = paused ? delay : delay + speed;
    pause();
    intervalId = setInterval(() => {
      let to = state.currentSlide + 1;
      if (to >= slides.length) {
        to = 0;
      }
      goto(to);
    }, timeout * 1000);
    paused = false;
  }
  function pause() {
    paused = true;
    if (intervalId) clearInterval(intervalId);
  }
  function slideTo(index) {
    goto(index);
    play();
  }
  function goto(index) {
    const outSlider = sliderContainers[currentSlideContainer];
    currentSlideContainer = 1 - currentSlideContainer;
    const inSlider = sliderContainers[currentSlideContainer];
    state.currentSlide = index;
    setImage(inSlider, index);
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
    console.log("setImage", index, slides[index]);
    const style = div.style;
    style.backgroundImage = "url('" + slides[index] + "')";
  }
  function install(container) {
    const style = container.style;
    style.position = "relative";
    for (let i = 0; i < 2; i++) {
      const slideDiv = document.createElement("div");
      container.append(slideDiv);
      gsap.set(slideDiv, {
        width: "100%",
        "background-size": "cover",
        "background-position": "center",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        opacity: 0
      });
      sliderContainers.push(slideDiv);
    }
    goto(0);
    if (autoPlay) play();
  }
  const { currentSlide } = toRefs(state);
  return {
    install,
    slideTo,
    play,
    pause,
    currentSlide
  };
}
