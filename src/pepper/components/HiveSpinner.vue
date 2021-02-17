<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      r="32"
      :stroke-width="stroke"
      stroke="currentColor"
      stroke-dasharray="50.26548245743669 50.26548245743669"
      fill="none"
      stroke-linecap="round"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        keyTimes="0;1"
        values="0 50 50;360 50 50"
      ></animateTransform>
    </circle>
  </svg>
</template>

<script>
export default {
  name: "HiveSpinner",
  props: {
    stroke: {
      type: Number,
      default: 5
    }
  }
};
</script>

<style scoped></style>
