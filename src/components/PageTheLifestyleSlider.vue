<template>
  <page-arc-slider
    hash="the-lifestyle"
    :slides="slides"
    :texts="texts"
    :folder="folder"
    :logo="logo"
    reverse
  />
</template>

<script>
import data from "@/data/TheLocation.json";
import PageArcSlider from "@/components/PageArcSlider";
import theLifestyle from "@/assets/the-lifestyle.png";

// const data = [];
// const carouselTitles = {};
// const carouselPeople = {};
// const carouselQuotes = {};
const texts = {};
// homesData.slides.forEach(element => {
//   // carouselTitles[data.length] = element.title;
//   data.push("/images/render/" + element.img + ".jpg");
// });
for (const [key, value] of Object.entries(data.locations)) {
  texts[key] = value;
}

export default {
  name: "PageTheLifestyleSlider",
  components: { PageArcSlider },
  setup() {
    console.log(texts);
    return {
      slides: data.slides,
      texts,
      folder: data.imageRoot,
      logo: theLifestyle
    };
  }
};
</script>

<style scoped></style>
