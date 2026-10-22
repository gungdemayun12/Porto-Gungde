import { useEffect, useRef } from 'react';
import './ParticleText.css';

// ParticleText-compatible lightweight canvas implementation for the loading intro.
export default function ParticleText({ text = 'GUNGDEV', color = '#d4af37', highlightColor = '#fff1a8', particleSize = 2, density = 5, gatherDuration = 1200, clickBurst = true, className = '', style }) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current; const canvas = root?.querySelector('canvas');
    if (!root || !canvas) return;
    const ctx = canvas.getContext('2d'); let particles = []; let raf; let start = performance.now();
    const resize = () => { const r=root.getBoundingClientRect(), d=Math.min(devicePixelRatio||1,2); canvas.width=r.width*d; canvas.height=r.height*d; ctx.setTransform(d,0,0,d,0,0); const off=document.createElement('canvas'); off.width=r.width; off.height=r.height; const o=off.getContext('2d'); const size=Math.min(72,r.width/Math.max(5,text.length)*1.6); o.font=`800 ${size}px sans-serif`; o.textAlign='center'; o.textBaseline='middle'; o.fillText(text,r.width/2,r.height/2); const data=o.getImageData(0,0,r.width,r.height).data; particles=[]; start = performance.now(); for(let y=0;y<r.height;y+=density) for(let x=0;x<r.width;x+=density) if(data[(y*r.width+x)*4+3]>80) particles.push({x:r.width/2+(Math.random()-.5)*r.width,y:r.height+Math.random()*r.height,tx:x,ty:y,delay:Math.random()*420}); }; const draw=now=>{ const r=root.getBoundingClientRect(), elapsed=now-start; ctx.clearRect(0,0,r.width,r.height); let moving=false; particles.forEach(a=>{const p=Math.min(1,Math.max(0,(elapsed-a.delay)/gatherDuration)); const e=1-Math.pow(1-p,3); a.x+=(a.tx-a.x)*(.035+.065*e); a.y+=(a.ty-a.y)*(.035+.065*e); ctx.fillStyle=p<1?highlightColor:color; ctx.globalAlpha=.2+.8*Math.min(1,e); ctx.beginPath();ctx.arc(a.x,a.y,particleSize,0,Math.PI*2);ctx.fill(); if(p<1||Math.abs(a.x-a.tx)>0.5||Math.abs(a.y-a.ty)>0.5)moving=true;}); ctx.globalAlpha=1; if(moving) raf=requestAnimationFrame(draw);}; const ro=new ResizeObserver(resize); ro.observe(root); resize(); raf=requestAnimationFrame(draw); return()=>{cancelAnimationFrame(raf);ro.disconnect();}; },[text,color,highlightColor,particleSize,density,gatherDuration]);
  return <div ref={ref} className={`particle-text ${className}`} style={style}><canvas className="particle-text__canvas"/><span className="particle-text__sr">{text}</span></div>;
}
