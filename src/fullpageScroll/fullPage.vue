<template>
  <div style="width:100%;height:100vh;border:1px solid red" ref="container">
    <slot />
  </div>
</template>

<script>
// import { onCreate } from "vue";
import { registerPage } from "@/fullpageScroll/fullPageState";
import { ref } from "vue";
export default {
  name: "full-page",
  emits: ["enter"],
  props: {
    pageId: {
      type: String
    }
  },
  setup() {
    registerPage();
    const container = ref(null);
    return {
      container
    };
  }
};
</script>

<style scoped></style>
