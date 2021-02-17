<template>
  <div style="width:100%;text-align:center">
    <img
      src="@/assets/bullet.png"
      v-for="n in totalSlides"
      :key="n"
      class="hive-slide-bullet"
      :class="{ 'hive-slide-bullet--active': currentSlide === n - 1 }"
      @click="handleClick(n - 1)"
    />
  </div>
</template>

<script>
// import { TweenLite, Power2 } from "gsap/all";
import { injectPhotoSliderStore } from "@/pepper/components/stores/hivePhotoSliderStore";
import { computed } from "vue";

export default {
  name: "SliderBullets",
  components: {},
  setup() {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const store = injectPhotoSliderStore();
    function handleClick(n) {
      console.log(n);
      store.goto(n);
    }

    return {
      handleClick,
      currentSlide: computed(() => store.state.cursor),
      totalSlides: computed(() => store.photos.length)
    };
  }
};
</script>
<style scoped>
.hive-slide-bullet {
  /* height: 25px;
	width: 25px; */
  background-color: white;
  /* border-radius: 50%; */
  display: inline-block;

  /* border: none;
	box-shadow: inset 1px 1px 2px #333; */
  /* text-shadow: 0px 2px 3px rgba(255,255,255,0.5); */
  /* filter: drop-shadow(1px 1px 2px #333333); */
  transition: all 0.5s;
  width: 1.5vh;
  height: 1.5vh;
  margin: 0px 0.4vh;
  cursor: pointer;
}
.hive-slide-bullet--active {
  background-color: #666666;
  /* box-shadow: inset 1px 1px 2px #333; */
}
</style>
