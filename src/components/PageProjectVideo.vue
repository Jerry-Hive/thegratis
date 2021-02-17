<template>
  <f-page hash="videos">
    <background-video class="full-size" />
  </f-page>
</template>

<script>
import FPage from "@/fullpageScroll/FPage";
import BackgroundVideo from "@/video/BackgroundVideo";
export default {
  name: "PageProjectVideo",
  components: { BackgroundVideo, FPage }
};
</script>

<style scoped></style>
