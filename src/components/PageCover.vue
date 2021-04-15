<template>
  <f-page
    @before-enter="onBeforeEnter"
    @before-leave="onBeforeLeave"
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
import { onMounted } from "vue";
import gsap from "gsap";
import FPage from "@/fullpageScroll/FPage";
import { nextPage, useCurrentPage } from "@/fullpageScroll/fullPage";
import ScrollDownAni from "@/components/ScrollDownAni";
import { IDs } from "@/utils/global";

export default {
  name: "CoverPage",
  components: { ScrollDownAni, FPage },
  setup() {
    const timeline = gsap.timeline({ delay: 1, paused: true });
    const currentPage = useCurrentPage();
    function setMotionFadeState(what, and = {}) {
      gsap.set(what, {
        ...and,
        opacity: 0,
        translateY: "20%"
      });
    }
    function toMotionFade(what, opacity = 1) {
      timeline.to(what, {
        translateY: 0,
        opacity,
        duration: 1
      });
    }

    const refs = {
      register: "#" + IDs.registerBtn
    };
    const registerCenterState = {
      top: "59vh",
      opacity: 0.7
    };
    onMounted(() => {
      gsap.set("#arc", {
        opacity: 0,
        scale: 10
      });
      gsap.set("#hero", {
        opacity: 0
      });
      setMotionFadeState("#cover-logo");
      setMotionFadeState("#cover-deepdene");
      setMotionFadeState("#cover-scroll-down");

      if (currentPage.value === 0) {
        setMotionFadeState(refs.register, registerCenterState);
      }
      toMotionFade("#hero");

      timeline.to("#arc", {
        opacity: 1,
        duration: 2,
        scale: 1,
        ease: "power3.out"
      });
      toMotionFade("#cover-logo", 0.9);
      toMotionFade("#cover-deepdene", 0.8);
      timeline.to(refs.register, {
        ...registerCenterState,
        translateY: 0
      });
      toMotionFade("#cover-scroll-down");
    });
    function onload() {
      console.log("image onload");
      if (currentPage.value === 0) {
        console.log("current page 0 and play!");
        timeline.play();
      }
    }
    function onBeforeEnter() {
      console.log("cover before enter");
      if (timeline.paused()) timeline.resume();
      else gsap.to(refs.register, registerCenterState);
    }
    function entered() {
      console.log("cover entered");
    }
    function onBeforeLeave() {
      if (timeline.isActive()) timeline.pause();
    }
    function next() {
      nextPage();
    }
    return { onload, onBeforeEnter, next, onBeforeLeave, entered };
  }
};
</script>

<style lang="scss" scoped>
.z-top {
  z-index: 30;
}
</style>
