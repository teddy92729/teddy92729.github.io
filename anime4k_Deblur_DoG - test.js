// ==UserScript==
// @name        anime4k_Deblur_DoG - test
// @namespace   Violentmonkey Scripts
// @match       https://*/*.mp4
// @grant       none
// @version     1.1
// @author      -
// @require     https://teddy92729.github.io/elementCreated.js
// @require     https://pixijs.download/release/pixi.js
// @description 2022/11/28 下午5:26:55
// ==/UserScript==
const anime4k_deblur_dog_frag=`
precision highp float;
varying vec2 vTextureCoord;
uniform vec4 inputSize;
uniform sampler2D uSampler;
//-------------------------------------------
#define HOOKED_pos      vTextureCoord
#define HOOKED_tex(pos) texture2D(uSampler, pos)
#define HOOKED_pt       inputSize.zw

float get_luma(vec4 rgba) {
	return dot(vec4(0.299, 0.587, 0.114, 0.0), rgba);
}

vec4 LINELUMA_tex(vec2 pos){
    return vec4(get_luma(HOOKED_tex(pos)), 0.0, 0.0, 0.0);
}
//------------------------------------------

#define L_tex LINELUMA_tex

float max3v(float a, float b, float c) {
	return max(max(a, b), c);
}
float min3v(float a, float b, float c) {
	return min(min(a, b), c);
}

vec2 minmax3(vec2 pos, vec2 d) {
	float a = L_tex(pos - d).x;
	float b = L_tex(pos).x;
	float c = L_tex(pos + d).x;

	return vec2(min3v(a, b, c), max3v(a, b, c));
}

float lumGaussian7(vec2 pos, vec2 d) {
	float g = (L_tex(pos - (d + d)).x + L_tex(pos + (d + d)).x) * 0.06136;
	g = g + (L_tex(pos - d).x + L_tex(pos + d).x) * 0.24477;
	g = g + (L_tex(pos).x) * 0.38774;

	return g;
}


vec4 MMKERNEL_tex(vec2 pos) {
    return vec4(lumGaussian7(pos, vec2(HOOKED_pt.x, 0.0)), minmax3(pos, vec2(HOOKED_pt.x, 0.0)), 0.0);
}
//-------------------------------------------------
#undef L_tex
#define L_tex MMKERNEL_tex


vec2 minmax3_y(vec2 pos, vec2 d) {
	float a0 = L_tex(pos - d).y;
	float b0 = L_tex(pos).y;
	float c0 = L_tex(pos + d).y;

	float a1 = L_tex(pos - d).z;
	float b1 = L_tex(pos).z;
	float c1 = L_tex(pos + d).z;

	return vec2(min3v(a0, b0, c0), max3v(a1, b1, c1));
}

float lumGaussian7_y(vec2 pos, vec2 d) {
	float g = (L_tex(pos - (d + d)).x + L_tex(pos + (d + d)).x) * 0.06136;
	g = g + (L_tex(pos - d).x + L_tex(pos + d).x) * 0.24477;
	g = g + (L_tex(pos).x) * 0.38774;

	return g;
}


vec4 MMKERNEL_y_tex(vec2 pos) {
    return vec4(lumGaussian7_y(pos, vec2(0.0, HOOKED_pt.y)), minmax3_y(pos, vec2(0.0, HOOKED_pt.y)), 0.0);
}
//-------------------------------------------------
#define STRENGTH 0.6 //De-blur proportional strength, higher is sharper. However, it is better to tweak BLUR_CURVE instead to avoid ringing.
#define BLUR_CURVE 0.6 //De-blur power curve, lower is sharper. Good values are between 0.3 - 1. Values greater than 1 softens the image;
#define BLUR_THRESHOLD 0.1 //Value where curve kicks in, used to not de-blur already sharp edges. Only de-blur values that fall below this threshold.
#define NOISE_THRESHOLD 0.001 //Value where curve stops, used to not sharpen noise. Only de-blur values that fall above this threshold.
#undef L_tex
#define L_tex LINELUMA_tex

vec4 Apply_tex(vec2 pos) {
	float c = (L_tex(pos).x - MMKERNEL_y_tex(pos).x) * STRENGTH;

	float t_range = BLUR_THRESHOLD - NOISE_THRESHOLD;

	float c_t = abs(c);
	if (c_t > NOISE_THRESHOLD) {
		c_t = (c_t - NOISE_THRESHOLD) / t_range;
		c_t = pow(c_t, BLUR_CURVE);
		c_t = c_t * t_range + NOISE_THRESHOLD;
		c_t = c_t * sign(c);
	} else {
		c_t = c;
	}

	float cc = clamp(c_t + L_tex(pos).x, MMKERNEL_y_tex(pos).y, MMKERNEL_y_tex(pos).z) - L_tex(pos).x;

	//This trick is only possible if the inverse Y->RGB matrix has 1 for every row... (which is the case for BT.709)
	//Otherwise we would need to convert RGB to YUV, modify Y then convert back to RGB.
	return HOOKED_tex(pos) + cc;
}
//-------------------------------------------------
void main(){
    gl_FragColor=Apply_tex(HOOKED_pos);
}
`;
const vertex=
`#version 300 es
in vec2 aVertexPosition;
uniform mat3 projectionMatrix;
out vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void ){
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void ){
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void){
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`;

