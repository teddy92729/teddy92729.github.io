(async()=>{
  var anime4kBlur=await fetch("https://teddy92729.github.io/ani-ss/dist/Anime4K_Restore_CNN_VL.glsl").then(r=>r.text());
  // console.log(anime4k);

  addCustomProgram(anime4kBlur);
  
  console.log("addShader");
  var vid=document.querySelector("#vid");
  if(vid)vid.dispatchEvent(new Event("loadeddata"));
//   vid.src=vid.src;   
})();  
