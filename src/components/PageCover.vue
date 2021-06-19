<template>
  <f-page
    @before-enter="onBeforeEnter"
    @before-leave="onBeforeLeave"
    @left="left"
    @entered="entered"
  >
    <div class="full-page flex-center bg-warm-white">
      <img
        id="arc"
        ref="arc"
        src="@/assets/arc.png"
        class="absolute"
        style="height:45vh;top:-95vh;z-index:20; box-sizing: content-box;border:100vh solid #edd9d0;border-right: 100vw solid #edd9d0;border-left: 100vw solid #edd9d0;"
        @load="onload"
      />

      <img
        id="hero"
        ref="hero"
        class="absolute"
        src="@/assets/i-hero.png"
        style="height:45vh;top:5vh;z-index:10"
      />
      <img
        src="@/assets/logo-dark.png"
        id="cover-logo"
        ref="logo"
        class="absolute z-top"
        style="height:5.5vh;top:47vh;"
      />

      <img
        src="@/assets/deepdene.png"
        id="cover-deepdene"
        ref="deepdene"
        class="absolute z-top"
        style="height:1.6vh;top:54vh"
      />
      <scroll-down-ani
        id="cover-scroll-down"
        ref="scrollDown"
        class="absolute z-top hand"
        style="top:70.5vh"
        @click="next"
      />
    </div>
  </f-page>
</template>

<script>
import gsap from "gsap";
import {
  getEnteringPage,
  nextPage,
  useCurrentPage
} from "@/fullpageScroll/fullPage";
import ScrollDownAni from "@/components/ScrollDownAni";
import { IDs } from "@/utils/global";
import { hiveTimeline } from "@/utils/gsapUtils";
import FPage from "@/fullpageScroll/FPage";

export default {
  name: "CoverPage",
  components: { ScrollDownAni, FPage },
  setup() {
    const refs = {
      register: "#" + IDs.registerBtn,
      logo: "#cover-logo",
      deepdene: "#cover-deepdene",
      scrollDown: "#cover-scroll-down",
      arc: "#arc",
      hero: "#hero"
    };

    let played = false;
    let imageLoaded = false;
    const registerCenterState = {
      top: "59vh",
      opacity: 0.7
    };

    const timeline = hiveTimeline();
    timeline
      .setFromState(refs.hero, { opacity: 0 })
      .fadeIn(refs.hero)
      .setFromState(refs.arc, { opacity: 0, scale: 10 })
      .to(refs.arc, { opacity: 1, scale: 1, duration: 2, ease: "power3.out" })
      .setFadeUpState(refs.logo)
      .fadeUp(refs.logo, { opacity: 0.7 })
      .setFadeUpState(refs.deepdene)
      .fadeUp(refs.deepdene, { opacity: 0.7 })
      .fadeUp(refs.register, { opacity: 0.7 })
      .setFadeUpState(refs.scrollDown, { opacity: 0.7 })
      .to(refs.register, registerCenterState)

      .fadeUp(refs.scrollDown);

    // const timeline = gsap.timeline({ delay: 1, paused: true });
    const currentPage = useCurrentPage();

    function play() {
      if (currentPage.value !== 0) return;
      if (!imageLoaded) return;
      if (played) return;
      played = true;
      timeline.play();
    }
    function onload() {
      console.log("image onload");
      imageLoaded = true;
      play();
      // if (currentPage.value === 0) {
      //   console.log("current page 0 and play!");
      //   play();
      // }
    }
    function onBeforeEnter() {
      console.log("cover before enter");
      const enteringPage = getEnteringPage();
      if (enteringPage !== 0) {
        gsap.set(refs.hero, { opacity: 1 });
      }
      if (!played) {
        gsap.set(refs.register, {
          ...registerCenterState,
          translateY: "20%",
          opacity: 0
        });
      } else {
        // console.log("played and only set reg", registerCenterState);
        gsap.to(refs.register, registerCenterState);
        timeline.end();
      }
      // if (timeline.paused()) timeline.resume();
      // else gsap.to(refs.register, registerCenterState);
    }
    function entered() {
      play();
    }
    function onBeforeLeave() {
      timeline.pause();
    }
    function left() {}
    function next() {
      nextPage();
    }
    return { onload, onBeforeEnter, next, onBeforeLeave, entered, left };
  }
};
</script>

<style lang="scss" scoped>
.z-top {
  z-index: 30;
}
</style>