const cartoon_frag=
`#version 300 es
precision highp float;
in vec2 vTextureCoord;
uniform vec4 inputSize;
uniform sampler2D uSampler;
uniform sampler2D Orginal;
out vec4 color;
//-------------------------------------------
#define MAIN_pos      vTextureCoord
#define MAIN_tex(pos) texture(uSampler, pos)
#define Orginal_tex(pos) texture(Orginal, pos)
#define MAIN_pt       inputSize.zw
#define MAIN_texOff(offset) MAIN_tex(MAIN_pos+(offset)*MAIN_pt)
//-------------------------------------------
#define EdgeSlope 0.6
#define Power     0.1
float get_luma(vec4 rgba) {
	return dot(vec4(0.299, 0.587, 0.114, 0.0), rgba);
}
vec4 hook() {
    float diff1=get_luma(MAIN_texOff(vec2(1,1)));
    diff1=get_luma(MAIN_texOff(vec2(-1,-1)))-diff1;
    float diff2=get_luma(MAIN_texOff(vec2(1,-1)));
    diff2=get_luma(MAIN_texOff(vec2(-1,1)))-diff2;
    float edge=diff1*diff1+diff2+diff2;
    return clamp(pow(abs(edge), EdgeSlope) * -Power + MAIN_tex(MAIN_pos),0.0,1.0);
}
void main(){
    color=hook();
}
`;
const fxaa_frag=
`#version 300 es
precision highp float;
in vec2 vTextureCoord;
uniform vec4 inputSize;
uniform sampler2D uSampler;
uniform sampler2D Orginal;
out vec4 color;
//-------------------------------------------
#define MAIN_pos      vTextureCoord
#define MAIN_tex(pos) texture(uSampler, pos)
#define Orginal_tex(pos) texture(Orginal, pos)
#define MAIN_pt       inputSize.zw
#define MAIN_texOff(offset) MAIN_tex(MAIN_pos+(offset)*MAIN_pt)
//-------------------------------------------
#ifndef FXAA_REDUCE_MIN
    #define FXAA_REDUCE_MIN   (1.0/ 128.0)
#endif
#ifndef FXAA_REDUCE_MUL
    #define FXAA_REDUCE_MUL   (1.0 / 8.0)
#endif
#ifndef FXAA_SPAN_MAX
    #define FXAA_SPAN_MAX     8.0
#endif
vec4 fxaa(){
    vec4 color_;
    mediump vec2 inverseVP = MAIN_pt;
    vec3 rgbNW = MAIN_texOff(vec2(-1,-1)).xyz;
    vec3 rgbNE = MAIN_texOff(vec2( 1,-1)).xyz;
    vec3 rgbSW = MAIN_texOff(vec2(-1, 1)).xyz;
    vec3 rgbSE = MAIN_texOff(vec2( 1, 1)).xyz;
    vec4 texColor = MAIN_tex(MAIN_pos);
    vec3 rgbM  = texColor.xyz;
    vec3 luma = vec3(0.299, 0.587, 0.114);
    float lumaNW = dot(rgbNW, luma);
    float lumaNE = dot(rgbNE, luma);
    float lumaSW = dot(rgbSW, luma);
    float lumaSE = dot(rgbSE, luma);
    float lumaM  = dot(rgbM,  luma);
    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

    mediump vec2 dir;
    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *
                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);

    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),
              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
              dir * rcpDirMin)) * inverseVP;

    vec3 rgbA = 0.5 * (
        texture(uSampler, MAIN_pos + dir * (1.0 / 3.0 - 0.5)).xyz +
        texture(uSampler, MAIN_pos + dir * (2.0 / 3.0 - 0.5)).xyz);
    vec3 rgbB = rgbA * 0.5 + 0.25 * (
        texture(uSampler, MAIN_pos + dir * -0.5).xyz +
        texture(uSampler, MAIN_pos + dir * 0.5).xyz);

    float lumaB = dot(rgbB, luma);
    if ((lumaB < lumaMin) || (lumaB > lumaMax))
        color_ = vec4(rgbA, texColor.a);
    else
        color_ = vec4(rgbB, texColor.a);
    return color_;
}
void main(){
    color=fxaa();
}
`;

