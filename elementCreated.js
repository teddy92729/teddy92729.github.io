function elementCreated(selector,setting){
  setting={
    node:document,
    delay:200,
    ...setting
  }
  return new Promise((r,rj)=>{
    let id=setInterval(()=>{
      let target=setting.node.querySelector(selector);
      if(target){
        clearInterval(id);
        r(target);
      }
    },setting.delay);
  });
}
