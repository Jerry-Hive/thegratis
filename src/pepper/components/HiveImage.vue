<template>
  <div
    style="
      background-size: cover;
      background-position: center;
      position: relative;
    "
    :style="styles"
  >
    <div class="absolute-full"><slot /></div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "HiveImage",
  props: {
    src: { type: String, required: true },
    aspectRatio: { type: Number }
  },
  setup(props) {
    const styles = computed(() => {
      const obj = {
        "background-image": "url(" + props.src + ")"
      };
      if (props.aspectRatio) {
        obj.height = 0;
        obj["padding-top"] = props.aspectRatio * 100 + "%";
      }
      return obj;
    });
    return { styles };
  }
};
</script>

<style scoped></style>
