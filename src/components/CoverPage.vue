<template>
  <full-page @enter="onEnter">
    Cover Page
  </full-page>
</template>

<script>
import FullPage from "@/fullpageScroll/fullPage";
// import { onFullPageEnter } from "@/fullpageScroll/fullPageState";
export default {
  name: "CoverPage",
  components: { FullPage },
  setup() {
    // onFullPageEnter(() => {});
    function onEnter() {
      console.log("enter");
    }
    return {
      onEnter
    };
  }
};
</script>

<style scoped></style>
