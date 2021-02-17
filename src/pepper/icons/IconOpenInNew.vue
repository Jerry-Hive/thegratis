<template>
  <icon-base :size="size" :color="color" :path="path"></icon-base>
</template>

<script>
import { mdiOpenInNew } from "@mdi/js";
import IconBase from "@/pepper/icons/IconBase";

export default {
  name: "IconOpenInNew",
  components: { IconBase },
  props: {
    size: [Number, String],
    color: String
  },
  setup() {
    return { path: mdiOpenInNew };
  }
};
</script>

<style scoped></style>
