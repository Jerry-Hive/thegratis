/*
To serve a universal js file to multiple sites for registering lead.
*/
/*Polyfill for IE
https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
*/
(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();
(function () {
  var referrer = document.referrer;
  var errHints = {

    nameEmpty: "May I have your name?",
    nameError: "Your name is too short.",

    emailEmpty: "May I have your email?",
    emailError: "The email address you entered is not valid. Please try again.",

    phoneEmpty: "May I have your phone number?",
    phoneError: "The phone number you entered is not valid. Please try again.",

    postEmpty: "May I have your postcode?",
    postError: "The postcode you entered is not valid. Please try again.",
  };
  var phoneReg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{7,16}$/;
  var emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,12}$/;
  var postReg = /^\d{4,6}$/;

  var datasetStr = "hiveinitialised";
  var submitForm;
  var submitBtn;
  var errClass = "error";
  var data = {};
  var eventHandlers={};

  var nameErr, emailErr, phoneErr, postErr;

  function printErr(elemId, hintMsg) {
    var div = document.getElementById("error-" + elemId);
    if (div) div.innerHTML = hintMsg;
  }

  function clearErr(elemId) {
    printErr(elemId, "");
  }

  function checkErr() {
    if (
      nameErr ||
      emailErr ||
      phoneErr ||
      postErr ||
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.postcode
    ) {
      submitBtn.disabled = true;
    } else {
      submitBtn.disabled = false;
    }
  }

  function validateName() {
    var name = submitForm.name;
    data.name = null;
    var val = name.value.trim();
    if (val.length < 1) {
      nameErr = errHints.nameEmpty;
    } else {
      var regex = /^[a-zA-Z\s]+$/;
      if (val.length < 2 || regex.test(val) === false) {
        nameErr = errHints.nameError;
      } else {
        nameErr = false;
        clearErr("name");
        name.classList.remove(errClass);
        data.name = val;
      }
    }
  }

  function validateEmail() {
    data.email = null;
    var email = submitForm.email;
    var val = email.value.trim();
    if (val.length < 1) {
      emailErr = errHints.emailEmpty;
    } else {
      if (emailReg.test(val) === false) {
        emailErr = errHints.emailError;
      } else {
        emailErr = false;
        clearErr("email");
        email.classList.remove(errClass);
        data.email = val;
      }
    }
  }

  function validatePhone() {
    data.phone = null;
    var phone = submitForm.phone;
    var val = phone.value.trim();
    if (val.length < 1) {
      phoneErr = errHints.phoneEmpty;
    } else {
      if (phoneReg.test(val) === false) {
        phoneErr = errHints.phoneError;
      } else {
        phoneErr = false;
        clearErr("phone");
        phone.classList.remove(errClass);
        data.phone = val;
      }
    }
  }

  function validatePost() {
    data.postcode = null;
    var post = submitForm.post;
    var val = post.value.trim();
    if (val.length < 1) {
      postErr = errHints.postEmpty;
    } else {
      if (postReg.test(val) === false) {
        postErr = errHints.postError;
      } else {
        postErr = false;
        clearErr("post");
        post.classList.remove(errClass);
        data.postcode = val;
      }
    }
  }

  var url="https://api.hive.properties/register";
  function sendData() {
    var XHR = new XMLHttpRequest();

    XHR.addEventListener("load", function (event) {
      // alert("Yeah! Data sent and response loaded.");
      submitForm.dispatchEvent(new CustomEvent('submit-successful'));
      submitForm.reset();
      submitBtn.disabled=false;
      if(eventHandlers&&eventHandlers.successful){
        eventHandlers.successful();
      }
    });

    XHR.addEventListener("error", function (event) {
      // alert("Oops! Something went wrong.");
      submitForm.dispatchEvent(new CustomEvent('submit-error'));
      if(eventHandlers&&eventHandlers.error){
        eventHandlers.error();
      }
      console.log("error", event);
      submitBtn.disabled=false;

    });
    console.log("data", data);
    submitBtn.disabled=true;
    XHR.open("POST", url);
    XHR.setRequestHeader("Content-Type", "application/json");
    XHR.send(JSON.stringify({ data: data }));
    submitForm.dispatchEvent(new CustomEvent('submit-start'));
    if(eventHandlers&&eventHandlers.start){
      eventHandlers.start();
    }
  }

  function poke(){
    let XHR = new XMLHttpRequest();
    XHR.addEventListener("load", function (event) {
      console.log(event);
    });
    XHR.open("post", url)
    XHR.setRequestHeader("Content-Type", "application/json");
    XHR.send(JSON.stringify({ ping:true }));
  }

  /**
   *
   * @param project
   * @param formId
   * @param opts
   *          submitButtonId
   *          errorClass
   * @param handlers
   *          start
   *          error
   *          successful
   * @constructor
   */
  window.HIVE_LEAD_FORM = function (project, formId, opts,handlers) {
    data = { project: project, referrer: referrer };
    if (window.hiveuid) data.uuid = window.hiveuid;
    if (opts.errorClass) {
      errClass = opts.errorClass;
    }
    submitForm = document.getElementById(formId);

    if (!submitForm) {
      console.error("HIVE_LEAD_FORM submitForm not found: " + formId);
      return;
    }
    if(handlers){
      eventHandlers=handlers;
    }
    console.log("HIVE FORM INITIALISED WITH FORM "+formId);
    submitForm.addEventListener("submit",(e)=>{
      e.stopPropagation();
      e.preventDefault();
    })
    if (opts.submitButtonId) {
      submitBtn = document.getElementById(opts.submitButtonId);
    } else {
      submitBtn = submitForm.querySelector("[type='submit']");
    }

    if (!submitBtn) {
      console.error("HIVE_LEAD_FORM submitButton not found in form " + formId);
      return;
    }
    var name = submitForm.name;
    if (name && !name.dataset[datasetStr]) {
      name.addEventListener("blur", function () {
        validateName();
        if (nameErr) {
          printErr("name", nameErr);
          name.classList.add(errClass);
        } else {
        }
      });
      name.addEventListener("keyup", function () {
        validateName();
        checkErr();
      });
      name.dataset[datasetStr] = true;
    }

    var email = submitForm.email;
    if (email && !email.dataset[datasetStr]) {
      email.addEventListener("blur", function () {
        validateEmail();
        if (emailErr) {
          printErr("email", emailErr);
          email.classList.add(errClass);
        } else {
        }
        poke();
      });
      email.addEventListener("keyup", function () {
        validateEmail();
        checkErr();
      });
      email.dataset[datasetStr] = true;
    }

    var phone = submitForm.phone;
    if (phone && !phone.dataset[datasetStr]) {
      phone.addEventListener("blur", function () {
        validatePhone();
        if (phoneErr) {
          printErr("phone", phoneErr);
          phone.classList.add(errClass);
        } else {
        }
        poke()
      });
      phone.addEventListener("keyup", function () {
        validatePhone();
        checkErr();
      });
      phone.dataset[datasetStr] = true;
    }

    var post = submitForm.post;
    if (post && !post.dataset[datasetStr]) {
      post.addEventListener("blur", function () {
        validatePost();
        if (postErr) {
          printErr("post", postErr);
          post.classList.add(errClass);
        } else {
        }
      });
      post.addEventListener("keyup", function () {
        validatePost();
        checkErr();
      });
      post.dataset[datasetStr] = true;
    }

    if (!submitBtn.dataset[datasetStr]) {
      submitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var message = submitForm.message;
        if (message) {
          var val = message.value.trim();
          if (val.length) data.message = val;
        }
        console.log(data);
        sendData();
      });
      submitBtn.disabled = true;
      submitBtn.dataset[datasetStr] = true;
    }
  };
})();
