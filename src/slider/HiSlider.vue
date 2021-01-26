<template>
  <div ref="container"></div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "HiSlider",
  props: {
    controller: Object
  },
  setup(props) {
    const container = ref(null);
    onMounted(() => {
      props.controller.install(container);
    });
    return {
      container
    };
  }
};
</script>

<style scoped></style>
