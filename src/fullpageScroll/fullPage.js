import {
  getCurrentInstance,
  onMounted,
  reactive,
  onUnmounted,
  computed,
  watch
} from "vue";
import gsap from "gsap";
import { pauseAllVideos, playAllVideos } from "@/pepper/utils/domUtils";
import { removeHash } from "@/pepper/utils/routerUtils";
import { fadeToInvisible } from "@/pepper/animation/utils";

function setStyle(element, obj) {
  for (const [key, value] of Object.entries(obj)) {
    element.style[key] = value;
  }
}

/**
 * Array of vue instance uid
 * @type {number[]}
 */
export const pages = [];
const pageMap = {};
const hashMap = {};
const state = reactive({
  currentPage: 0,
  hash: undefined,
  enteringPage: null
});
let dummy;
let scrolling = false;
let scrollY = 0;
let movingOutContainer;
let movingInContainer;
export function useCurrentPage() {
  return computed(() => state.currentPage);
}

export function getCurrentPage() {
  return state.currentPage;
}
export function getTotalPages() {
  return pages.length;
}

export function getEnteringPage() {
  return state.enteringPage;
}

function updateCurrentPageByHash() {
  for (let i = 0; i < pages.length; i++) {
    const uid = pages[i];
    if (pageMap[uid].hash === state.hash) {
      state.currentPage = i;
      break;
    }
  }
}

