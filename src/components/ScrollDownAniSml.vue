<template>
  <div>
    <div class="poppins uppercase font-small text-center opacity-50">
      Scroll
    </div>

    <animated-arrow
      style="position:absolute;left:50%;margin-top:1vh"
      :size="10"
      direction="down"
    />
  </div>
</template>

<script>
import AnimatedArrow from "@/components/AnimatedArrow";
export default {
  name: "ScrollDownAniSml",
  components: { AnimatedArrow }
};
</script>

<style scoped></style>
