<template>
  <f-page
    :hash="hash"
    @before-leave="beforeLeave"
    @entered="entered"
    class="bg-peach"
  >
    <div
      class="full-size text-navy"
      style="display:flex;"
      :style="{ 'flex-direction': reverse ? 'row-reverse' : 'row' }"
    >
      <div class="col flex-center" v-if="showText">
        <div style="width:80%">
          <img src="@/assets/the-homes.png" style="height:7vh;" />
          <br />
          <br />
          <hive-text-carousel
            class="caslon h1"
            :content="titles"
            :current-label="currentSlide"
            style="width:100%;"
          ></hive-text-carousel>
          <br /><br />
          <div class="caslon h2 italic" style="height:20vh">
            <div class="quote">
              <hive-text-carousel
                ref="titleCar"
                class="caslon h1"
                :content="texts"
                :current-label="currentLabel"
                style="width:100%;"
              ></hive-text-carousel>
            </div>
          </div>
        </div>
      </div>
      <div class="col flex-center">
        <arc-slider />
      </div>
    </div>
  </f-page>
</template>

<script>
import FPage from "@/fullpageScroll/FPage";
import HiveTextCarousel from "@/pepper/components/HiveTextCarousel";
import { createPhotoSliderStore } from "@/pepper/components/stores/hivePhotoSliderStore";
import ArcSlider from "./ArcSlider";
import { useWindowSize } from "@vueuse/core";
import { computed, provide, ref, watch } from "vue";
export default {
  name: "PageArcSlider",
  props: {
    /**
     * [{img:String,title:String,label:String}]
     */
    slides: { type: Array, required: true },
    folder: String,
    texts: Object,
    hash: String,
    reverse: Boolean
  },
  components: { ArcSlider, HiveTextCarousel, FPage },
  setup(props) {
    const photos = [];
    const titles = [];
    const currentLabel = ref(props.slides[0].label);
    for (let i = 0; i < props.slides.length; i++) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      const slide = props.slides[i];
      photos[i] = props.folder + "/" + slide.img;
      titles[i] = slide.title;
    }
    const store = createPhotoSliderStore({
      photos,
      cover: true
    });
    provide("hive-photo-slider-controller", store);
    watch(
      () => store.state.cursor,
      index => {
        const slide = props.slides[index];
        // console.log(slide);
        // this.title = slide.title;
        currentLabel.value = slide.label;
      }
    );
    function beforeLeave() {
      store.pause();
    }
    function entered() {
      store.play();
    }
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const showText = computed(() => {
      const width = windowWidth.value;
      const height = windowHeight.value;
      if (height > width) return false;
      return true;
    });
    return {
      beforeLeave,
      entered,
      showText,
      titles,
      currentLabel,
      currentSlide: computed(() => store.state.cursor)
    };
  }
};
</script>

<style scoped>
.col {
  flex: 1 1 0;
}
</style>
