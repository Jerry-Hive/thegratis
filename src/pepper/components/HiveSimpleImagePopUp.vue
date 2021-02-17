<template>
  <hive-modal v-model="model" :color="bgColor" key-event @click="model = false">
    <icon-close
      circle
      :size="35"
      class="z-top fixed top-4 right-4 text-white clickable"
      @click="model = false"
    />
    <img
      ref="img"
      :src="src"
      :style="{ 'object-fit': fit }"
      @click="imgClick"
      style="user-select: none;width:100%;height:100%"
    />
  </hive-modal>
</template>

<script>
import { useVModel } from "@vueuse/core";
// import { watch, watchEffect } from "vue";
import HiveModal from "@/pepper/components/HiveModal";
import IconClose from "@/pepper/icons/IconClose";

export default {
  name: "HiveSimpleImagePopUp",
  components: { IconClose, HiveModal },
  props: {
    src: String,
    bgColor: {
      type: String,
      default: "black"
    },
    modelValue: Boolean,
    /**
     *https://www.w3schools.com/css/css3_object-fit.asp
     */
    fit: {
      type: String,
      default: "contain"
    }
  },
  setup(props, { emit }) {
    const model = useVModel(props, "modelValue", emit);
    // const img = templateRef("img");
    // const { width, height } = useWindowSize();
    // function adjustImage() {
    //   const image = img.value;
    //   if (!image) return;
    //   const nw = image.naturalWidth;
    //   const nh = image.naturalHeight;
    //   console.log(nw, nh, width, height);
    // }
    // watchEffect(adjustImage);
    // watch([() => props.modelValue, () => props.src], () => {
    //   adjustImage();
    // });
    return {
      model,
      imgClick(e) {
        console.log("imgclick", e);
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };
  }
};
</script>

<style scoped></style>
