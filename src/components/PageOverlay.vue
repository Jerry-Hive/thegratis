<template>
  <f-page-overlay class="flex-center">
    <img
      src="@/assets/register.png"
      class="absolute hand enable-events"
      style="width:8vh;height:8vh;top:-1.5vh;transition: opacity .5s"
      :id="regId"
      ref="register"
      @mouseenter="regEnter"
      @mouseleave="regLeave"
      @click="regClick"
    />
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      class="fill-navy enable-events"
      style="height:300vh;z-index:999998;position:fixed;transition:width 1s, height 1s,transform 1s;transition-timing-function: ease-in-out;"
      ref="circle"
      id="circle"
    >
      <circle cx="50" cy="50" r="50" />
    </svg>
    <transition-fade :y-percent="5" :delay="0.5">
      <register-form style="z-index: 999999" v-if="isFormOpen" />
    </transition-fade>
    <transition-fade :y-percent="5" :delay="0.5">
      <div
        style="position: fixed; top:20px;right:20px;width:25px;cursor: pointer;z-index: 99999999"
        class="stroke-peach enable-events"
        @click="close"
        v-if="isFormOpen"
      >
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 22.6 22.6"
        >
          <line class="svg-close" x1="0.4" y1="22.2" x2="22.2" y2="0.4" />
          <line class="svg-close" x1="22.2" y1="22.2" x2="0.4" y2="0.4" />
        </svg>
      </div>
    </transition-fade>
    <transition-fade>
      <div
        style="position: fixed;bottom: 0;height:50px"
        v-if="currentPage > 0 && currentPage !== getTotalPages() - 1"
      >
        <scroll-down-ani-sml @click="nextPage" class="enable-events hand" />
      </div>
    </transition-fade>
    <transition-fade>
      <div style="position: fixed;top: 0;height:50px" v-if="isLastPage">
        <scroll-up-ani-sml @click="firstPage" class="enable-events hand" />
      </div>
    </transition-fade>
  </f-page-overlay>
</template>

<script>
import FPageOverlay from "@/fullpageScroll/FPageOverlay";
import {
  firstPage,
  getTotalPages,
  isLastPage,
  nextPage,
  useCurrentPage,
  useIsLastPage
} from "@/fullpageScroll/fullPage";
import { onMounted, ref, watch } from "vue";
import gsap from "gsap";
import { IDs } from "@/utils/global";
import { getComputedStyleValue } from "@/pepper/utils/domUtils";
import styler from "@/pepper/utils/styler";
import { templateRef } from "@vueuse/core";
import RegisterForm from "@/components/RegisterForm";
import TransitionFade from "@/pepper/animation/TransitonFade";
import ScrollDownAniSml from "@/components/ScrollDownAniSml";
import ScrollUpAniSml from "@/components/ScrollUpAniSml";

export default {
  name: "PageOverlay",
  components: {
    ScrollUpAniSml,
    ScrollDownAniSml,
    TransitionFade,
    RegisterForm,
    FPageOverlay
  },
  setup() {
    const currentPage = useCurrentPage();
    const regId = IDs.registerBtn;

    const reg = "#" + regId;
    const isFormOpen = ref(false);
    watch(currentPage, v => {
      console.log("cPage changed", v);
      if (v > 0) {
        if (isLastPage()) {
          gsap.to(reg, { top: "38vh", opacity: 0.9 });
        } else {
          console.log("move reg to top");
          gsap.to(reg, { top: "-1.5vh", opacity: 0.7 });
        }
      }
    });
    const circleRef = templateRef("circle");
    // const regRef = templateRef("register");
    onMounted(() => {
      const circleStyler = styler(circleRef.value);
      circleStyler.scale(0, 0);
    });
    function regClick() {
      const circleStyler = styler(circleRef.value);
      // circleStyler.centerTo(regRef.value);
      circleStyler.scale(1, 1);
      isFormOpen.value = true;
    }
    function close() {
      isFormOpen.value = false;
      const circleStyler = styler(circleRef.value);
      // circleStyler.centerTo(regRef.value);
      circleStyler.scale(0, 0);
    }
    return {
      isFormOpen,
      currentPage,
      getTotalPages: getTotalPages,
      nextPage: nextPage,
      firstPage: firstPage,
      isLastPage: useIsLastPage(),
      regId,
      regClick,
      regEnter() {
        const opacity = getComputedStyleValue(
          document.getElementById(regId),
          "opacity"
        );
        console.log(opacity);
        if (opacity > 0) gsap.to(reg, { opacity: 1 });
      },
      regLeave() {
        const opacity = getComputedStyleValue(
          document.getElementById(regId),
          "opacity"
        );
        if (opacity > 0) gsap.to(reg, { opacity: 0.7 });
      },
      close
    };
  }
};
</script>

<style scoped></style>
