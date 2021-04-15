<template>
  <f-page-overlay class="flex-center">
    <img
      src="@/assets/register.png"
      class="absolute hand enable-events"
      style="width:8vh;height:8vh;top:-1.5vh"
      :id="regId"
    />
  </f-page-overlay>
</template>

<script>
import FPageOverlay from "@/fullpageScroll/FPageOverlay";
import { useCurrentPage } from "@/fullpageScroll/fullPage";
import { watch } from "vue";
import gsap from "gsap";
import { IDs } from "@/utils/global";

export default {
  name: "PageOverlay",
  components: { FPageOverlay },
  setup() {
    const currentPage = useCurrentPage();
    const regId = IDs.registerBtn;
    // const registerTopState = {
    //   top: "-1.5vh",
    //   opacity: 1
    // };
    // onMounted(() => {
    //   console.log("mounted currentPage", currentPage.value);
    //   if (currentPage.value !== 0) {
    //     console.log("setting reg 1.5");
    //     gsap.set("#" + regId, registerTopState);
    //   }
    // });
    watch(currentPage, v => {
      console.log("cPage changed", v);
      if (v > 0) {
        console.log("move reg to top");
        gsap.to("#" + regId, { top: "-1.5vh", opacity: 0.7 });
      }
    });
    return {
      regId
    };
  }
};
</script>

<style scoped></style>
