<template>
  <icon-base :size="size" :color="color" :path="path"></icon-base>
</template>

<script>
import IconBase from "./IconBase";
import {
  mdiImage,
  mdiImageMultiple,
  mdiImageOutline,
  mdiImageMultipleOutline
} from "@mdi/js";
export default {
  name: "icon-image",
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
        path = mdiImageMultipleOutline;
      } else {
        path = mdiImageOutline;
      }
    } else {
      if (props.multiple) {
        path = mdiImageMultiple;
      } else {
        path = mdiImage;
      }
    }
    return { path };
  }
};
</script>

<style scoped></style>
