import { useEffect, useRef } from 'react';
import './SwarmCursor.css';

export default function SwarmCursor({ children, count = 260, size = 2.2, spread = 90, swirl = 0.6, speed = 1, clickEffect = 'burst', color = '#d4af37', accentColor = '#fff1a8', enabled = true, className = '', style }) {
  const root = useRef(null); const canvas = useRef(null);
  useEffect(() => {
    const el=root.current, cv=canvas.current; if(!el||!cv||!enabled) return;
    const ctx=cv.getContext('2d'); const pts=[]; const pointer={x:0,y:0,inside:false}; let raf=0,last=0;
    const resize=()=>{const r=el.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,1.5);cv.width=r.width*d;cv.height=r.height*d;ctx.setTransform(d,0,0,d,0,0); if(!pts.length) for(let i=0;i<Math.min(count,600);i++){const a=Math.random()*Math.PI*2,rad=Math.random()*spread;pts.push({x:r.width/2+Math.cos(a)*rad,y:r.height/2+Math.sin(a)*rad,vx:0,vy:0,a:Math.random()*6.28});}};
    const move=e=>{const r=el.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;pointer.inside=pointer.x>=0&&pointer.y>=0&&pointer.x<=r.width&&pointer.y<=r.height;if(pointer.inside&&!raf)raf=requestAnimationFrame(draw);};
    const down=e=>{if(clickEffect==='none')return;const r=el.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;pts.forEach(p=>{const dx=p.x-x,dy=p.y-y,d=Math.hypot(dx,dy)||1;if(d<spread*2){const f=(1-d/(spread*2))*260;p.vx+=dx/d*f;p.vy+=dy/d*f;}});if(!raf)raf=requestAnimationFrame(draw);};
    const draw=t=>{raf=0;const r=el.getBoundingClientRect(),dt=Math.min(.033,(t-last)/1000)||.016;last=t;ctx.clearRect(0,0,r.width,r.height);pts.forEach((p,i)=>{if(pointer.inside){const dx=pointer.x-p.x,dy=pointer.y-p.y,d=Math.hypot(dx,dy)||1;const pull=Math.max(0,1-d/spread);p.vx+=dx/d*pull*speed*12+(-dy/d)*swirl*speed*8;p.vy+=dy/d*pull*speed*12+(dx/d)*swirl*speed*8;}else{p.vx+=Math.sin(t*.001+p.a)*.08;p.vy+=Math.cos(t*.0012+p.a)*.08;}p.vx*=.92;p.vy*=.92;p.x+=p.vx*dt*60;p.y+=p.vy*dt*60;if(p.x<0||p.x>r.width)p.vx*=-1;if(p.y<0||p.y>r.height)p.vy*=-1;const active=pointer.inside&&Math.hypot(p.x-pointer.x,p.y-pointer.y)<spread;ctx.fillStyle=active?accentColor:color;ctx.globalAlpha=active?.9:.48;ctx.shadowColor=active?accentColor:'transparent';ctx.shadowBlur=active?8:0;ctx.beginPath();ctx.arc(p.x,p.y,size*(active?1.5:1),0,Math.PI*2);ctx.fill();});ctx.globalAlpha=1;ctx.shadowBlur=0;if(pointer.inside||pts.some(p=>Math.abs(p.vx)+Math.abs(p.vy)>.2))raf=requestAnimationFrame(draw);};
    const ro=new ResizeObserver(resize);ro.observe(el);resize();window.addEventListener('pointermove',move,{passive:true});window.addEventListener('pointerdown',down,{passive:true});return()=>{cancelAnimationFrame(raf);ro.disconnect();window.removeEventListener('pointermove',move);window.removeEventListener('pointerdown',down);};
  },[count,size,spread,swirl,speed,clickEffect,color,accentColor,enabled]);
  return <div ref={root} className={`swarm-cursor ${className}`} style={style}><canvas ref={canvas} className="swarm-cursor-canvas" aria-hidden="true"/><div className="swarm-cursor-content">{children}</div></div>;
}
