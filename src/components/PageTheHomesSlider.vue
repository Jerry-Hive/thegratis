<template>
  <f-page @before-leave="beforeLeave" @entered="entered">
    <div class="full-size" style="display:flex;">
      <div class="col">Left</div>
      <div class="col flex-center">
        <arc-slider :controller="slideController" />
      </div>
    </div>
  </f-page>
</template>

<script>
import FPage from "@/fullpageScroll/FPage";
import ArcSlider from "@/components/ArcSlider";
import homesData from "@/data/TheHomes.json";
import { useSliderController } from "@/slider/sliderController";
export default {
  name: "PageTheHomesSlider",
  components: { ArcSlider, FPage },
  setup() {
    const slides = [];
    homesData.slides.forEach(element => {
      // carouselTitles[data.length] = element.title;
      slides.push("/images/render/" + element.img + ".jpg");
    });
    const slideController = useSliderController(slides);
    function beforeLeave() {
      slideController.pause();
    }
    function entered() {
      console.log("the homes entered");
      slideController.play();
    }
    return { slideController, beforeLeave, entered };
  }
};
</script>

<style scoped>
.col {
  flex: 1 1 0;
}
</style>
