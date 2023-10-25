function elementCreated(selector) {
    return new Promise((r) => {
        //first check if the element already exists
        let target = document.querySelector(selector);
        if (target)
            r(target);
        else {
            try {
                //use a mutation observer to wait for it to be added to the DOM
                const observer = new MutationObserver(() => {
                    target = document.querySelector(selector);
                    if (target) {
                        observer.disconnect();
                        r(target);
                    }
                });
                observer.observe(document.body, { childList: true, subtree: true });
            }
            catch (e) {
                //fallback to polling
                let id = setInterval(() => {
                    target = document.querySelector(selector);
                    if (target) {
                        clearInterval(id);
                        r(target);
                    }
                }, 100);
            }
        }
    });
}
