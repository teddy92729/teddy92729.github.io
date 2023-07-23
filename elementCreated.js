function elementCreated(selector){
  return new Promise((r)=>{
    const observer = new MutationObserver(()=>{
      const target = document.querySelector(selector);
      if (targetElement){
        observer.disconnect();
        r(targetElement);
      }
    });
    observer.observe(document.body,{childList: true, subtree: true});
  });
});
