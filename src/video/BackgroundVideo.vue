<template>
  <div style="position: relative;">
    <div class="overlay origin" style="z-index: 2"></div>
    <video
      src="https://thegratis.com.au/videos/1.mp4"
      :autoplay="autoplay"
      loop
      playsinline
      muted
    ></video>
  </div>
</template>

<script>
export default {
  name: "BackgroundVideo",
  props: {
    autoplay: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.overlay {
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  background: radial-gradient(
    circle,
    /*rgba(237, 217, 208, 0.3) 0%,*/ /*rgba(237, 217, 208, 0.4) 80%,*/
      /*rgba(237, 217, 208, 0.7) 100%*/ rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.4) 80%,
    rgba(0, 0, 0, 0.7) 100%
  );
}
.origin {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
