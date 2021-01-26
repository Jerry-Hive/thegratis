<template>
  <div
    style="width:100%;height:100vh;top:0;left:0;position: absolute;z-index: 1000;pointer-events: none"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "f-page-overlay"
};
</script>

<style scoped></style>
