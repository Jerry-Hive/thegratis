<template>
  <f-page hash="aerial" @entered="entered" @left="left">
    <hive-map
      :on-stage="state.onStage"
      ref="map"
      class="full-page"
      src="/images/aerial-2k.jpg"
      :staticPins="staticPins"
      :dynamicPins="dynamicPins"
      :dynamicPinsStyle="dynamicPinsStyle"
    ></hive-map>
  </f-page>
</template>
<script>
import HiveMap from "@/map/HiveMap";
import data from "@/data/aerial.json";
import FPage from "@/fullpageScroll/FPage";
import { reactive } from "vue";

const staticPins = [
  Object.assign(data.gratis, {
    labelStyle: { height: "8vh" },
    topLocation: "10vh",
    dotSize: 25
  }),
  Object.assign(data.cbd, {
    labelClasses: ["caslon", "h1"],
    labelStyle: {},
    topLocation: "22vh",
    dotSize: 15
  })
];
console.log(staticPins);
export default {
  name: "page-aerial",
  components: {
    FPage,
    HiveMap
  },
  setup() {
    const state = reactive({
      onStage: false
    });
    function entered() {
      state.onStage = true;
    }
    function left() {
      state.onStage = false;
    }
    return {
      entered,
      left,
      state,
      staticPins,
      dynamicPins: data.pins,
      dynamicPinsStyle: {
        color: "white",
        lineHeight: 100,
        labelClasses: ["caslon", "h2"],
        labelStyle: { textAlign: "center" }
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>>
