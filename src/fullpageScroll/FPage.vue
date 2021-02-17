<template>
  <div style="width:100%;height:100vh;overflow: hidden" ref="container">
    <slot />
  </div>
</template>

<script>
// import { onCreate } from "vue";
import { registerPage } from "@/fullpageScroll/fullPage";
import { ref } from "vue";
export default {
  name: "f-page",
  emits: ["before-enter", "entered", "before-leave", "left"],
  props: {
    pageId: {
      type: String
    },
    hash: String
  },
  setup(props) {
    registerPage(props.hash);
    const container = ref(null);
    return {
      container
    };
  }
};
</script>

<style scoped></style>
