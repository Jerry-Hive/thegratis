<template>
  <div class="container flex-center">
    <div class="slider-container relative">
      <div class="slider-container" ref="sliderContainer"></div>
      <img
        src="@/assets/arc-tight.png"
        class="arc-cover disable-events disable-select"
        alt=""
      />
    </div>
    <slider-bullets
      style="width:42vh;margin-top:1.5vh;z-index:400"
      :controller="controller"
    />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import SliderBullets from "@/slider/SliderBullets";

export default {
  name: "ArcSlider",
  components: { SliderBullets },
  props: {
    controller: Object
  },
  setup(props) {
    const sliderContainer = ref(null);
    // eslint-disable-next-line vue/no-setup-props-destructure
    const controller = props.controller;
    onMounted(() => {
      controller.install(sliderContainer.value);
    });
    return {
      sliderContainer
    };
  }
};
</script>
<style scoped lang="scss">
@use "../app";
.arc-cover {
  @extend .absolute;
  z-index: 200;
  box-sizing: content-box;
  width: 40vh;
  height: 60vh;
  top: -100vh;
  left: -100vw;
  border-left: 100vw solid app.$peach;
  border-right: 100vw solid app.$peach;
  border-top: 100vh solid app.$peach;
  border-bottom: 100vh solid app.$peach;
}
.slider-container {
  width: 40vh;
  height: 60vh;
}
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
