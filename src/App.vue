<template>
  <f-page-viewport>
    <page-overlay />
    <page-cover />
    <page-preface />
    <page-project-video />
    <page-the-homes-slider />
    <page-aerial />
    <page-the-lifestyle-slider />
    <page-back />
  </f-page-viewport>
</template>

<script>
import PageCover from "@/components/PageCover";
import FPageViewport from "@/fullpageScroll/FPageViewport";
import PagePreface from "@/components/PagePreface";
import PageOverlay from "@/components/PageOverlay";
import PageTheHomesSlider from "@/components/PageTheHomesSlider";
import PageAerial from "@/components/PageAerial";
import PageProjectVideo from "@/components/PageProjectVideo";
import * as Vue from "vue";
import PageTheLifestyleSlider from "@/components/PageTheLifestyleSlider";
import PageBack from "@/components/PageBack";
console.log(Vue.version);
export default {
  name: "App",
  components: {
    PageBack,
    PageTheLifestyleSlider,
    PageProjectVideo,
    PageAerial,
    PageTheHomesSlider,
    PageOverlay,
    PagePreface,
    FPageViewport,
    PageCover
  }
};
</script>

<style lang="scss">
@import "app";
</style>
