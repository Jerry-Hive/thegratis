<template>
  <div class="arrow" :style="style"></div>
</template>

<script>
function px(n) {
  return n + "px";
}
export default {
  name: "animated-arrow",
  props: {
    size: { type: Number, default: 15 },
    thickness: { type: Number, default: 2 },
    color: { type: String, default: "black" },
    direction: { type: String, default: "down" }
  },
  data() {
    return {
      console
    };
  },
  computed: {
    style() {
      // this.console.log(this.direction);
      return {
        width: px(this.size),
        height: px(this.size),
        borderBottom:
          this.direction === "down"
            ? this.thickness + "px solid " + this.color
            : "none",
        borderRight:
          this.direction === "down"
            ? this.thickness + "px solid " + this.color
            : "none",
        borderTop:
          this.direction === "up"
            ? this.thickness + "px solid " + this.color
            : "none",
        borderLeft:
          this.direction === "up"
            ? this.thickness + "px solid " + this.color
            : "none",
        transform: "translate(-50%, 0%) rotate(45deg)",
        animation:
          this.direction === "down"
            ? "fade_move_down 4s ease-in-out infinite"
            : "fade_move_up 4s ease-in-out infinite"
      };
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style>
/* .arrow {
	position: absolute;
	left: 50%;
	bottom: 10px;
	display: block;
	text-align: center;
	font-size: 20px;
	z-index: 100;
	text-decoration: none;
	text-shadow: 0;
	width: 13px;
	height: 13px;
	border-bottom: 2px solid #fff;
	border-right: 2px solid #fff;
	z-index: 9;
	left: 50%;
	-webkit-transform: translate(-50%, 0%) rotate(45deg);
	-moz-transform: translate(-50%, 0%) rotate(45deg);
	transform: translate(-50%, 0%) rotate(45deg);
	-webkit-animation: fade_move_down 4s ease-in-out infinite;
	-moz-animation: fade_move_down 4s ease-in-out infinite;
	animation: fade_move_down 4s ease-in-out infinite;
} */

/*animated scroll arrow animation*/
@-webkit-keyframes fade_move_down {
  0% {
    -webkit-transform: translate(-50%, -100%) rotate(45deg);
    opacity: 0;
  }
  50% {
    -webkit-transform: translate(-50%, -50%) rotate(45deg);
    opacity: 0.5;
  }
  100% {
    -webkit-transform: translate(-50%, 0) rotate(45deg);
    opacity: 0;
  }
}
@-moz-keyframes fade_move_down {
  0% {
    -webkit-transform: translate(-50%, -100%) rotate(45deg);
    opacity: 0;
  }
  50% {
    -webkit-transform: translate(-50%, -50%) rotate(45deg);
    opacity: 0.5;
  }
  100% {
    -webkit-transform: translate(-50%, 0) rotate(45deg);
    opacity: 0;
  }
}
@keyframes fade_move_down {
  0% {
    -webkit-transform: translate(-50%, -100%) rotate(45deg);
    opacity: 0;
  }
  50% {
    -webkit-transform: translate(-50%, -50%) rotate(45deg);
    opacity: 0.5;
  }
  100% {
    -webkit-transform: translate(-50%, 0) rotate(45deg);
    opacity: 0;
  }
}

@-webkit-keyframes fade_move_up {
  0% {
    -webkit-transform: translate(-50%, 100%) rotate(45deg);
    opacity: 0;
  }
  50% {
    -webkit-transform: translate(-50%, 50%) rotate(45deg);
    opacity: 0.5;
  }
  100% {
    -webkit-transform: translate(-50%, 0) rotate(45deg);
    opacity: 0;
  }
}
@-moz-keyframes fade_move_up {
  0% {
    -webkit-transform: translate(-50%, 100%) rotate(45deg);
    opacity: 0;
  }
  50% {
    -webkit-transform: translate(-50%, 50%) rotate(45deg);
    opacity: 0.5;
  }
  100% {
    -webkit-transform: translate(-50%, 0) rotate(45deg);
    opacity: 0;
  }
}
@keyframes fade_move_up {
  0% {
    -webkit-transform: translate(-50%, 100%) rotate(45deg);
    opacity: 0;
  }
  50% {
    -webkit-transform: translate(-50%, 50%) rotate(45deg);
    opacity: 0.5;
  }
  100% {
    -webkit-transform: translate(-50%, 0) rotate(45deg);
    opacity: 0;
  }
}
</style>
