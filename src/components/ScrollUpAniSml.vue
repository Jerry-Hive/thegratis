<template>
  <div>
    <animated-arrow
      style="position:absolute;left:50%;margin-top:15px"
      :size="10"
      direction="up"
    />
    <div
      class="poppins uppercase font-small text-center opacity-50"
      style="margin-top:5px"
    >
      Back To Top
    </div>
  </div>
</template>

<script>
import AnimatedArrow from "@/components/AnimatedArrow";
export default {
  name: "ScrollUpAniSml",
  components: { AnimatedArrow }
};
</script>

<style scoped></style>
