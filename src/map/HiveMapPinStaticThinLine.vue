<template>
	<div ref="container" id="container">
		<div
			ref="dot"
			class="origin-center dot"
			:class="show?'scale1':'scale0'"
			:style="{backgroundColor:color,width:dotSize+'px',height:dotSize+'px'}"
		></div>
		<div ref="pop" class="pop" style="position:absolute;left:0px;top:0px" :style="{color:color}">
			<div class="dummy" :style="{height:topLocation}"></div>

			<img
				v-if="labelUrl"
				ref="label"
				class="label"
				:class="labelClasses"
				:style="labelStyle"
				:src="labelUrl"
			/>
			<div
				v-else
				ref="label"
				class="label"
				:class="labelClasses"
				:style="labelStyle"
				v-html="labelText"
			></div>
			<div ref="line" class="thin-line" :style="{borderLeftColor:color}"></div>
		</div>
	</div>
</template>

<script>
// import VideoBackground from "vue-responsive-video-background-player";
// import HiveVideoLoader from "../../HiveVideoLoader";
import Hivue from "../../Hivue";
import HiveFader from "../../HiveFader";
// import HiveFader from "../../HiveFader";

export default {
	name: "hive-map-pin-static",
	data() {
		return {
			console,
			popFader: null,
			faderTimerId: null,
			show: false,
			timeId: null
		};
	},
	props: {
		labelUrl: { type: String },
		labelText: { type: String },
		x: { type: Number, default: 0 },
		y: { type: Number, default: 0 },
		color: { type: String, default: "#ffffff" },
		dotSize: { type: Number, default: 20 },
		labelStyle: { type: Object },
		labelClasses: { Array },
		inDelay: { Number, default: 10 },
		topLocation: { String } //top location in css format
	},
	components: {
		// VideoBackground
	},
	mounted() {
		this.popFader = new HiveFader(this.$refs.pop, {
			yOffset: this.dotSize / 2 + "px",
			inDelay: this.inDelay
		});
		// Hivue.log(".....................");
		// Hivue.log(this.labelStyle);
	},
	methods: {
		in() {
			clearTimeout(this.timeId);
			this.timeId = setTimeout(
				() => (this.show = true),
				this.inDelay
			);
			this.popFader.in();
			// Hivue.log(this.x, this.y);
			// Hivue.log(this.popFader);
			// this.pin(this.x, this.y);
		},
		out() {
			clearTimeout(this.timeId);
			this.show = false;
			this.popFader.out();
		},
		pin(x, y) {
			Hivue.setStyle(this.$refs.container, {
				left: x + "px",
				height: y + "px"
			});
			Hivue.setStyle(this.$refs.dot, {
				top: y + "px"
			});
		}
		// translate(scale){
		// 	this.x *= scale;
		// 	this.y *= scale;
		// }
	},
	computed: {
		getLabelStyle() {
			return this.labelStyle;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
	position: absolute;
	transform: translateX(-50%);
	/* padding-bottom */
	/* border: 1px solid red; */
	top: 0px;
}
.pop {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	height: 100%;
	/* border: 1px solid blue; */
	bottom: 0px;
	/* top: -1000px; */
	/* transform: translateX(-50%); */
	/* left:0px; */
}
.origin-center {
	transform: translate(-50%, -50%);
}
.dot {
	position: absolute;
	border-radius: 50%;
	left: 0px;
	cursor: pointer;
	transition: all 0.8s ease-in-out;
}
.scale0 {
	transform: translate(-50%, -50%) scale(2, 2);
	opacity: 0;
}
.scale1 {
	transform: translate(-50%, -50%) scale(1, 1);
	opacity: 1;
}
.thin-line {
	border-left-width: 1px;
	border-left-style: solid;
	width: 1px;
	left: 0px;
	flex-grow: 1;
	transform: translateX(-50%);
	transition: all 0.8s ease-in-out;
	/* position: absolute; */
	/* position: absolute;
	bottom: 0px; */
}
.label {
	flex-grow: 0;
	transform: translateX(-50%);
	white-space: nowrap;
	user-select: none;
	/* position: absolute; */
	/*  
	transform: translate(-50%, -100%);
	left: 0px; */
}
.dummy {
	flex-grow: 0;
}
</style>
