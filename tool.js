let after = (ms) => {
    return new Promise((r) => {
        setTimeout(r, ms);
    });
}
let afterFrame = () => {
    return new Promise((r) => {
        requestAnimationFrame(r);
    });
}
let afterIdle = () => {
    return new Promise((r) => {
        requestIdleCallback(r);
    });
}
//--------------------
let elementCreated = (selector, timeout = -1) => {
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
        if (timeout >= 0) after(timeout).then(reject);
    });
}
let elementRemoved = (element, timeout = -1) => {
    return new Promise((resolve, reject) => {
        if (!element || !(element instanceof HTMLElement)) {
            resolve();
            return;
        }
        let observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (Array.from(mutation.removedNodes).includes(element))
                    resolve();
            });
        });
        observer.observe(element.parentNode, { childList: true });
        if (timeout >= 0) after(timeout).then(reject);

    });
}
let waitVideoLoaded = (videoElement, timeout = -1) => {
    return new Promise((resolve, reject) => {
        if (!(videoElement instanceof HTMLVideoElement)) return reject("invalid videoElement");
        if (videoElement.readyState > 0) return resolve(videoElement);
        videoElement.addEventListener("loadedmetadata", () => resolve(videoElement), { once: true });
        if (timeout >= 0) after(timeout).then(reject);
    });
}
//--------------------
(() => {
    const pushStateEvent = new Event("pushState");
    const pushStateFunc = window.history.pushState;
    window.history.pushState = (...args) => {
        console.info("pushState");
        window.dispatchEvent(pushStateEvent);
        return pushStateFunc.apply(window.history, args);
    }
})();
//--------------------
let addCss = (cssString) => {
    return new Promise((r) => {
        let css = document.createElement("style");
        css.innerText = cssString;
        document.head.appendChild(css);
        r(css);
    });
}
let addCssDisplayNone = (...selector) => {
    return addCss(`
        ${selector.join(", ")} {
            display: none !important;
        }
    `);
}
let addCssDisplayNoneAlt = (...selector) => {
    return addCss(`
        ${selector.join(", ")} {
            display: block !important;
            visibility: hidden !important;
            width: 0px !important;
            height: 0px !important;
            overflow: hidden !important;
        }
    `);
}

console.log("tool.js loaded");
