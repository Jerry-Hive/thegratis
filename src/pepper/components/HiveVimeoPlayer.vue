<template>
  <div class="vimeo-container" style="width:100%;height:100%">
    <iframe
      src="https://player.vimeo.com/video/[videoId]?api=1&background=1&autoplay=1&loop=1"
      allowfullscreen="allowfullscreen"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "HiveVimeoPlayer"
};
</script>

<style scoped>
.vimeo-container {
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
iframe {
  box-sizing: border-box;
  width: 177.77777778vh;
  height: 56.25vw;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
