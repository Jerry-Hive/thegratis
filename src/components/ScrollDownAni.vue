<template>
  <div>
    <div
      class="poppins uppercase font-small text-center comfort-margin-bottom opacity-50"
      style="top:63vh"
    >
      Scroll<br />
      to<br />
      explore more
    </div>
    <div class="outline">
      <div class="dot"></div>
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
  name: "ScrollDownAni",
  components: { AnimatedArrow }
};
</script>

<style scoped>
.outline {
  max-width: 2vh;
  max-height: 4vh;
  width: 25px;
  height: 50px;
  border-radius: 1.1vh;
  border: 2px solid black;
  opacity: 0.3;
  margin: auto;
}
.dot {
  background: black;
  height: 15%;
  margin: 40%;
  border-radius: 3px;
}
</style>
