<template>
  <icon-base :size="size" :color="color" :path="path"></icon-base>
</template>

<script>
import IconBase from "./IconBase";
import { mdiClose, mdiCloseCircle, mdiCloseCircleOutline } from "@mdi/js";
import { computed } from "vue";

export default {
  name: "icon-close",
  components: { IconBase },
  props: {
    size: [Number, String],
    color: String,
    circle: Boolean,
    outline: Boolean
  },
  setup(props) {
    const path = computed(() => {
      if (props.circle) {
        return props.outline ? mdiCloseCircleOutline : mdiCloseCircle;
      } else {
        return mdiClose;
      }
    });

    return { path };
  }
};
</script>

<style scoped></style>
