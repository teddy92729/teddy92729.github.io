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

function splitUrl(url){
  let [protocol,_,host,..._path]=url.split('/');
  let [path,parameters]=_path.join('/').split('?');
  return {
    protocol:protocol.split(':')[0],
    host:host,
    path:path||"",
    parameters:parameters||"",
    join:function(){
      return `${protocol}://${host}/${path}?${parameters}`;
    }
  };
}
