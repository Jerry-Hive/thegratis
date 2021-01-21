<template>
  <div
    style="box-sizing:border-box;width:100vw;height:100vh;position: fixed;top:0px;left:0px;overflow: hidden"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "fullPageScroller",
  setup() {
    const dummy = document.createElement("div");
    // style = 'visibility: hidden'
    dummy.innerHTML = "<div>Invisible</div>";
    document.body.appendChild(dummy);
  }
};
</script>

<style scoped></style>
