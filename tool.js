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

//add pushState event to document
(() => {
    const pushStateEvent = new CustomEvent("pushState");//pushState event
    //override pushState
    const pushStateFunc = window.history.pushState;
    window.history.pushState = (...args) => {
        document.dispatchEvent(pushStateEvent);
        return pushStateFunc.apply(window.history, args);
    }
})();
