<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" :style="computedStyles">
    <path :d="path" />
  </svg>
</template>

<script>
import { computed } from "vue";

export default {
  name: "IconBase",
  props: {
    size: {
      type: [Number, String],
      default: "1em"
    },
    color: {
      type: String,
      default: "currentColor"
    },
    path: {
      type: String,
      required: true
    },
    styles: Object
  },
  setup(props) {
    return {
      computedStyles: computed(() => {
        return Object.assign(
          {
            fill: "currentColor",
            display: "inline-block"
          },
          props.styles
        );
      })
    };
  }
};
</script>

<style scoped></style>
