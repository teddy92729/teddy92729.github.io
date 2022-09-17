function splitUrl(url){
  let [protocol,_,host,..._path]=url.split('/');
  let [path,parameters]=_path.join('/').split('?');
  return {
    protocol:protocol.split(':')[0],
    host:host,
    path:path||"",
    parameters:parameters||"",
  };
}
function joinUrl(data){
  return `${data.protocol}://${data.host}/${data.path}?${data.parameters}`;
}
