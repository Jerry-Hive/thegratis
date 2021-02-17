<template>
  <f-page-overlay class="flex-center">
    <img
      src="@/assets/register.png"
      class="absolute hand enable-events"
      style="width:8vh;height:8vh"
      :id="regId"
    />
  </f-page-overlay>
</template>

<script>
import FPageOverlay from "@/fullpageScroll/FPageOverlay";
import { useCurrentPage } from "@/fullpageScroll/fullPage";
import { onMounted, watch } from "vue";
import gsap from "gsap";
import { IDs } from "@/utils/global";

export default {
  name: "PageOverlay",
  components: { FPageOverlay },
  setup() {
    const currentPage = useCurrentPage();
    const regId = IDs.registerBtn;
    const registerTopState = {
      top: "-1.5vh",
      opacity: 1
    };
    onMounted(() => {
      if (currentPage.value !== 0) {
        gsap.set("#" + regId, registerTopState);
      }
    });
    watch(currentPage, v => {
      if (v > 0) {
        gsap.to("#" + regId, registerTopState);
      }
    });
    return {
      regId
    };
  }
};
</script>

<style scoped></style>
