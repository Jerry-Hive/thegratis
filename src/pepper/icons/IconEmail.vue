<template>
  <icon-base :size="size" :color="color" :path="path"></icon-base>
</template>

<script>
import IconBase from "./IconBase";
import { mdiEmail, mdiEmailOutline } from "@mdi/js";
export default {
  name: "icon-email",
  components: { IconBase },
  props: {
    size: [Number, String],
    color: String,
    outline: Boolean
  },
  setup(props) {
    if (props.outline) {
      return {
        path: mdiEmailOutline
      };
    } else {
      return {
        path: mdiEmail
      };
    }
  }
};
</script>

<style scoped></style>
