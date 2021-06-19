<template>
  <f-page hash="videos" @entered="entered" @before-leave="beforeLeave">
    <hi-responsive-vimeo
      class="full-size"
      id="537579443"
      :play="play"
      quality="1080p"
      @play="onPlay"
    />
    <img
      ref="mask"
      src="@/assets/gr-mask.png"
      style="width:100vw;height: 100vh;z-index: 10;position: absolute;left:0;top:0;transition: opacity .5s;opacity:0"
    />
    <center-box
      style="width:100vw;height: 100vh;z-index: 20;position: absolute;left:0;top:0;"
    >
      <img
        ref="unlimited"
        src="@/assets/an-unlimited-you-white.png"
        style="transition: opacity 2s;opacity:0;max-width: 60%;width:500px"
      />
    </center-box>
  </f-page>
</template>

<script>
import FPage from "@/fullpageScroll/FPage";
import HiResponsiveVimeo from "hive-vue/modules/components/HiResponsiveVimeo";
import { CenterBox } from "hive-vue/layouts";
import { ref } from "vue";
import { templateRef } from "@vueuse/core";
export default {
  name: "PageProjectVideo",
  components: { FPage, HiResponsiveVimeo, CenterBox },
  setup() {
    const play = ref(false);
    const mask = templateRef("mask");
    const unlimited = templateRef("unlimited");
    function entered() {
      play.value = true;
    }
    function beforeLeave() {
      play.value = false;
    }
    function onPlay() {
      mask.value.style.opacity = 1;
      unlimited.value.style.opacity = 0.7;
    }
    return {
      play,
      entered,
      beforeLeave,
      onPlay
    };
  }
};
</script>

<style>
iframe {
  border: none;
}
</style>