export function init() {
  if (!dummy) {
    dummy = document.createElement("div");
    // style = 'visibility: hidden'
    dummy.innerHTML = "<div>Invisible</div>";
    document.body.appendChild(dummy);
  }

  onMounted(() => {
    console.log("fullpage mounted");
    setStyle(dummy, {
      height: pages.length * 100 + "vh",
      top: "0",
      position: "absolute",
      "z-index": -1
    });
    handleHashChange();
    // console.log(state.currentPage);
    const uid = pages[state.currentPage];
    state.enteringPage = state.currentPage;
    const firstContainer = pageMap[uid].container;
    // console.log(firstContainer);
    const firstPageInstance = pageMap[uid].instance;
    playAllVideos(firstContainer);
    gsap.set(firstContainer, { display: "flex", top: 0 });
    adjustDummy();
    firstPageInstance.emit("before-enter");
    firstPageInstance.emit("entered");
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", adjustDummy);
    window.addEventListener("hashchange", handleHashChange, false);
    watch(
      () => state.currentPage,
      (to, from) => {
        console.log("move page from " + from + " to: " + to);
        move(from, to);
      }
    );
    console.log(pages);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", adjustDummy);
    window.removeEventListener("hashchange", handleHashChange, false);
  });
}
function handleScroll(e) {
  if (scrolling) {
    e.preventDefault();
    return false;
  }
  // console.log("scrolling");
  const y = window.scrollY;
  // console.log("scrollY", scrollY, y);
  const diff = y - scrollY;
  const vh = window.innerHeight;
  if (Math.abs(diff) < 6) {
    return;
  }
  // console.log("diff", diff);
  let step = Math.round(diff / vh);
  // console.log("step", step);
  if (Math.abs(step) < 1) {
    step = diff > 0 ? 1 : -1;
  }
  state.currentPage += step;
  scrollY = y;
}
function handleHashChange() {
  const hash = location.hash;
  if (hash && hash.length) {
    console.log("got hash: ", hash);
    state.hash = hash.substr(1);
    updateCurrentPageByHash();
  }
}
console.log(location.hash);
export function nextPage() {
  state.currentPage++;
}
export function prevPage() {
  state.currentPage--;
}
export function firstPage() {
  move(-state.currentPage);
}
function move(from, to) {
  console.log("move", from, to);
  const fromId = pages[from];
  const toId = pages[to];
  const fromContainer = pageMap[fromId].container;
  const toContainer = pageMap[toId].container;
  const hash = pageMap[toId].hash;
  const step = to - from;
  const fromTop = step > 0 ? "-100vh" : "100vh";
  const toTop = step > 0 ? "100vh" : "-100vh";
  //"before-enter","entered","before-leave","left"
  const fromInstance = pageMap[fromId].instance;
  const toInstance = pageMap[toId].instance;
  fromInstance.emit("before-leave");
  toInstance.emit("before-enter");

  if (movingInContainer) {
    gsap.killTweensOf(movingInContainer);
    if (
      movingInContainer !== fromContainer &&
      movingInContainer !== toContainer
    ) {
      fadeToInvisible(movingInContainer);
    }
  }
  if (movingOutContainer) {
    gsap.killTweensOf(movingOutContainer);
    if (
      movingOutContainer !== fromContainer &&
      movingOutContainer !== toContainer
    ) {
      fadeToInvisible(movingOutContainer);
    }
  }

  pauseAllVideos(fromContainer);

  // resetTimelines(toInstance);
  setTimeout(() => {
    if (step < 0) {
      setStyle(dummy, { height: "110vh" });
    } else {
      // console.log(to * 100 + 10 + "vh");
      setStyle(dummy, { height: to * 100 + 20 + "vh" });
    }
  }, 100);

  gsap.killTweensOf(toContainer);
  gsap.killTweensOf(fromContainer);
  movingOutContainer = fromContainer;
  movingInContainer = toContainer;
  gsap.set(toContainer, {
    top: toTop,
    display: "flex",
    visibility: "visible",
    opacity: 1
  });
  gsap.to(fromContainer, {
    top: fromTop,
    ease: "power4.out",
    duration: 1
  });
  gsap.to(toContainer, {
    top: 0,
    onComplete() {
      movingOutContainer = movingInContainer = null;

      fromInstance.emit("left");
      toInstance.emit("entered");
      // console.log("entered", toInstance);
      playAllVideos(toContainer);
      // playTimelines(toInstance);
      adjustDummy();
      if (hash) location.hash = hash;
      else removeHash();
    },
    ease: "power4.out",
    duration: 1
  });
  scrolling = true;
}
function adjustDummy() {
  scrolling = true;
  // Hivue.log("to " + to);
  scrollDummy();
  setTimeout(() => {
    scrolling = false;
  }, 100);
}
function scrollDummy() {
  setStyle(dummy, { display: "block", height: pages.length * 100 + "vh" });
  const vh = window.innerHeight;
  const to = state.currentPage * vh;
  window.scrollTo(0, to);

  scrollY = to;
}
export function registerPage(hash) {
  const instance = getCurrentInstance();
  const uid = instance.uid;
  pages.push(uid);
  // console.log("page registered", uid);
  pageMap[uid] = {
    instance: instance,
    hash: hash
  };
  hashMap[hash] = uid;
  onMounted(() => {
    const container = instance.refs.container;
    pageMap[uid].container = container;
    setStyle(container, { position: "absolute", left: "0", display: "none" });
  });
}
// const timelines = {};
// export function registerTimeline(timeline, reset = true) {
//   const instance = getCurrentInstance();
//   // console.log(instance.parent.type);
//   const uid = instance.uid;
//   if (!timelines[uid]) timelines[uid] = [];
//   timelines[uid].push({ timeline, reset });
// }
// function playTimelines(instance) {
//   const uid = instance.uid;
//   // console.log("play", uid);
//   const tls = timelines[uid];
//   // console.log(timelines);
//   if (tls && tls.length) {
//     for (let i = 0; i < tls.length; i++) {
//       const { timeline } = tls[i];
//       timeline.play();
//     }
//   }
//   const parent = instance.parent;
//   if (parent) {
//     if (parent.type.name !== "f-page-viewport") playTimelines(parent);
//   }
// }
// function resetTimelines(instance) {
//   const uid = instance.uid;
//   const tls = timelines[uid];
//   if (tls && tls.length) {
//     for (let i = 0; i < tls.length; i++) {
//       const { timeline, reset } = tls[i];
//       if (reset) {
//         timeline.reset();
//       }
//     }
//   }
//   const parent = instance.parent;
//   if (parent) {
//     if (parent.type.name !== "f-page-viewport") resetTimelines(parent);
//   }
// }
// const overlayStates = {};
// const overlayHijacks = {};
// export function registerOverlayState(target, state) {
//   overlayStates[target] = state;
// }
// export function hijackOverlay(target) {
//   const instance = getCurrentInstance();
//   const uid = instance.uid;
//   if (!overlayHijacks[uid]) overlayHijacks[uid] = [];
//   overlayHijacks[uid].push(target);
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
