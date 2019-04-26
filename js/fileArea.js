/* Handle file chooser animation button */
var animateButton = function (e) {
    e.preventDefault;
    //reset animation
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
    };
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
};

function setVideoTitle(videoFileName) {
    svgText.textContent = `Current video: ${videoFileName}`;
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

            canPlay = (canPlay === '' ? 'no' : canPlay);

            const message = 'Can play type "' + type + '": ' + canPlay;

            const isError = canPlay === 'no';

            if (isError) {
                console.log(message);
                return;
            }

            // Change video element to play the new file URL:
            const fileURL = URL.createObjectURL(file);
            videoNode.src = fileURL;

            setVideoTitle(file.name);

             // Play the video after file is loaded.
             videoNode.play();
        };

    if (!URL) {
        console.log('Your browser is not ' + '(http://caniuse.com/bloburls)" supported!');

        return;
    }

    // Register to 'file is chosen' event:
    fileInput.addEventListener('change', playSelectedFile, false);
}(window));

// Init logic:
function initFileAreaEvents() {
    svgDoc = document.getElementById("fileNameObject").contentDocument;
    svgText = svgDoc.getElementById("svgtext");
    svgAnimation = svgDoc.getElementById("pathAnimation");

    // Setting default movie title:
    const vidSource = vid.querySelector('source');
    const demoVidName = getFileNameFromUrl(vidSource.src);

    setVideoTitle(demoVidName);

    // Register to file chooser event
    fileChooseButton.addEventListener('click', onFileChooseClick, false);
}

function onFileAreaLoaded() {
}

function onFileAreaReady() {
    initButtonAnimations();
    svgDoc = document.getElementById("fileNameObject");
    svgDoc.addEventListener('load', initFileAreaEvents, false);
}

// Register to 'Onload' events:
document.addEventListener("DOMContentLoaded", onFileAreaReady, false);

if (window.addEventListener) {
    window.addEventListener('load', onFileAreaLoaded, false); //W3C
} else {
    window.attachEvent('onload', onFileAreaLoaded); //IE
}

