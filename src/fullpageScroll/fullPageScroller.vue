<template>
  <div
    style="box-sizing:border-box;width:100vw;height:100vh;position: fixed;top:0;left:0;overflow: hidden"
  >
    <slot />
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  name: "fullPageScroller",
  setup() {
    const dummy = document.createElement("div");
    // style = 'visibility: hidden'
    dummy.innerHTML = "<div>Invisible</div>";
    document.body.appendChild(dummy);
    onMounted(() => {
      console.log("scroller mounted");
    });
  }
};
</script>

<style scoped></style>
