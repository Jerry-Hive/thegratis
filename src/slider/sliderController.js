import { reactive, toRefs } from "vue";
import gsap from "gsap";

export function useSliderController(
  slides = [],
  { autoPlay = true, speed = 1, delay = 3 }
) {
  let intervalId;
  const state = reactive({
    currentSlide: 0
  });
  function play() {
    pause();
    intervalId = setInterval(() => {
      let to = state.currentSlide + 1;
      if (to >= sliderContainers.length) {
        to = 0;
      }
      goto(to);
    }, delay);
  }
  function pause() {
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
    gsap.to(inSlider, { opacity: 1 });
  }
  let currentSlideContainer = 0;
  const sliderContainers = [];

  function setImage(div, index) {
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
