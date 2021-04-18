<template>
  <f-page
    hash="preface"
    class="flex-center bg-warm-white full-page"
    @before-enter="beforeEnter"
    @entered="entered"
    @before-leave="beforeLeave"
  >
    <div
      class="absolute caslon text-center text-navy full-width"
      style="top:30vh;font-size: 3vh"
    >
      <div
        id="preface-text1"
        class="margin-auto comfort-letter-spacing"
        style="margin-bottom: 1.5vh"
      >
        Twelve individual homes
      </div>
      <div id="preface-text2" class="margin-auto comfort-letter-spacing">
        One exclusive address
      </div>
    </div>

    <img
      ref="image"
      src="@/assets/hand-hero-png8.png"
      class="absolute"
      style="height:30vh;bottom:15vh;opacity:.8"
    />
  </f-page>
</template>

<script>
import { hiveTimeline } from "@/utils/gsapUtils";
// import { registerTimeline } from "@/fullpageScroll/fullPage";
import FPage from "@/fullpageScroll/FPage";

export default {
  name: "page-preface",
  components: { FPage },
  setup() {
    const refs = {
      text1: "#preface-text1",
      text2: "#preface-text2"
    };

    const timeline = hiveTimeline();

    timeline
      .setFadeUpState(refs.text1)
      .fadeUp(refs.text1, { opacity: 0.7 })
      .setFadeUpState(refs.text2)
      .fadeUp(refs.text2, { opacity: 0.7 });
    function entered() {
      console.log("preface entered");
      timeline.play();
    }
    function beforeEnter() {
      timeline.reset();
    }
    function beforeLeave() {
      timeline.pause();
    }
    // registerTimeline(timeline);
    return {
      entered,
      beforeEnter,
      beforeLeave
    };
  }
};
</script>
<style scoped></style>
