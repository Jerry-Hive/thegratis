<template>
  <f-page-viewport>
    <!--    <page-overlay />-->
    <page-cover />
    <page-preface />
    <page-the-homes-slider />
    <f-page>nima</f-page>
    <f-page>niba</f-page>
  </f-page-viewport>
</template>

<script>
import PageCover from "@/components/PageCover";
import FPageViewport from "@/fullpageScroll/FPageViewport";
import FPage from "@/fullpageScroll/FPage";
import PagePreface from "@/components/PagePreface";
// import PageOverlay from "@/components/PageOverlay";
import PageTheHomesSlider from "@/components/PageTheHomesSlider";
export default {
  name: "App",
  components: {
    PageTheHomesSlider,
    // PageOverlay,
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
