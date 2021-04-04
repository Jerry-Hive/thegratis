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
