<template>
  <icon-base :size="size" :color="color" :path="path"></icon-base>
</template>

<script>
import { mdiViewList, mdiViewListOutline } from "@mdi/js";
import IconBase from "@/pepper/icons/IconBase";

export default {
  name: "IconViewList",
  components: { IconBase },
  props: {
    size: [Number, String],
    color: String,
    outline: Boolean
  },
  setup(props) {
    if (props.outline) {
      return {
        path: mdiViewListOutline
      };
    } else {
      return {
        path: mdiViewList
      };
    }
  }
};
</script>

<style scoped></style>
