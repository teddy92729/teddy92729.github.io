(async()=>{
  var anime4k=await fetch("https://teddy92729.github.io/ani-ss/dist/Anime4K_Upscale_Denoise_CNN_x2_VL.glsl").then(r=>r.text());
  // console.log(anime4k);
  window.getAnime4k=function(){
    return anime4k;
  }

  addCustomProgram(getAnime4k());
  
  console.log("addShader");
  var vid=document.querySelector("#vid");
  if(vid)vid.dispatchEvent(new Event("loadeddata"));
//   vid.src=vid.src;   
})();  
