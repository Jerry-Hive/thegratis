import { getComputedStyleValue } from "./domUtils";

export const stylerById = id => {
  return styler(document.getElementById(id));
};
function styler(target) {
  // console.log(".....................styler");
  // console.log(target);
  const $this = {
    setLocation(x, y) {
      target.style.left = x + "px";
      target.style.top = y + "px";
      return $this;
    },

    sameLocationAs(element) {
      const bound = element.getBoundingClientRect();
      $this.setLocation(bound.left, bound.top);
      return $this;
    },

    set(styleObject) {
      for (const [key, value] of Object.entries(styleObject)) {
        target.style[key] = value;
      }
      return $this;
    },

    opacity(v) {
      if (arguments.length === 0) {
        return getComputedStyleValue(target, "opacity");
      } else {
        return $this.set({ opacity: v });
      }
    },

    centerOrigin() {
      target.style.transformOrigin = "center";
      return $this;
    },

    centerTo(element) {
      const bound = element.getBoundingClientRect();
      $this.centerOrigin().setLocation(bound.left / 2, bound.top / 2);
      return $this;
    },
    scale(sx, sy) {
      let t = sx;
      if (sy !== null) t += "," + sy;
      $this.set({
        transform: "scale(" + t + ")"
      });
      return $this;
    },
    resetTransform() {
      return $this.set({
        transform: "none"
      });
    },
    width() {
      return target.getBoundingClientRect().width;
    },
    height() {
      return target.getBoundingClientRect().height;
    },
    transparent() {
      return $this.set({ opacity: 0 });
    },
    disableEvents() {
      return $this.set({ pointerEvents: "none" });
    },
    enableEvents() {
      return $this.set({ pointerEvents: "auto" });
    },
    hide() {
      return $this.set({ visibility: "hidden" });
    },
    unhide() {
      return $this.set({ visibility: "visible" });
    },
    hand() {
      return $this.set({ cursor: "pointer" });
    }
  };
  return $this;
}
export default styler;
