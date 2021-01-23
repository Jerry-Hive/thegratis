import { getCurrentInstance, onMounted, reactive } from "vue";
import gsap from "gsap";

function setStyle(element, obj) {
  for (const [key, value] of Object.entries(obj)) {
    element.style[key] = value;
  }
}

export const pages = [];
const pageMap = {};
const state = reactive({
  currentPage: 0
});
let dummy;
let scrolling = false;
let scrollY = 0;
export function init() {
  if (!dummy) {
    dummy = document.createElement("div");
    // style = 'visibility: hidden'
    dummy.innerHTML = "<div>Invisible</div>";
    document.body.appendChild(dummy);
  }

  onMounted(() => {
    setStyle(dummy, {
      height: pages.length * 100 + "vh",
      top: "0",
      position: "absolute"
    });
    const firstPage = pageMap[pages[0]].container;
    setStyle(firstPage, { display: "block" });
    window.addEventListener("scroll", e => {
      if (scrolling) {
        e.preventDefault();
        return false;
      }
      const y = window.scrollY;
      console.log("scrollY", scrollY, y);
      const diff = y - scrollY;
      const vh = window.innerHeight;
      if (Math.abs(diff) < 6) {
        return;
      }
      console.log("diff", diff);
      let step = Math.round(diff / vh);
      console.log("step", step);
      if (Math.abs(step) < 1) {
        step = diff > 0 ? 1 : -1;
      }
      move(step);
      scrollY = y;
    });
    window.addEventListener("resize", () => {
      adjustDummy();
    });
  });
}
function move(step) {
  console.log("move", step);
  const from = state.currentPage;
  state.currentPage += step;
  const to = state.currentPage;
  const fromId = pages[from];
  const toId = pages[to];
  console.log(to);
  const fromContainer = pageMap[fromId].container;
  const toContainer = pageMap[toId].container;
  const fromTop = step > 0 ? "-100vh" : "100vh";
  const toTop = step > 0 ? "100vh" : "-100vh";
  gsap.set(toContainer, {
    top: toTop,
    display: "block"
  });
  gsap.to(fromContainer, {
    top: fromTop
  });
  gsap.to(toContainer, {
    top: 0,
    onComplete() {
      adjustDummy();
    }
  });
  scrolling = true;
}
function adjustDummy() {
  scrolling = true;
  const vh = window.innerHeight;
  const to = state.currentPage * vh;
  // Hivue.log("to " + to);
  window.scrollTo(0, to);
  scrollY = to;
  setTimeout(() => {
    scrolling = false;
  }, 100);
}

export function getCurrentPage() {
  return state.currentPage;
}
export function registerPage() {
  const instance = getCurrentInstance();
  const uid = instance.uid;
  pages.push(uid);
  console.log("page registered", uid);
  pageMap[uid] = {
    instance: instance
  };
  onMounted(() => {
    console.log("mounted");
    const container = instance.refs.container;
    pageMap[uid].container = container;
    setStyle(container, { position: "absolute", left: "0", display: "none" });
    console.log(instance);
    instance.emit("enter");
  });
}
// function moveUp(step) {
//   console.log("step", step);
//   state.currentPage += step;
//   const page = state.currentPage;
//   const pageId = pages[page];
//   const container = pageMap[pageId].container;
//
//   console.log("container", container);
//   console.log(page);
//   console.log(state);
//   scrolling = true;
//   gsap.set(container, { top: "100vh", display: "block" });
//   gsap.to(container, {
//     top: "0px"
//   });
// }
// export function onFullPageEnter(fn) {
//   const instance = getCurrentInstance();
//   console.log("onFullPageEnter");
//   console.log(instance);
//   onBeforeMount(() => {
//     console.log("onBeforeMount");
//     console.log("parent", instance.parent.uid);
//     console.log(pageMap);
//   });
//   onMounted(() => {
//     console.log("page mounted");
//     console.log("parent", instance.parent.uid);
//     console.log(pageMap);
//   });
//   setTimeout(() => {
//     console.log("timeout");
//   }, 0);
//   fn;
// }
