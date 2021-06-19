<template>
  <f-page
    hash="back"
    class="flex-center bg-warm-white full-page"
    @before-enter="beforeEnter"
    @entered="entered"
    @before-leave="beforeLeave"
    style="background-color:#f9f8f4"
  >
    <div
      class="absolute text-center full-width"
      style="top:10vh;font-size: 3vh;z-index: 10"
    >
      <div id="hive" class="margin-auto" style="margin-bottom: 2vh">
        <img src="@/assets/hive-small.png" style="max-width:30vw;height:7vh" />
      </div>
      <div id="slogan" class="margin-auto" style="margin-bottom: 3vh">
        <img src="@/assets/slogan.png" style="max-width:40vw;height:5vh" />
      </div>
      <div
        id="theEnd"
        class="caslon text-center text-navy italic"
        style="font-size:1vh"
      >
        -- The End --
      </div>
    </div>

    <div
      ref="image"
      class="absolute"
      id="back-image"
      style="width:80vw;bottom:2vh;max-width:800px;height:75vh"
    ></div>
  </f-page>
</template>

<script>
import FPage from "@/fullpageScroll/FPage";
import { hiveTimeline } from "@/utils/gsapUtils";
export default {
  name: "page-back",
  components: { FPage },
  setup() {
    const timeline = hiveTimeline();
    const hive = "#hive";
    const slogan = "#slogan";
    const end = "#theEnd";
    timeline
      .setFadeUpState(hive)
      .fadeUp(hive, { opacity: 0.7 })
      .setFadeUpState(slogan)
      .fadeUp(slogan, { opacity: 0.7 })
      .setFadeUpState(end)
      .fadeUp(end, { opacity: 0.7 });
    function entered() {
      timeline.play();
    }
    function beforeEnter() {
      timeline.reset();
    }
    function beforeLeave() {
      timeline.pause();
    }
    return {
      entered,
      beforeEnter,
      beforeLeave
    };
  }
};
</script>
<style scoped>
#back-image {
  background: url(~@/assets/i2-warm.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
