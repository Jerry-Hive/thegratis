<template>
  <div
    style="box-sizing:border-box;width:100vw;height:100vh;position: fixed;top:0;left:0;overflow: hidden"
  >
    <slot />
  </div>
</template>

<script>
// import { onMounted } from "vue";
// import { pages } from "@/fullpageScroll/fullPageState";

import { init } from "@/fullpageScroll/fullPage";

export default {
  name: "f-page-viewport",
  setup() {
    init();
  }
};
</script>

<style scoped></style>
