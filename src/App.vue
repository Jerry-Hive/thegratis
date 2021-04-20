<template>
  <f-page-viewport>
    <page-overlay />
    <page-cover />
    <page-preface />
    <page-project-video />
    <page-the-homes-slider />
    <page-aerial />
    <page-the-lifestyle-slider />
    <f-page>nima</f-page>
    <f-page>niba</f-page>
  </f-page-viewport>
</template>

<script>
import PageCover from "@/components/PageCover";
import FPageViewport from "@/fullpageScroll/FPageViewport";
import FPage from "@/fullpageScroll/FPage";
import PagePreface from "@/components/PagePreface";
import PageOverlay from "@/components/PageOverlay";
import PageTheHomesSlider from "@/components/PageTheHomesSlider";
import PageAerial from "@/components/PageAerial";
import PageProjectVideo from "@/components/PageProjectVideo";
import * as Vue from "vue";
import PageTheLifestyleSlider from "@/components/PageTheLifestyleSlider";
console.log(Vue.version);
export default {
  name: "App",
  components: {
    PageTheLifestyleSlider,
    PageProjectVideo,
    PageAerial,
    PageTheHomesSlider,
    PageOverlay,
    PagePreface,
    FPage,
    FPageViewport,
    PageCover
  }
};
</script>

<style lang="scss">
@import "app";
</style>
