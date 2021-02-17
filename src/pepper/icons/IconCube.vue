<template>
  <icon-base :size="size" :color="color" :path="path"></icon-base>
</template>

<script>
import IconBase from "./IconBase";
import { mdiCube, mdiCubeOutline } from "@mdi/js";
export default {
  name: "icon-cube",
  components: { IconBase },
  props: {
    size: [Number, String],
    color: String,
    outline: Boolean
  },
  setup(props) {
    if (props.outline) {
      return {
        path: mdiCubeOutline
      };
    } else {
      return {
        path: mdiCube
      };
    }
  }
};
</script>

<style scoped></style>
