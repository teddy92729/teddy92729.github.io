//wait for element to be created
function elementCreated(selector) {
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
        setTimeout(() => {
            observer.disconnect();
            reject();
        }, 10000);
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
    let css = document.createElement("style");
    css.innerText = cssString;
    document.head.appendChild(css);
    return css;
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

console.log("tool.js loaded");
