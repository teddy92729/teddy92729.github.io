function elementCreated(selector){
  return new Promise((r)=>{
    let target=document.querySelector(selector);
    if(target)
      r(target);
    else{
      const observer = new MutationObserver(()=>{
        target = document.querySelector(selector);
        if (target){
          observer.disconnect();
          r(target);
        }
      });
      observer.observe(document.body,{childList: true, subtree: true});
    }
  });
}