function getVideoCanvas(videoElement){
  return new Promise(async(r0)=>{
    (new Promise(async (r1)=>{
      const video=(typeof videoElement === "string")?(await elementCreated(videoElement)):videoElement;
      if(video.readyState===4)
        r1(video);
      else
        video.addEventListener("loadedmetadata",()=>{r1(video)});
    })).then((video)=>{

      const width=2*video.videoWidth;
      const height=2*video.videoHeight;

      let renderer = new PIXI.Renderer({ width: width, height: height ,antialias: true});
      let canvas= renderer.view;
      let stage = new PIXI.Container();

      let texture= PIXI.Texture.from(video);
      let sprite = new PIXI.Sprite(texture);
      sprite.width=width;
      sprite.height=height;
      stage.addChild(sprite);

      let noiseFilter=new PIXI.filters.NoiseFilter();
      noiseFilter.noise=0.03;
      let blurFilter=new PIXI.filters.BlurFilter(0.3);

      let anime4k_deblur_dog         = new PIXI.Filter(null, anime4k_deblur_dog_frag);
      let cartoon                    = new PIXI.Filter(vertex, cartoon_frag);
      let fxaa                    = new PIXI.Filter(vertex, fxaa_frag);
      let filters=[
                    // blurFilter,
                    anime4k_deblur_dog,
                    cartoon,
                    fxaa,
                    noiseFilter,
                   ];
      stage.filters=filters;
      document.body.addEventListener("keydown",(e)=>{
        if(e&&(e.code==="KeyI")){
          let toggle=!stage.filters[0].enabled;
          for(let i in stage.filters){
            stage.filters[i].enabled=toggle;
          }
          console.log(toggle);
        }
        // console.log(e,e.code)
      });


      let update=(function update_init(){
        return function(){
          let $this = video;
          if (!$this.paused && !$this.ended) {
            renderer.render(stage);
            requestAnimationFrame(update);
          }
        }
      })();

      video.parentNode.insertBefore(canvas,video.nextSibling);

      canvas.height=height;
      canvas.width =width;
      canvas.className+=` ${video.className}`;
      canvas.style.position="absolute";
      canvas.style.top="50%";
      canvas.style.left="50%";
      canvas.style.transform="translate(-50%, -50%)";
      canvas.style.height="100%";
      canvas.style.width="unset";

      video.addEventListener("play",update);
      update();
      r0([video,stage,renderer]);
    });
  });
}
getVideoCanvas("video").then(([video,stage,renderer])=>{
  console.log("anime4k!");
});
