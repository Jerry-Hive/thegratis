<template>
  <div
    :style="{ display: inline ? 'inline-flex' : 'flex' }"
    style="align-items: center"
  >
    <slot />
  </div>
</template>

<script>
/**
 * To align text to center of the SVG icon
 * To make icon slightly bigger than text
 */
export default {
  name: "IconItem",
  props: {
    inline: Boolean
  }
};
</script>

<style scoped>
::v-deep svg {
  margin-right: 0.5em;
  font-size: 110%;
}
</style>
