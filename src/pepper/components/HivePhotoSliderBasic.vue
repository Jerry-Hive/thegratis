<template>
  <div style="position:relative">
    <hive-photo-slider-headless
      ref="sliderHeadless"
      id="slide-container"
      style="width:100%;height:100%"
      @slide="slide"
    ></hive-photo-slider-headless>
    <div
      class="absolute top-0 left-0 w-full h-full flex items-center pointer-events-none"
      v-if="slides.length > 1"
    >
      <div class="w-full text-white flex">
        <icon-chevron
          left
          class="svg-shadow flex-none cursor-pointer pointer-events-auto"
          :size="40"
          @click="prev"
        />
        <div class="flex-grow" />
        <icon-chevron
          right
          :size="40"
          class="svg-shadow flex-none cursor-pointer pointer-events-auto"
          @click="next"
        />
      </div>
    </div>
    <div
      class="absolute top-0 left-0 w-full h-full flex justify-center items-end p-2 pointer-events-none"
      v-if="slides.length > 1"
    >
      <div
        class="dot"
        v-for="slide in totalSlides"
        :key="'slide-' + slide"
        :class="{ dotActive: slide === cursor + 1 }"
        @click="goto(slide - 1)"
      ></div>
    </div>
    <!--    The Overlay Container-->
    <div class="absolute w-full h-full left-0 top-0 pointer-events-none">
      <slot />
    </div>
  </div>
</template>

<script>
import HivePhotoSliderHeadless from "@/pepper/components/HivePhotoSliderHeadless";
import { computed, onMounted, onUnmounted } from "vue";
import {
  createPhotoSliderStore,
  providePhotoSliderStore
} from "@/pepper/components/stores/hivePhotoSliderStore";
import IconChevron from "@/pepper/icons/IconChevron";

export default {
  name: "HivePhotoSliderBasic",
  components: { IconChevron, HivePhotoSliderHeadless },
  emits: ["slide"],
  props: {
    baseUrl: { type: String, default: "" },
    slides: { type: Array, required: true },
    autoPlay: Boolean,
    keyEvent: Boolean,
    cover: Boolean
  },
  setup(props, { emit }) {
    const slidesArr = [];

    for (let i = 0; i < props.slides.length; i++) {
      slidesArr[i] = props.baseUrl + (props.slides[i].src || props.slides[i]);
    }
    const store = createPhotoSliderStore({
      photos: slidesArr,
      cover: props.cover,
      keyEvent: props.keyEvent
    });
    providePhotoSliderStore(store);
    onMounted(() => {
      if (props.autoPlay) store.play();
    });
    onUnmounted(() => {
      store.pause();
    });

    const { prev, next, goto } = store;
    return {
      totalSlides: computed(() => store.photos.length),
      prev,
      next,
      cursor: computed(() => store.state.cursor),
      goto,
      slide(index) {
        emit("slide", index);
      }
    };
  }
};
</script>

<style scoped>
.svg-shadow {
  -webkit-filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5));
  /* Similar syntax to box-shadow */
}
.dot {
  transition: background-color 500ms ease-out, border-color 500ms ease-out;
  background-color: white;
  border: 1px solid black;
  border-radius: 50%;
  display: inline-block;
  opacity: 0.7;
  margin-left: 0.125rem;
  margin-right: 0.125rem;
  cursor: pointer;
  pointer-events: auto;
  height: 12px;
  width: 12px;
}
.dotActive {
  border-color: white;
  background-color: black;
}
</style>
