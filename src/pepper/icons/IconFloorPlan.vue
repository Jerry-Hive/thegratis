<template>
  <icon-base :size="size" :color="color" :path="path"></icon-base>
</template>

<script>
import IconBase from "./IconBase";
import { mdiFloorPlan } from "@mdi/js";
export default {
  name: "icon-floor-plan",
  components: { IconBase },
  props: {
    size: [Number, String],
    color: String
  },
  setup() {
    return { path: mdiFloorPlan };
  }
};
</script>

<style scoped></style>
