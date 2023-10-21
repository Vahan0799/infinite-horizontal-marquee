/**
 * Infinite Marquee 1.0.0
 * Infinite Horizontal & Vertical Marquee animation based on CSS and controlled with JS
 *
 * Copyright 2023 Vahan Baghdasaryan
 *
 * Released under the MIT License
 *
 * Released on: October 21, 2023
 */


export default class InfiniteMarquee{constructor(e={}){this.element="string"==typeof e.element?[...document.querySelectorAll(e.element)]:e.element,this.direction=e.direction||"left",this.gap=e.gap||"0px",this.speed=e.speed||1e4,this.smoothEdges=e.smoothEdges||!1,this.fullContainer=e.fullContainer||!0,this.pauseOnHover=e.pauseOnHover||!1,this.duplicateCount=e.duplicateCount||1,this.breakpointSize=e.breakpointSize||991.8,this.mobileSettings=e.mobileSettings||{},this.on={beforeInit:e.on&&e.on.beforeInit||null,afterInit:e.on&&e.on.afterInit||null,pauseAnimation:e.on&&e.on.pauseAnimation||null,resumeAnimation:e.on&&e.on.resumeAnimation||null},this.scrollType="top"===e.direction||"bottom"===e.direction?"vertical":"horizontal",this.isPaused=!1,this.init()}init(){if(("undefined"!=typeof window||"undefined"!=typeof document)&&(Array.isArray(this.element)?this.element.length>0:this.element)){if("function"==typeof this.on.beforeInit&&this.on.beforeInit(),Array.isArray(this.element))for(const e of this.element)this.configureChildNodes(e),this.configureAnimationOptions(e);else this.configureChildNodes(this.element),this.configureAnimationOptions(this.element);"function"==typeof this.on.afterInit&&this.on.afterInit()}}configureChildNodes(e){const t=document.createElement("div");for(t.classList.add(`${this.scrollType}-marquee-inner`);e.firstChild;)t.appendChild(e.firstChild);e.classList.add(`${this.scrollType}-marquee`),e.appendChild(t),this.duplicateOriginalNodes(t),this.duplicateContainer(e)}duplicateOriginalNodes(e){const t=e.children,i=[];for(let e=0;e<t.length;e++){const s=t[e].cloneNode(!0);s.setAttribute("aria-hidden",!0),i.push(s)}for(const t of i)e.appendChild(t)}duplicateContainer(e){const t=e.querySelector(`.${this.scrollType}-marquee-inner`),i=t.cloneNode(!0);i.setAttribute("aria-hidden",!0);const s=i.children;for(let e=0;e<s.length;e++)s[e].removeAttribute("aria-hidden");const n="vertical"===this.scrollType?this.duplicateCount+1:this.duplicateCount,o=Array.from({length:n},(()=>i.cloneNode(!0)));if(e.append(...o),"vertical"===this.scrollType){const i=e.clientHeight-t.clientHeight;e.style.setProperty("--_containerSize",`${i}px`)}}configureAnimationOptions(e){const t=window.matchMedia(`(max-width: ${this.breakpointSize}px)`),i=e=>{e.addEventListener("mouseenter",(()=>this.pause(e))),e.addEventListener("mouseleave",(()=>this.resume(e)))},s=()=>{const s=this.mobileSettings.direction||this.direction,n="right"===s||"bottom"===s,o="right"===this.direction||"bottom"===this.direction,r=t.matches?n?"reverse":"forwards":o?"reverse":"forwards",a=t.matches&&this.mobileSettings.speed||this.speed,l=t.matches&&this.mobileSettings.gap||this.gap;e.style.setProperty("--_speed",`${a}ms`),e.style.setProperty("--_gap",l),e.style.setProperty("--_direction",r),this.smoothEdges&&e.classList.add("smooth"),this.pauseOnHover&&i(e),this.fullContainer&&e.classList.add("full")};s(),window.addEventListener("resize",s)}pause(e){(e||this.element).classList.add("paused"),this.isPaused=!0,"function"==typeof this.on.pauseAnimation&&this.on.pauseAnimation()}resume(e){(e||this.element).classList.remove("paused"),this.isPaused=!1,"function"==typeof this.on.resumeAnimation&&this.on.resumeAnimation()}isAnimationPaused(){return this.isPaused}}
