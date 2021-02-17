<template>
  <hive-modal v-model="model" :color="bgColor" :key-event="keyEvent">
    <icon-close
      circle
      :size="35"
      class="z-top fixed top-4 right-4 text-white clickable"
      @click="model = false"
    />
    <hive-photo-slider-basic
      style="position: fixed;top:0;left:0;width:100%;height:100%"
      :base-url="baseUrl"
      :slides="slides"
      :auto-play="autoPlay"
      :cover="cover"
      :key-event="keyEvent"
    />
  </hive-modal>
</template>

<script>
import HiveModal from "@/pepper/components/HiveModal";
import HivePhotoSliderBasic from "@/pepper/components/HivePhotoSliderBasic";
import IconClose from "@/pepper/icons/IconClose";
import { useVModel } from "@vueuse/core";
export default {
  name: "HivePhotoSliderFullScreen",
  components: { IconClose, HivePhotoSliderBasic, HiveModal },
  props: {
    bgColor: { type: String },
    baseUrl: { type: String, default: "" },
    slides: { type: Array, required: true },
    autoPlay: Boolean,
    keyEvent: Boolean,
    cover: Boolean,
    modelValue: Boolean
  },
  setup(props, { emit }) {
    const model = useVModel(props, "modelValue", emit);
    return { model };
  }
};
</script>

<style scoped></style>
