<template>
  <div>
    <div
      class="hive-photo-slider-container full-size relative"
      @touch-start="touchStart"
      @touch-end="touchEnd"
    >
      <div
        class="slider full-size"
        ref="slider1"
        :style="{ 'background-size': state.cover ? 'cover' : 'contain' }"
      ></div>
      <div
        class="slider full-size"
        ref="slider2"
        :style="{ 'background-size': state.cover ? 'cover' : 'contain' }"
      ></div>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, onUnmounted } from "vue";
import gsap from "gsap";
import { templateRef } from "@vueuse/core";
import { injectPhotoSliderStore } from "@/pepper/components/stores/hivePhotoSliderStore";
export default {
  emits: ["slide"],
  name: "HivePhotoSliderHeadless",
  props: { autoPlay: Boolean, debug: Boolean },
  setup(props, ctx) {
    let currentSlideContainer = 0;
    const sliderContainers = [];
    const slider1 = templateRef("slider1");
    const slider2 = templateRef("slider2");
    const store = injectPhotoSliderStore();
    function setImage(div, index) {
      if (props.debug) console.log("setImage", index, store.photos[index]);
      const style = div.style;
      style.backgroundImage = "url('" + store.photos[index] + "')";
    }

    function unify(e) {
      return e.changedTouches ? e.changedTouches[0] : e;
    }
    let x0 = null;

    function lock(e) {
      x0 = unify(e).clientX;
    }

    const touchStart = e => {
      // console.log("touchStart", e);
      lock(e);
    };
    const touchEnd = e => {
      // console.log("touchEnd", e);
      const THRESHOLD = e.target.clientWidth / 10;
      let dx = unify(e).clientX - x0;
      if (Math.abs(dx) > THRESHOLD) {
        dx > 0 ? store.prev() : store.next();
      }
      // console.log(dx, s, THRESHOLD);
    };
    const keyPress = e => {
      if (e.key === "ArrowLeft") {
        store.prev();
      } else if (e.key === "ArrowRight") {
        store.next();
      }
    };
    onMounted(() => {
      sliderContainers[0] = slider1;
      sliderContainers[1] = slider2;
      // console.log("headless mounted");
      watch(
        () => store.state.cursor,
        cursor => {
          // console.log("...................." + cursor);
          ctx.emit("slide", cursor);

          const outSlider = sliderContainers[currentSlideContainer].value;

          currentSlideContainer = 1 - currentSlideContainer;
          const inSlider = sliderContainers[currentSlideContainer].value;
          setImage(inSlider, cursor);
          gsap.set(inSlider, {
            opacity: 0
          });
          gsap.to(outSlider, {
            opacity: 0,
            duration: store.state.speed
          });
          gsap.to(inSlider, { opacity: 1, duration: store.state.speed });
        },
        {
          immediate: true
        }
      );
      if (store.state.keyEvent) document.addEventListener("keyup", keyPress);
    });
    onUnmounted(() => {
      if (store.state.keyEvent) document.removeEventListener("keyup", keyPress);
    });
    return {
      state: store.state,
      touchStart,
      touchEnd
    };
  }
};
</script>

<style scoped lang="scss">
@use "../pepper" as *;
.hive-photo-slider-container {
}
.slider {
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  user-select: none;
}
</style>
