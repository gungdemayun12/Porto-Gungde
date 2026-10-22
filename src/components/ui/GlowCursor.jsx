import { useEffect, useRef } from 'react';
import './GlowCursor.css';

// Lightweight React Bits-inspired glow trail: canvas only wakes while moving/clicking.
export default function GlowCursor({ children, color = '#d4af37', secondaryColor = '#fff1a8', clickBurst = true, enabled = true, className = '', style }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || !enabled || !window.matchMedia('(pointer: fine)').matches) return undefined;
    const ctx = canvas.getContext('2d');
    const points = [];
    const bursts = [];
    let frame = 0;
    let last = 0;
    const resize = () => { const r = root.getBoundingClientRect(); const d = Math.min(devicePixelRatio || 1, 1.5); canvas.width = r.width * d; canvas.height = r.height * d; canvas.style.width = `${r.width}px`; canvas.style.height = `${r.height}px`; ctx.setTransform(d, 0, 0, d, 0, 0); };
    const draw = (time) => {
      frame = 0; const r = root.getBoundingClientRect(); ctx.clearRect(0, 0, r.width, r.height);
      const now = time / 1000; points.splice(0, points.length - 22); bursts.splice(0, bursts.length);
      points.forEach((p, i) => { const age = now - p.t; if (age > 0.65) return; const alpha = (1 - age / 0.65) * (i / points.length); ctx.beginPath(); ctx.strokeStyle = color; ctx.globalAlpha = alpha * 0.8; ctx.lineWidth = 2.5 + i / 8; ctx.shadowBlur = 14; ctx.shadowColor = color; ctx.moveTo(p.x, p.y); const n = points[i + 1]; if (n) ctx.lineTo(n.x, n.y); ctx.stroke(); });
      bursts.forEach(() => {}); ctx.globalAlpha = 1; ctx.shadowBlur = 0; if (points.length) frame = requestAnimationFrame(draw); last = now;
    };
    const wake = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const move = e => { const r = root.getBoundingClientRect(); const x = e.clientX-r.left, y=e.clientY-r.top; if(x>=0&&y>=0&&x<=r.width&&y<=r.height) { points.push({x,y,t:performance.now()/1000}); wake(); } };
    const down = e => { if (!clickBurst) return; const r=root.getBoundingClientRect(); const x=e.clientX-r.left,y=e.clientY-r.top; if(x>=0&&y>=0&&x<=r.width&&y<=r.height){ for(let i=0;i<10;i++) points.push({x:x+Math.cos(i)*i*3,y:y+Math.sin(i)*i*3,t:performance.now()/1000}); wake(); } };
    const ro = new ResizeObserver(resize); ro.observe(root); resize(); root.addEventListener('pointermove', move, {passive:true}); root.addEventListener('pointerdown',down,{passive:true});
    return () => { cancelAnimationFrame(frame); ro.disconnect(); root.removeEventListener('pointermove',move); root.removeEventListener('pointerdown',down); };
  }, [color, clickBurst, enabled]);
  return <div ref={rootRef} className={`glow-cursor ${className}`} style={style}><canvas ref={canvasRef} aria-hidden="true" /> <div className="glow-cursor__content">{children}</div></div>;
}
