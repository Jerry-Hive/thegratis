<template>
  <icon-base :size="size" :color="color" :path="path"></icon-base>
</template>

<script>
import IconBase from "./IconBase";
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiChevronDown,
  mdiChevronUp,
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
  mdiChevronDoubleDown,
  mdiChevronDoubleUp
} from "@mdi/js";
export default {
  name: "icon-chevron",
  components: { IconBase },
  props: {
    size: [Number, String],
    color: String,
    double: Boolean,
    left: {
      type: Boolean,
      default: true
    },
    right: Boolean,
    up: Boolean,
    down: Boolean
  },
  setup(props) {
    let path;
    if (props.right) {
      path = props.double ? mdiChevronDoubleRight : mdiChevronRight;
    } else if (props.up) {
      path = props.double ? mdiChevronDoubleUp : mdiChevronUp;
    } else if (props.down) {
      path = props.double ? mdiChevronDoubleDown : mdiChevronDown;
    } else {
      path = props.double ? mdiChevronDoubleLeft : mdiChevronLeft;
    }
    return { path };
  }
};
</script>

<style scoped></style>
