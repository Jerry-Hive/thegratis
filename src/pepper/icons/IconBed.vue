<template>
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    style="fill: currentColor;display: inline-block;width:1em;height:1em"
  >
    <path :d="path" />
  </svg>
</template>

<script>
import { mdiBed } from "@mdi/js";
export default {
  name: "IconBed",
  setup() {
    return { path: mdiBed };
  }
};
</script>

<style scoped></style>
