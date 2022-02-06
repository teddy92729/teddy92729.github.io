(async()=>{
  var vid=document.querySelector("#vid");
  if(vid)vid.pause();
  console.log("Adding shader");
  var anime4k;

  anime4k=await fetch("https://teddy92729.github.io/ani-ss/dist/Anime4K_Upscale_CNN_x2_UL.glsl").then(r=>r.text());
  addCustomProgram(anime4k);
  
  anime4k=await fetch("https://teddy92729.github.io/ani-ss/dist/Anime4K_Deblur_Original.glsl").then(r=>r.text());
  addCustomProgram(anime4k);
  
  console.log("shader added");
  if(vid){
    vid.dispatchEvent(new Event("loadeddata"));
    vid.play();
  }  
})();  
