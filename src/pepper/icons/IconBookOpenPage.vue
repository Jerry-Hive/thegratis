<template>
  <icon-base :size="size" :color="color" :path="path"></icon-base>
</template>

<script>
import { mdiBookOpenPageVariant, mdiBookOpenPageVariantOutline } from "@mdi/js";
import IconBase from "@/pepper/icons/IconBase";

export default {
  name: "IconBookOpenPage",
  components: { IconBase },
  props: {
    size: [Number, String],
    color: String,
    outline: Boolean
  },
  setup(props) {
    if (props.outline) {
      return {
        path: mdiBookOpenPageVariantOutline
      };
    } else {
      return {
        path: mdiBookOpenPageVariant
      };
    }
  }
};
</script>

<style scoped></style>
