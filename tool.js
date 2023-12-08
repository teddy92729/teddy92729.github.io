function after(ms) {
    return new Promise((r) => {
        setTimeout(r, ms);
    });
}
function afterFrame() {
    return new Promise((r) => {
        requestAnimationFrame(r);
    });
}
function afterIdle() {
    return new Promise((r) => {
        requestIdleCallback(r);
    });
}

//wait for element to be created
function elementCreated(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
        let element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }
        let observer = new MutationObserver((mutations) => {
            element = document.querySelector(selector);
            if (element) {
                observer.disconnect();
                resolve(element);
            }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
        //reject if element is not created after 10 seconds
        after(timeout).then(() => observer.disconnect()).finally(() => reject());
    });
}

//add pushState event to window
(() => {
    const pushStateEvent = new CustomEvent("pushState");//pushState event
    //override pushState
    const pushStateFunc = window.history.pushState;
    window.history.pushState = (...args) => {
        console.info("pushState");
        window.dispatchEvent(pushStateEvent);
        return pushStateFunc.apply(window.history, args);
    }
})();

function addCss(cssString) {
    return new Promise((r) => {
        let css = document.createElement("style");
        css.innerText = cssString;
        document.head.appendChild(css);
        r(css);
    });
}
function addCssDisplayNone(...selector) {
    // return addCss(selector.map(s => `${s} {
    //     display: none !important;
    // }`).join("\n"));
    return addCss(`
        ${selector.join(",")} {
            display: none !important;
        }
    `);
}
function addCssDisplayNoneAlt(...selector) {
    // return addCss(selector.map(s => `${s} {
    //     display: block !important;
    //     visibility: hidden !important;
    //     width: 0px !important;
    //     height: 0px !important;
    //     overflow: hidden !important;
    // }`).join("\n"));
    return addCss(`
        ${selector.join(",")} {
            display: block !important;
            visibility: hidden !important;
            width: 0px !important;
            height: 0px !important;
            overflow: hidden !important;
        }
    `);
}

function waitVideoLoaded(videoElement, timeout = 10000) {
    return new Promise((resolve, reject) => {
        if (!(videoElement instanceof HTMLVideoElement)) return reject("invalid videoElement");
        if (videoElement.readyState > 0) return resolve(videoElement);
        videoElement.addEventListener("loadedmetadata", () => resolve(videoElement), { once: true });
        after(timeout).then(reject);
    });
}

console.log("tool.js loaded");
