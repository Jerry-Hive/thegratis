import { getCurrentInstance, reactive } from "vue";

export const pages = reactive([]);
export function registerPage() {
  const instance = getCurrentInstance();
  console.log(instance);
  console.log(instance.slots);
  const ctx = instance.ctx;
  console.log(ctx.$el);
  console.log(ctx.$props);
}
