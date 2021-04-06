<template>
  <div
    ref="container"
    id="container"
    :style="{ top: location.y + 'px', left: location.x + 'px' }"
    style="user-select: none"
  >
    <div
      class="dummy-mouse-receiver"
      :style="{ width: dotSize * 1.2 + 'px', height: dotSize * 1.2 + 'px' }"
      @click="handleClick"
      @mouseover="handleMouseOver"
      @mouseout="handleMouseOut"
    >
      x
    </div>
    <div
      ref="dot"
      class="dot"
      :class="show ? 'scale1' : 'scale0'"
      :style="{
        backgroundColor: color,
        width: dotSize + 'px',
        height: dotSize + 'px'
      }"
    ></div>
    <div ref="pop" style="position:absolute;left:0;top:0">
      <div
        class="thin-line"
        :style="{ height: lineHeight + 'px', borderLeftColor: color }"
      ></div>
      <div
        class="label"
        :class="labelClasses"
        :style="[{ color: color, top: -lineHeight - 10 + 'px' }, labelStyle]"
        v-html="label"
      ></div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import HiveFader from "@/pepper/utils/HiveFader";
export default {
  name: "MapPinThinLine",
  props: {
    lineHeight: { type: Number, required: true },
    label: { type: String, required: true },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    color: { type: String, default: "#ffffff" },
    dotSize: { type: Number, default: 10 },
    labelStyle: { type: Object },
    labelClasses: Array,
    inDelay: { type: Number, default: 10 },
    scale: { type: Number, default: 1 },
    originX: { type: Number, default: 0 },
    originY: { type: Number, default: 0 },
    show: { type: Boolean, default: false }
  },
  setup(props) {
    const pop = ref(null);
    const container = ref(null);
    let faderTimerId;
    function handleClick() {
      clearTimeout(faderTimerId);
      popFader.in(true);
      faderTimerId = setTimeout(() => popFader.out(true), 2000);
    }
    function handleMouseOver() {
      clearTimeout(faderTimerId);
      popFader.in(true);
    }
    function handleMouseOut() {
      popFader.out(true);
    }
    let popFader, dotFader;
    onMounted(() => {
      popFader = new HiveFader(pop.value, {
        yOffset: props.dotSize / 2 + "px"
      });
      dotFader = new HiveFader(container.value, {
        inDelay: props.inDelay
      });
      watch(
        () => props.show,
        show => {
          if (show) dotFader.in();
          else {
            dotFader.out();
          }
        },
        { immediate: true }
      );
    });
    const location = computed(() => {
      return {
        x: props.x * props.scale - props.originX,
        y: props.y * props.scale - props.originY
      };
    });
    return {
      pop,
      container,
      handleClick,
      handleMouseOut,
      handleMouseOver,
      location
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  position: absolute;
  /* border: 1px solid red; */
}
.dummy-mouse-receiver {
  opacity: 0;
  position: absolute;
  z-index: 9999999;
  left: 0;
  right: 0;
  cursor: pointer;
  border: 1px solid red;
  transform: translate(-50%, -50%);
  user-select: none;
}
.dot {
  transform: translate(-50%, -50%);
  border-radius: 50%;
  top: 0;
  left: 0;
  transition: all 0.8s ease-in-out;
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
  left: 0px;
  position: absolute;
  bottom: 0px;
}
.label {
  position: absolute;
  transform: translate(-50%, -100%);
  left: 0px;
  white-space: nowrap;
  user-select: none;
}
</style>
