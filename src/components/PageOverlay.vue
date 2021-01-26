<template>
  <f-page-overlay class="flex-center">
    <img
      src="@/assets/register.png"
      class="absolute hand receive-events"
      style="width:8vh;height:8vh"
      id="global-register"
    />
  </f-page-overlay>
</template>

<script>
import FPageOverlay from "@/fullpageScroll/FPageOverlay";
import { useCurrentPage } from "@/fullpageScroll/fullPage";
import { onMounted, watch } from "vue";
import gsap from "gsap";
export default {
  name: "PageOverlay",
  components: { FPageOverlay },
  setup() {
    const currentPage = useCurrentPage();
    const refs = {
      register: "#global-register"
    };
    const registerTopState = {
      top: "-1.5vh",
      opacity: 1
    };
    onMounted(() => {
      if (currentPage.value !== 0) {
        gsap.set(refs.register, registerTopState);
      }
    });
    watch(currentPage, v => {
      if (v > 0) {
        gsap.to(refs.register, registerTopState);
      }
    });
  }
};
</script>

<style scoped></style>
