import Player from "@vimeo/player";
import { reactive } from "vue";
export const createVimeoController = ({ videoId }) => {
  const url = "https://player.vimeo.com/video/";
  const state = reactive({
    initialised: false,
    playing: false,
    error: false
  });
  let player;
  function init(iframe) {
    iframe.src = url + videoId;
    player = new Player(iframe);
    state.initialised = true;
  }
  function play() {
    player
      .play()
      .then(function() {
        state.playing = true;
      })
      .catch(function(error) {
        state.error = true;
        switch (error.name) {
          case "PasswordError":
            // The video is password-protected
            break;

          case "PrivacyError":
            // The video is private
            break;

          default:
            // Some other error occurred
            break;
        }
      });
  }
  return {
    init,
    play
  };
};
