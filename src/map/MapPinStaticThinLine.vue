<template>
  <div style="pointer-events: none;user-select: none">
    <div
      ref="dot"
      class="origin-center dot"
      :class="show ? 'scale1' : 'scale0'"
      :style="{
        backgroundColor: color,
        width: dotSize + 'px',
        height: dotSize + 'px',
        left: location.x + 'px',
        top: location.y + 'px'
      }"
    ></div>
    <div
      ref="pop"
      class="pop"
      style="position:absolute;top:0;bottom:0;display: flex;flex-direction: column;"
      :style="{
        color: color,
        height: location.y + 'px',
        left: location.x + 'px'
      }"
    >
      <div
        class="dummy"
        :style="{ height: topLocation }"
        style="flex-grow: 0;"
      ></div>
      <img
        v-if="labelUrl"
        ref="label"
        class="label"
        :class="labelClasses"
        :style="labelStyle"
        :src="labelUrl"
      />
      <div
        v-else
        ref="label"
        class="label"
        :class="labelClasses"
        :style="labelStyle"
        v-html="labelText"
      ></div>
      <div
        ref="line"
        class="thin-line"
        :style="{ borderLeftColor: color }"
      ></div>
    </div>
  </div>
</template>

<script>
import HiveFader from "@/utils/HiveFader";
import { computed, onMounted, ref, watch } from "vue";

export default {
  name: "MapPinStaticThinLine",
  props: {
    labelUrl: { type: String },
    labelText: { type: String },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    color: { type: String, default: "#ffffff" },
    dotSize: { type: Number, default: 20 },
    labelStyle: { type: Object },
    labelClasses: { Array },
    inDelay: { Number, default: 10 },
    scale: { type: Number, default: 1 },
    originX: { type: Number, default: 0 },
    originY: { type: Number, default: 0 },
    topLocation: { String }, //top location in css format
    show: { type: Boolean, default: false }
  },
  setup(props) {
    const pop = ref(null);
    let popFader;
    onMounted(() => {
      popFader = new HiveFader(pop.value, {
        yOffset: props.dotSize / 2 + "px"
      });
      watch(
        () => props.show,
        show => {
          if (show) popFader.in();
          else {
            popFader.out();
          }
        },
        { immediate: true }
      );
    });
    const location = computed(() => {
      // console.log(props.x, props.scale, props.originX, props.originY);
      // console.log(
      //   props.x * props.scale - props.originX,
      //   props.y * props.scale - props.originY
      // );
      return {
        x: props.x * props.scale - props.originX,
        y: props.y * props.scale - props.originY
      };
    });
    return {
      pop,
      location
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  position: absolute;
  transform: translateX(-50%);
  border: 1px solid blue;
}

.origin-center {
  transform: translate(-50%, -50%);
}
.dot {
  position: absolute;
  border-radius: 50%;
  left: 0;
  transition: transform 0.8s ease-in-out, opacity 1s ease-in;
}
.scale0 {
  transform: translate(-50%, -50%) scale(2, 2);
  opacity: 0;
}
.scale1 {
  transform: translate(-50%, -50%) scale(1, 1);
  opacity: 1;
}
.thin-line {
  border-left-width: 1px;
  border-left-style: solid;
  width: 1px;
  left: 0;
  flex-grow: 1;
  transform: translateX(-50%);
  transition: all 0.8s ease-in-out;
}
.label {
  flex-grow: 0;
  transform: translateX(-50%);
  white-space: nowrap;
  user-select: none;
}
.dummy {
  flex-grow: 0;
}
</style>
