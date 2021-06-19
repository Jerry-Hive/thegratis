<template>
  <div class="arc-slider-container flex-center">
    <div class="slider-container relative">
      <hive-photo-slider-headless class="slider-container" debug />
      <img
        src="@/assets/arc-tight.png"
        class="arc-cover disable-events disable-select"
        alt=""
      />
    </div>
    <slider-bullets style="width:42vh;margin-top:1.5vh;z-index:400" />
  </div>
</template>

<script>
import SliderBullets from "./SliderBullets";
import HivePhotoSliderHeadless from "@/pepper/components/HivePhotoSliderHeadless";

export default {
  name: "ArcSlider",
  components: { HivePhotoSliderHeadless, SliderBullets }
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
.arc-slider-container {
  //width: 100%;
  //height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
