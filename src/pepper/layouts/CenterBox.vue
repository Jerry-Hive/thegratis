<template>
  <div
    class="container"
    :style="{ display: inline ? 'inline-flex' : 'flex' }"
    :class="{ 'h-center': hCenter }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "CenterBox",
  props: {
    inline: Boolean,
    hCenter: Boolean
  }
};
</script>

<style scoped>
.container {
  flex-direction: column;
  /*align-items: center;*/
  justify-content: center;
  height: 100%;
}
.h-center {
  align-items: center;
}
</style>
