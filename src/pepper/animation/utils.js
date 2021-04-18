import gsap from "gsap";
export function fadeToInvisible(target, duration = 1) {
  gsap.to(target, {
    opacity: 0,
    onComplete() {
      target.style.visibility = "hidden";
    },
    duration
  });
}
export function invisibleToVisible(target, duration = 1, opacity = 1) {
  gsap.set(target, {
    visibility: "visible",
    opacity: 0
  });
  gsap.to(target, {
    opacity,
    duration
  });
}
