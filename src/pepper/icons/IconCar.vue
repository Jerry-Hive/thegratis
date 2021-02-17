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
import { mdiCar } from "@mdi/js";
export default {
  name: "IconCar",
  setup() {
    return { path: mdiCar };
  }
};
</script>

<style scoped></style>
