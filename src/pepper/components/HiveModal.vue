<template>
  <transition-fade>
    <div
      v-if="modelValue"
      class="z-modal"
      style="width:100vw;height:100vh;position: fixed;top:0;left: 0;margin:0"
      :style="{
        'background-color': color
      }"
    >
      <slot />
    </div>
  </transition-fade>
</template>

<script>
import { onUnmounted, watch } from "vue";
import TransitionFade from "@/pepper/animation/TransitonFade";

export default {
  name: "HiveModal",
  components: { TransitionFade },
  emits: ["update:modelValue"],
  props: {
    color: { type: String, default: "rgba(0,0,0,0.9)" },
    keyEvent: Boolean,
    modelValue: Boolean
  },
  setup(props, ctx) {
    let lastScrollY;
    const keyPress = e => {
      if (e.key === "Escape") {
        ctx.emit("update:modelValue", false);
      }
    };
    const showMod = () => {
      // console.log("model show");
      if (props.keyEvent) document.addEventListener("keyup", keyPress);
      lastScrollY = window.scrollY;
      const body = document.body;
      body.style.position = "fixed";
      body.style.top = `-${lastScrollY}`;
    };
    const hideMod = () => {
      // console.log("model hide");
      if (props.keyEvent) document.removeEventListener("keyup", keyPress);
      const body = document.body;
      body.style.position = "";
      body.style.top = "";
      window.scrollTo(0, lastScrollY);
    };
    watch(
      () => props.modelValue,
      show => {
        if (show) {
          showMod();
        } else {
          hideMod();
        }
      }
    );
    // onMounted(() => {
    //
    // });
    onUnmounted(() => {
      hideMod();
    });
  }
};
</script>

<style lang="scss" scoped>
@use "../pepper";
</style>
