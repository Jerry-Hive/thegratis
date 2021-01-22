import { getCurrentInstance, onMounted, onBeforeMount } from "vue";

export const pages = [];
const pageMap = {};
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
    pageMap[uid].container = instance.refs.container;
    console.log(instance);
    instance.emit("enter");
  });
}
export function onFullPageEnter(fn) {
  const instance = getCurrentInstance();
  console.log("onFullPageEnter");
  console.log(instance);
  onBeforeMount(() => {
    console.log("onBeforeMount");
    console.log("parent", instance.parent.uid);
    console.log(pageMap);
  });
  onMounted(() => {
    console.log("page mounted");
    console.log("parent", instance.parent.uid);
    console.log(pageMap);
  });
  setTimeout(() => {
    console.log("timeout");
  }, 0);
  fn;
}
