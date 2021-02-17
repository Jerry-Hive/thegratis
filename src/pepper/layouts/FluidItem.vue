<template>
  <div
    class="fluid-item-container"
    :class="className"
    :style="{ padding: padding, 'min-width': min, 'max-width': max }"
  >
    <slot />
  </div>
</template>

<script>
import { inject, ref } from "vue";

export default {
  name: "FluidItem",
  props: {
    max: String,
    min: String,

    xxs: Boolean,
    xs: Boolean,
    sm: Boolean,
    md: Boolean,
    fhd: Boolean
  },
  setup(props) {
    const className = ref("");
    const padding = inject("fluid-padding");
    if (props.xxs) {
      className.value = "xxs";
    } else if (props.sm) {
      className.value = "sm";
    } else if (props.md) {
      className.value = "md";
    } else if (props.fhd) {
      className.value = "fhd";
    }
    return { className, padding };
  }
};
</script>

<style scoped>
.fluid-item-container {
  flex: 1 1 0;
  box-sizing: border-box;
}
/*iPhone 5 320px*/
@media screen and (max-width: 315px) {
  .xxs {
    min-width: 100% !important;
    max-width: 100% !important;
  }
}
/*iPhone 6 370*/
@media screen and (max-width: 365px) {
  .xs {
    min-width: 100% !important;
    max-width: 100% !important;
  }
}
/*iPhone plus 415px*/
@media screen and (max-width: 410px) {
  .sm {
    min-width: 100% !important;
    max-width: 100% !important;
  }
}
/*iPad 768px*/
@media screen and (max-width: 765px) {
  .md {
    min-width: 100% !important;
    max-width: 100% !important;
  }
}

@media screen and (max-width: 1070px) {
  .fhd {
    min-width: 100% !important;
    max-width: 100% !important;
  }
}
@media screen and (max-width: 1590px) {
  .fluid-item-full-lg {
    min-width: 100% !important;
    max-width: 100% !important;
  }
}
@media screen and (max-width: 3800px) {
  .fluid-item-full-4k {
    min-width: 100% !important;
    max-width: 100% !important;
  }
}
</style>
