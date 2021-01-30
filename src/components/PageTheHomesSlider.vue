<template>
  <f-page @before-leave="beforeLeave" @entered="entered" class="bg-peach">
    <div class="full-size text-navy" style="display:flex;">
      <div class="col flex-center" v-if="showLeft">
        <div style="width:80%">
          <img src="@/assets/the-homes.png" style="height:7vh;" />
          <br />
          <br />
          <hive-text-carousel
            class="caslon h1"
            :content="carouselTitles"
            :current-label="currentSlide"
            style="width:100%;height:5vh"
          ></hive-text-carousel>
          <div class="caslon h2 italic" style="height:20vh">
            <div class="quote">
              <hive-text-carousel
                ref="titleCar"
                class="caslon h1"
                :content="carouselQuotes"
                :current-label="people"
                style="width:100%;height:10vh"
              ></hive-text-carousel>

              <hive-text-carousel
                class="caslon h1"
                :content="carouselPeople"
                :current-label="people"
                style="width:100%;text-align:right"
              ></hive-text-carousel>
            </div>
          </div>
        </div>
      </div>
      <div class="col flex-center">
        <arc-slider :controller="slideController" />
      </div>
    </div>
  </f-page>
</template>

<script>
import FPage from "@/fullpageScroll/FPage";
import ArcSlider from "@/slider/ArcSlider";
import homesData from "@/data/TheHomes.json";
import { useSliderController } from "@/slider/sliderController";
import { useWindowSize } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import HiveTextCarousel from "@/utils/HiveTextCarousel";

const data = [];
const carouselTitles = {};
const carouselPeople = {};
const carouselQuotes = {};
homesData.slides.forEach(element => {
  carouselTitles[data.length] = element.title;
  data.push("/images/render/" + element.img + ".jpg");
});
for (const [key, value] of Object.entries(homesData.people)) {
  carouselPeople[key] = "- " + value.name;
  carouselQuotes[key] = '"' + value.quote + '"';
}

export default {
  name: "PageTheHomesSlider",
  components: { HiveTextCarousel, ArcSlider, FPage },
  setup() {
    const slides = [];
    homesData.slides.forEach(element => {
      // carouselTitles[data.length] = element.title;
      slides.push("/images/renders/" + element.img + ".jpg");
    });
    const slideController = useSliderController(slides);
    const currentSlide = slideController.currentSlide;
    const people = ref(homesData.slides[0].who);
    watch(currentSlide, index => {
      const slide = homesData.slides[index];
      console.log(slide);
      // this.title = slide.title;
      people.value = slide.who;
    });

    function beforeLeave() {
      slideController.pause();
    }
    function entered() {
      slideController.play();
    }
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const showLeft = computed(() => {
      const width = windowWidth.value;
      const height = windowHeight.value;
      if (height > width) return false;
      return true;
    });
    return {
      slideController,
      beforeLeave,
      entered,
      showLeft,
      carouselPeople,
      carouselQuotes,
      carouselTitles,
      currentSlide,
      people
    };
  }
};
</script>

<style scoped>
.col {
  flex: 1 1 0;
}
</style>
