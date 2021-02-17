<template>
  <div
    style="position:relative;user-select: none; overflow: hidden"
    ref="root"
  ></div>
</template>

<script>
import HiveFader from "./controllers/HiveFader";
import { onMounted, ref, watch } from "vue";
import { setStyle } from "../utils/domUtils";
export default {
  name: "hive-text-carousel",
  props: {
    /**
     * @type {Object}//{{label:text}}
     */
    content: Object,
    speed: {
      type: Number,
      default: 1000
    },
    currentLabel: [String, Number]
  },
  setup(props) {
    const faders = {};
    const root = ref(null);
    let currentFader;
    onMounted(() => {
      let height = 0;
      for (let label in props.content) {
        const content = props.content[label];
        const div = document.createElement("div");
        div.innerHTML = content;
        root.value.append(div);
        const h = div.clientHeight;
        if (h > height) height = h;
        const fader = new HiveFader(div, {
          xOffset: "10px",
          duration: props.speed
        });
        setStyle(div, {
          position: "absolute",
          top: "0",
          width: "100%",
          opacity: 0
        });
        faders[label] = fader;
      }
      root.value.style.height = height + "px";
      watch(
        () => props.currentLabel,
        label => {
          // console.log(label);
          jumpTo(label);
        },
        { immediate: true }
      );
    });

    function jumpTo(label) {
      // console.log(label);
      // console.log(props.content);
      // console.log(faders);
      const faderIn = faders[label];
      if (!faderIn) {
        console.error("jumpTo unknown label '" + label + "'!");
        return;
      }
      faderIn.in();
      if (currentFader) currentFader.out();
      currentFader = faderIn;
    }

    return {
      root
    };
  }
};
</script>
