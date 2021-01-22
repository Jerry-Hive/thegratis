<template>
  <full-page-scroller>
    <cover-page />
    <full-page page-id="test1">test1</full-page>
    <full-page page-id="test2">test2</full-page>
    <full-page page-id="test3">test3</full-page>
  </full-page-scroller>
</template>

<script>
import FullPage from "@/fullpageScroll/fullPage";
import FullPageScroller from "@/fullpageScroll/fullPageScroller";
import CoverPage from "@/components/CoverPage";
export default {
  name: "App",
  components: {
    CoverPage,
    FullPageScroller,
    FullPage
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
