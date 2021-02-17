<template>
  <div class="fluid-container"><slot /></div>
</template>

<script>
import { provide, toRefs } from "vue";

export default {
  name: "FluidBox",
  props: {
    padding: String
  },
  setup(props) {
    const { padding } = toRefs(props);
    provide("fluid-padding", padding);
  }
};
</script>

<style scoped>
div {
  box-sizing: border-box;
}
.fluid-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
