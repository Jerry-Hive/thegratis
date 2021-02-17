<template>
  <icon-base :size="size" :color="color" :path="path"></icon-base>
</template>

<script>
import IconBase from "./IconBase";
import {
  mdiPlayBox,
  mdiPlayBoxMultiple,
  mdiPlayBoxMultipleOutline,
  mdiPlayBoxOutline
} from "@mdi/js";
export default {
  name: "icon-play-box",
  components: { IconBase },
  props: {
    size: [Number, String],
    color: String,
    outline: Boolean,
    multiple: Boolean
  },
  setup(props) {
    let path;
    if (props.outline) {
      if (props.multiple) {
        path = mdiPlayBoxMultipleOutline;
      } else {
        path = mdiPlayBoxOutline;
      }
    } else {
      if (props.multiple) {
        path = mdiPlayBoxMultiple;
      } else {
        path = mdiPlayBox;
      }
    }
    return { path };
  }
};
</script>

<style scoped></style>
