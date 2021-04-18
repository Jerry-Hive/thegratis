<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    :css="false"
    mode="out-in"
  >
    <slot />
  </transition>
</template>

<script>
import gsap from "gsap";
import { watchEffect } from "vue";
export default {
  name: "TransitionFade",
  props: {
    slow: Boolean,
    slower: Boolean,
    fast: Boolean,
    faster: Boolean,
    yPercent: {
      type: Number,
      default: 0
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    let duration = 1;
    let durationLeave = 0.5;
    watchEffect(() => {
      if (props.slow) duration = 1.5;
      else if (props.slower) {
        duration = 2;
        durationLeave = 1;
      } else if (props.fast) {
        duration = 0.5;
        durationLeave = 0.3;
      } else if (props.faster) {
        duration = 0.3;
        durationLeave = 0.2;
      }
    });
    return {
      beforeEnter(el) {
        gsap.set(el, {
          opacity: 0,
          yPercent: props.yPercent
        });
      },
      enter(el, done) {
        gsap.to(el, {
          duration: duration,
          opacity: 1,
          ease: "circ.out",
          onComplete: done,
          yPercent: 0,
          delay: props.delay
        });
      },
      leave(el, done) {
        gsap.to(el, {
          duration: durationLeave,
          delay: 0.1, //add delay to improve smoothness
          opacity: 0,
          yPercent: props.yPercent,
          ease: "circ.out",
          onComplete: done
        });
      }
    };
  }
};
</script>
