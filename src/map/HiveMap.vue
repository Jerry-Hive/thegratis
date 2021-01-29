<template>
  <div ref="container" class="container" @click="handleClick">
    <div style="position:absolute" class="origin full-page" id="pin-container">
      <map-pin-thin-line
        class="pin dynamic"
        v-for="(pin, index) in dynamicPins"
        :key="pin.x"
        :x="pin.x"
        :y="pin.y"
        :scale="mapState.scale"
        :origin-x="mapState.originX"
        :origin-y="mapState.originY"
        :inDelay="index * 100 + 500"
        :label="pin.label"
        :color="dynamicPinsStyle.color"
        :lineHeight="dynamicPinsStyle.lineHeight"
        :labelClasses="dynamicPinsStyle.labelClasses"
        :labelStyle="dynamicPinsStyle.labelStyle"
        :dotSize="dynamicPinsStyle.dotSize"
        :show="showPins"
      ></map-pin-thin-line>
      <!--      <hive-map-pin-static-->
      <!--        class="pin"-->
      <!--        v-for="(pin, index) in staticPins"-->
      <!--        :inDelay="index * 500 + 10"-->
      <!--        :key="pin.x"-->
      <!--        :x="pin.x"-->
      <!--        :y="pin.y"-->
      <!--        :labelUrl="pin.labelUrl"-->
      <!--        :labelText="pin.labelText"-->
      <!--        :labelStyle="pin.labelStyle"-->
      <!--        :labelClasses="pin.labelClasses"-->
      <!--        :topLocation="pin.topLocation"-->
      <!--        :color="pin.color"-->
      <!--        :dotSize="pin.dotSize"-->
      <!--      ></hive-map-pin-static>-->
    </div>
    <div ref="viewport" class="viewport">
      <img ref="image" :src="src" @load="imageLoad" alt="" />
    </div>
  </div>
</template>
<script>
import { computed, onUnmounted, reactive, ref, watch } from "vue";
import MapPinThinLine from "@/map/MapPinThinLine";
import { getComputedStyle } from "@/utils/domUtils";
import { useElementSize } from "@vueuse/core";

export default {
  name: "hive-map",
  props: {
    src: { type: String, required: true },
    staticPins: { type: Array },
    dynamicPins: { type: Array },
    dynamicPinsStyle: { Object, required: true },
    onStage: { type: Boolean, default: false }
  },
  components: {
    MapPinThinLine
  },
  setup(props) {
    const viewport = ref(null);
    const container = ref(null);
    const image = ref(null);

    let originalWidth, originalHeight;
    const mapState = reactive({
      scale: 0,
      originX: 0,
      originY: 0,
      loaded: false
    });
    const showPins = computed(() => {
      console.log(mapState.loaded && props.onStage);
      return mapState.loaded && props.onStage;
    });
    function imageLoad() {
      console.log("imageLoaded");
      mapState.loaded = true;
      // window.addEventListener("resize", fitImage);
    }
    onUnmounted(() => {
      // window.removeEventListener("resize", fitImage);
    });
    const { width, height } = useElementSize(container);
    watch(
      [width, height],
      () => {
        console.log(width.value, height.value);
        if (!width.value) return;
        if (!originalWidth) {
          originalWidth = image.value.offsetWidth;
          originalHeight = image.value.offsetHeight;
        }
        fitImage();
      },
      { immediate: true }
    );
    function fitImage() {
      console.log(getComputedStyle(image.value, "display"));
      console.log(width, height);
      const containerWidth = container.value.offsetWidth;
      const containerHeight = container.value.offsetHeight;

      const scale_h = containerWidth / originalWidth;
      const scale_v = containerHeight / originalHeight;
      const scale = (mapState.scale = scale_h > scale_v ? scale_h : scale_v);

      let w = scale * originalWidth;
      let h = scale * originalHeight;
      console.log("fitImage", w, h);
      const style = image.value.style;
      style.width = w + "px";
      style.height = h + "px";

      mapState.originX = (w - containerWidth) / 2;
      mapState.originY = h - containerHeight;

      viewport.value.scrollLeft = mapState.originX;
      viewport.value.scrollTop = mapState.originY;
    }
    function handleClick(e) {
      console.log(
        (e.clientX + this.originX) / this.scale,
        (e.clientY + this.originY) / this.scale
      );
    }
    return {
      image,
      viewport,
      container,
      mapState,
      handleClick,
      imageLoad,
      showPins
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*:before,
*:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
}

.viewport {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}
img {
  display: block;
}

.container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>
