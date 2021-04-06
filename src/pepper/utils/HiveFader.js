import { getComputedStyle, setStyle } from "./domUtils";

const defaultOptions = {
  xOffset: "0px",
  yOffset: "0px",
  inDelay: 10,
  outDelay: 10,
  duration: 1000,
  ease: "ease-in-out",
  opacity: 1,
  hideInitially: true
};

export default class HiveFader {
  element;
  options;
  timeId;
  currentStat = "in";

  /**
	 *
	 * @param element
	 * @param options {{
	 *   xOffset: "0px"
   yOffset: "0px"
  inDelay: 10
  outDelay: 10
  duration: 1000
  ease: "ease-in-out"
  opacity: 1
  hideInitially: true
	 * }}
	 */
  constructor(element, options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.element = element;
    const ms = this.options.duration + "ms";
    const originalTransition = getComputedStyle(this.element, "transition");
    const ot = originalTransition.length ? originalTransition + "," : "";

    const init = {
      transition: ot + "transform " + ms + ",opacity " + ms,
      opacity: this.options.hideInitially ? 0 : this.options.opacity,
      transform:
        "translate(" + this.options.xOffset + "," + this.options.yOffset + ")",
      visibility: this.options.hideInitially ? "hidden" : ""
    };
    setStyle(element, init);

    this.element.addEventListener("transitionend", e => {
      if (e.target !== this.element) return;
      if (this.currentStat === "out") {
        this.element.style.visibility = "hidden";
      }
    });
  }

  in(instant) {
    clearTimeout(this.timeId);
    this.currentStat = "in";
    this.element.style.visibility = "visible";
    this.timeId = setTimeout(
      () => {
        setStyle(this.element, {
          opacity: this.options.opacity,
          transform: "translate(0px,0px)"
        });
      },
      instant ? 10 : this.options.inDelay
    );
  }
  out(instant) {
    clearTimeout(this.timeId);
    this.currentStat = "out";
    this.timeId = setTimeout(
      () => {
        setStyle(this.element, {
          opacity: 0,
          transform:
            "translate(" +
            this.options.xOffset +
            "," +
            this.options.yOffset +
            ")",
          transitionTimingFunction: this.options.ease
        });
      },
      instant ? 10 : this.options.outDelay
    );
  }
}
