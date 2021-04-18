<template>
  <div
    id="enquery-container"
    class="full-size origin fixed flex-center enable-events"
    ref="wrapper"
  >
    <transition-fade>
      <div
        style="width:100%;max-width:800px;margin:auto;padding:25px;z-index:300"
        class="absolute font-peach text-center"
        ref="form"
        v-if="status === FORM_STATUS.FORM"
      >
        <img
          ref="logo"
          src="@/assets/logo-peach.png"
          style="height:7vh;margin:2vh"
        />

        <form
          id="hive-form"
          style="width:100%"
          @submit-start="submitting = true"
          @submit-error="submitError = true"
          @submit-successful="submitDone = true"
        >
          <input
            v-model="name"
            type="text"
            id="name"
            name="name"
            placeholder="Name*"
            class="content-font"
          />
          <div
            style="height:20px"
            class="flex-center error-msg"
            id="error-name"
          ></div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email*"
            class="content-font"
          />
          <div
            style="height:20px"
            class="flex-center error-msg"
            id="error-email"
          ></div>

          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone*"
            class="content-font"
          />
          <div
            style="height:20px"
            class="flex-center error-msg"
            id="error-phone"
          ></div>

          <input
            type="text"
            id="postcode"
            name="post"
            placeholder="Postcode*"
            class="content-font"
            digits="true"
          />
          <div
            style="height:20px"
            class="flex-center error-msg"
            id="error-post"
          ></div>

          <textarea
            name="message"
            class="content-font"
            placeholder="Message"
          ></textarea>

          <div
            style="width:100%;display:inline-block;text-align: right;margin-top:20px"
          >
            <button class="submit-button" id="submit-button">Submit</button>
          </div>
        </form>
        <div
          class="caslon italic text-center comfort-letter-spacing text-peach"
          style="margin:5vh;font-size:1.4vh"
        >
          Or call
          <br />Nichole Pickering <br /><a
            href="tel:0448 49 48 48"
            class="text-peach"
            >0448 49 48 48</a
          >
          <br />to make a private appointment
        </div>
        <a href="https://hive.properties" target="_blank">
          <!--        <img src="@/assets/hive-small-peach.png" style="height:3vh;" />-->
        </a>
      </div>
    </transition-fade>

    <transition-fade>
      <div
        ref="submitting"
        class="full-size origin text-peach"
        style="opacity: .9"
        v-if="status === FORM_STATUS.SUBMITTING"
      >
        <div class="full-size flex-center">Submitting Your Request...</div>
      </div>
    </transition-fade>

    <transition-fade>
      <div
        ref="submitError"
        class="full-size origin"
        v-if="status === FORM_STATUS.ERROR"
      >
        <div class="full-size flex-center text-peach">
          <div>Something went wrong. Please try again later.</div>
          <br />
          <button @click="submitErrorClick">OK</button>
        </div>
      </div>
    </transition-fade>
    <transition-fade>
      <div
        ref="done"
        class="bg-white full-size origin text-center text-peach"
        v-if="status === FORM_STATUS.SUCCESSFUL"
      >
        <div class="full-size flex-center">
          <img
            ref="logo"
            src="@/assets/logo-peach.png"
            style="height:6vh;margin:2vh"
          />
          <span class="thank-you">
            Thank you {{ name }} for registering your interest. <br />We will
            get in touch with you shortly.
            <br />
            <br />Alternatively, you may contact us directly via:
            <br />
            <br />Email:
            <a href="mailto:enquiries@theGratis.com.au" class="text-peach"
              >enquiries@hiveproperties.com.au</a
            >
            <br />or <br />Phone:
            <a href="tel:0448 49 48 48" class="text-peach">0448 49 48 48</a>
            <br />
            <br />We hope to speak with you soon!
          </span>

          <div style="height:10vh;text-align:center;margin:4vh;opacity:.8">
            <!--          <img src="@/assets/ibis.png" style="height:100%" />-->
          </div>
          <div class="caslon" style="font-size:3vh;">An unlimited you.</div>
        </div>
      </div>
    </transition-fade>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import TransitionFade from "@/pepper/animation/TransitonFade";
const FORM_STATUS = {
  FORM: 1,
  SUBMITTING: 2,
  SUCCESSFUL: 3,
  ERROR: 4
};
export default {
  name: "RegisterForm",
  components: { TransitionFade },

  setup() {
    const status = ref(FORM_STATUS.FORM);
    function start() {
      status.value = FORM_STATUS.SUBMITTING;
    }
    function successful() {
      status.value = FORM_STATUS.SUCCESSFUL;
    }
    function error() {
      status.value = FORM_STATUS.ERROR;
    }
    onMounted(() => {
      window.HIVE_LEAD_FORM(
        "THEGRATIS",
        "hive-form",
        { submitButtonId: "submit-button" },
        {
          start,
          successful,
          error
        }
      );
    });
    return {
      FORM_STATUS,
      status
    };
  }
};
</script>

<style scoped>
.hive-peach {
  fill: #edd9d0;
}

div {
  box-sizing: border-box;
}

.error-msg {
  color: #e57c7c;
}

input,
textarea {
  outline: none;
  border: none;
  border-bottom: 1px solid #ddbcb0;
  /*font-size: 1.2em;*/
  /*height: 40px;*/
  padding: 5px;
  /*font-family: Poppins, sans-serif;*/
  background: none;
  /* margin-bottom: 5vh; */
  transition: all 1s;
  display: block;
  margin: auto;
  color: #ddbcb0;
  font-size: 1.5vh;
  width: 100%;
  box-sizing: border-box;
  font-family: big-caslon-fb, serif;
  margin-bottom: 1px;
  font-weight: bolder;
  opacity: 0.7;
}

textarea {
  height: 100px;
  /* min-height: 100px; */
}

button {
  background: none;
  border: 1px solid #ddbcb0;
  transition: all 1s;
  color: #ddbcb0;
  padding: 5px;
  font-family: big-caslon-fb, serif;
}

.submit-button {
  width: 30%;
  /* max-width: 400px; */
  min-width: 100px;
  height: 3vh;
  min-height: 40px;
}

button:hover:enabled {
  background-color: #ddbcb0;
  color: #29323c;
}

button:disabled {
  opacity: 0.5;
}

input:focus,
textarea:focus {
  border-bottom: 2px solid #ddbcb0;
  color: #ddbcb0;
  margin-bottom: 0px;
  opacity: 1;
}

.text-peach {
  color: #ddbcb0 !important;
}

.error {
  color: #e57c7c;
  display: block;
}

.content-width {
  width: 100%;
  max-width: 600px;
}

.error-wrapper {
  height: 1.5vh;
  max-height: 100px;
}

input:focus::-webkit-input-placeholder,
textarea:focus::-webkit-input-placeholder {
  opacity: 0.5;
  color: #edd9d0;
}

/* Firefox < 19 */

input:focus:-moz-placeholder,
textarea:focus:-moz-placeholder {
  opacity: 0.5;
  color: #edd9d0;
}

/* Firefox > 19 */

input:focus::-moz-placeholder,
textarea:focus::-moz-placeholder {
  opacity: 0.5;
  color: #edd9d0;
}

/* Internet Explorer 10 */

input:focus:-ms-input-placeholder,
textarea:focus:-ms-input-placeholder {
  opacity: 0.5;
  color: #edd9d0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}
</style>
