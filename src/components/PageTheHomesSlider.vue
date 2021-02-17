<template>
  <page-arc-slider
    hash="the-homes"
    :slides="slides"
    :texts="texts"
    :folder="folder"
  />
</template>

<script>
import homesData from "@/data/TheHomes.json";
import PageArcSlider from "@/components/PageArcSlider";

// const data = [];
// const carouselTitles = {};
// const carouselPeople = {};
// const carouselQuotes = {};
const texts = {};
// homesData.slides.forEach(element => {
//   // carouselTitles[data.length] = element.title;
//   data.push("/images/render/" + element.img + ".jpg");
// });
for (const [key, value] of Object.entries(homesData.people)) {
  texts[key] =
    value.quote + `<div style="text-align: right"><br/>-${value.name}</div>`;
  // carouselPeople[key] = "- " + value.name;
  // carouselQuotes[key] = '"' + value.quote + '"';
}

export default {
  name: "PageTheHomesSlider",
  components: { PageArcSlider },
  setup() {
    console.log(texts);
    return {
      slides: homesData.slides,
      texts,
      folder: homesData.imageRoot
    };
  }
};
</script>

<style scoped></style>
