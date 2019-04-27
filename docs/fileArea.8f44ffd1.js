// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"13yd":[function(require,module,exports) {
/* Handle file chooser animation button */
var animateButton = function (e) {
  e.preventDefault; //reset animation

  e.target.classList.remove('animate');
  e.target.classList.add('animate');
  setTimeout(function () {
    e.target.classList.remove('animate');
  }, 700);
};

function initButtonAnimations() {
  var bubblyButtons = document.getElementsByClassName("bubbly-button");

  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }

  ;
}
/* Global Members */


let svgDoc;
let svgText;
let svgAnimation;
const videoNode = document.getElementById('vid');
const fileChooseButton = document.getElementById("fileChooseBtn");
const fileInput = document.getElementById("fileInput");
/* Handle File-choose area events and components. */

function getFileNameFromUrl(fileUrl) {
  let fileNameToResult = '';

  if (fileUrl) {
    fileNameToResult = fileUrl.split('/').pop();
  }

  return fileNameToResult;
}

;

function setVideoTitle(videoFileName) {
  svgText.textContent = "Current video: ".concat(videoFileName);
  svgAnimation.beginElement();
}

function onFileChooseClick() {
  fileInput.click();
}

(function localFileVideoPlayerInit(win) {
  const URL = win.URL || win.webkitURL,
        playSelectedFile = function playSelectedFileInit(event) {
    const file = this.files[0];
    const type = file.type;
    let canPlay = videoNode.canPlayType(type);
    canPlay = canPlay === '' ? 'no' : canPlay;
    const message = 'Can play type "' + type + '": ' + canPlay;
    const isError = canPlay === 'no';

    if (isError) {
      console.log(message);
      return;
    } // Change video element to play the new file URL:


    const fileURL = URL.createObjectURL(file);
    videoNode.src = fileURL;
    setVideoTitle(file.name); // Play the video after file is loaded.

    videoNode.play();
  };

  if (!URL) {
    console.log('Your browser is not ' + '(http://caniuse.com/bloburls)" supported!');
    return;
  } // Register to 'file is chosen' event:


  fileInput.addEventListener('change', playSelectedFile, false);
})(window); // Init logic:


function initFileAreaEvents() {
  svgDoc = document.getElementById("fileNameObject").contentDocument;
  svgText = svgDoc.getElementById("svgtext");
  svgAnimation = svgDoc.getElementById("pathAnimation"); // Setting default movie title:

  const vidSource = vid.querySelector('source');
  const demoVidName = getFileNameFromUrl(vidSource.src);
  setVideoTitle(demoVidName); // Register to file chooser event

  fileChooseButton.addEventListener('click', onFileChooseClick, false);
}

function onFileAreaLoaded() {}

function onFileAreaReady() {
  initButtonAnimations();
  svgDoc = document.getElementById("fileNameObject");
  svgDoc.addEventListener('load', initFileAreaEvents, false);
} // Register to 'Onload' events:


document.addEventListener("DOMContentLoaded", onFileAreaReady, false);

if (window.addEventListener) {
  window.addEventListener('load', onFileAreaLoaded, false); //W3C
} else {
  window.attachEvent('onload', onFileAreaLoaded); //IE
}
},{}]},{},["13yd"], null)
//# sourceMappingURL=fileArea.8f44ffd1.map