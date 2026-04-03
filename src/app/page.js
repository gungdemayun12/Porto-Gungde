"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import {
  ArrowRight, Rocket, Github, Linkedin, Mail,
  BookOpen, GraduationCap, X, ExternalLink, ChevronLeft, ChevronRight,
  Globe, Terminal, Cpu, Layers, Send, ZoomIn, ZoomOut, Sun, Moon, Filter,
} from "lucide-react";
import {
  SiHtml5, SiNextdotjs,
  SiMysql, SiPhp, SiLaravel, SiTailwindcss, SiWordpress, SiBootstrap,
  SiGithub, SiGit,
} from "react-icons/si";
import { FaFileExcel, FaFileWord, FaFilePowerpoint, FaPaintBrush, FaDatabase } from "react-icons/fa";
import { Anton } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: "400" });


function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}


function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    const initial = saved || "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("portfolio-theme", next);
      document.body.classList.add("theme-transition");
      setTimeout(() => document.body.classList.remove("theme-transition"), 400);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}


function StaggerReveal({ children, className = "", delay = 0, stagger = 80 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${delay + i * stagger}ms, transform 0.5s ease ${delay + i * stagger}ms`,
              }}
            >
              {child}
            </div>
          ))
        : <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
          }}>
            {children}
          </div>
      }
    </div>
  );
}


function LanyardCard() {
  const cardRef = useRef(null);
  const springY = useSpring(148, { stiffness: 200, damping: 18, mass: 1.2 });
  const ropeLeft = useSpring(0, { stiffness: 260, damping: 22 });
  const ropeRight = useSpring(0, { stiffness: 260, damping: 22 });
  const [displayY, setDisplayY] = useState(148);
  const [isDragging, setIsDragging] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const velocityRef = useRef(0);
  const prevYRef = useRef(148);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return springY.on("change", (v) => {
      setDisplayY(v);
      const dt = v - prevYRef.current;
      velocityRef.current = dt;
      prevYRef.current = v;
    });
  }, [springY]);

  const nailX = 110;
  const nailY = 8;
  const cardTopY = displayY;
  const leftAttachX = 75;
  const rightAttachX = 145;
  const displacement = Math.max(0, cardTopY - 148);

  const gravitySag = displacement * 0.35;
  const leftSway = displacement * 0.08;
  const rightSway = -displacement * 0.08;

  const midLeftX = nailX - 15 + leftSway;
  const midLeftY = nailY + 30 + gravitySag * 0.5;
  const endLeftX = leftAttachX + displacement * 0.03;
  const endLeftY = cardTopY - gravitySag * 0.15;

  const midRightX = nailX + 15 + rightSway;
  const midRightY = nailY + 30 + gravitySag * 0.5;
  const endRightX = rightAttachX + displacement * 0.03;
  const endRightY = cardTopY - gravitySag * 0.15;

  const leftRopePath = `M ${nailX} ${nailY} C ${midLeftX} ${midLeftY}, ${endLeftX - 5} ${endLeftY - 10}, ${leftAttachX} ${cardTopY}`;
  const rightRopePath = `M ${nailX} ${nailY} C ${midRightX} ${midRightY}, ${endRightX + 5} ${endRightY - 10}, ${rightAttachX} ${cardTopY}`;

  const cardBg = isDark
    ? "linear-gradient(160deg, #0d0d0d 0%, #111 60%, #0a1a0a 100%)"
    : "linear-gradient(160deg, #ffffff 0%, #f8faf8 60%, #f0f8f0 100%)";
  const cardBorder = isDark ? "rgba(34,211,238,0.35)" : "rgba(34,211,238,0.4)";
  const cardShadow = isDark
    ? "0 0 30px rgba(34,211,238,0.12), 0 20px 60px rgba(0,0,0,0.5)"
    : "0 4px 20px rgba(0,0,0,0.1), 0 0 20px rgba(34,211,238,0.08)";
  const headerBg = isDark ? "rgba(34,211,238,0.08)" : "rgba(34,211,238,0.06)";
  const headerBorder = isDark ? "rgba(34,211,238,0.2)" : "rgba(34,211,238,0.25)";
  const nameColor = isDark ? "#ffffff" : "#1a1a2e";
  const labelColor = isDark ? "rgba(34,211,238,0.6)" : "rgba(30,120,10,0.6)";
  const barcodeOpacity = isDark ? 0.25 : 0.15;
  const idCodeColor = isDark ? "rgba(34,211,238,0.3)" : "rgba(30,120,10,0.25)";
  const nailBg = isDark ? "linear-gradient(135deg, #1a1a1a, #0d0d0d)" : "linear-gradient(135deg, #e0e0e0, #ccc)";
  const connectorFill = isDark ? "#1a1a1a" : "#e8e8e8";
  const dragTextColor = isDark ? "rgba(34,211,238,0.4)" : "rgba(30,120,10,0.5)";

  return (
    <div className="relative flex flex-col items-center select-none" style={{ width: 220, height: 600 }}>
      <div className="absolute z-30 flex flex-col items-center" style={{ top: 0, left: "50%", transform: "translateX(-50%)" }}>
        <div
          style={{
            width: 16, height: 8,
            background: "rgba(34,211,238,0.25)",
            border: "1px solid rgba(34,211,238,0.6)",
            borderRadius: "4px 4px 0 0",
          }}
        />
        <div
          style={{
            width: 18, height: 18, borderRadius: "50%",
            background: nailBg,
            border: "2px solid rgba(34,211,238,0.7)",
            marginTop: -4,
          }}
        />
      </div>

      <svg
        width="220" height="600" viewBox="0 0 220 600"
        className="absolute top-0 left-0 pointer-events-none z-10"
        style={{ overflow: "visible" }}
      >
        <path d={leftRopePath} fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
        <path d={rightRopePath} fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
        <rect x="87" y={cardTopY - 8} width="46" height="9" rx="3" fill={connectorFill} stroke="#22d3ee" strokeWidth="1.5" />
      </svg>

      <motion.div
        ref={cardRef}
        drag="y"
        dragConstraints={{ top: 148, bottom: 360 }}
        dragElastic={0.4}
        dragMomentum={true}
        dragTransition={{
          bounceStiffness: 180,
          bounceDamping: 14,
          power: 0.6,
          timeConstant: 200,
        }}
        style={{
          y: displayY - 148,
          marginTop: 148,
          position: "relative",
          zIndex: 20,
        }}
        onDragStart={() => {
          setIsDragging(true);
          springY.stop();
        }}
        onDrag={(_, info) => {
          const newY = 148 + info.offset.y;
          springY.set(newY);
        }}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          const velocity = info.velocity.y;
          const overshoot = velocity * 0.15;
          springY.set(148 + overshoot);
          setTimeout(() => {
            springY.set(148);
          }, 80);
        }}
        whileDrag={{ scale: 1.04, rotate: 0.5 }}
        className="lanyard-card"
      >
        <div
          className="w-[220px] rounded-2xl overflow-hidden border"
          style={{
            background: cardBg,
            borderColor: cardBorder,
            boxShadow: cardShadow,
            transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <div className="px-4 py-2 flex items-center justify-between"
            style={{ background: headerBg, borderBottom: `1px solid ${headerBorder}` }}
          >
            <span className="text-[10px] font-bold text-[#22d3ee] tracking-widest" style={{ fontFamily: "'Orbitron', monospace" }}>
              ID CARD
            </span>
          </div>

          <div className="p-4 flex flex-col items-center gap-3">
            <div className="relative w-[90px] h-[90px] rounded-xl overflow-hidden"
              style={{ border: "2px solid rgba(34,211,238,0.5)" }}
            >
              <Image src="/profil.jpg" alt="Gungdemayun" fill className="object-cover" priority />
            </div>

            <div className="text-center space-y-1">
              <div className="text-[11px] tracking-widest" style={{ fontFamily: "'Orbitron', monospace", color: labelColor }}>
                FULL NAME
              </div>
              <div className="font-bold text-base leading-tight" style={{ color: nameColor }}>Gung Demayun</div>
              <div className="text-[10px] text-[#22d3ee] tracking-wide font-medium">
                Tech Enthusiast
              </div>
            </div>

            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest"
              style={{
                background: "rgba(34,211,238,0.08)",
                border: "1px solid rgba(34,211,238,0.4)",
                color: "#22d3ee",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
              Open To Work
            </div>

            <div className="w-full pt-1">
              <div className="flex gap-[2px] justify-center h-6" style={{ opacity: barcodeOpacity }}>
                {Array.from({ length: 28 }).map((_, i) => (
                  <div key={i} className="bg-[#22d3ee]" style={{ width: i % 3 === 0 ? 3 : 1, height: "100%" }} />
                ))}
              </div>
              <div className="text-center text-[8px] tracking-[0.2em] mt-1" style={{ color: idCodeColor }}>
                IBIT-2026-GM
              </div>
            </div>
          </div>
        </div>

        {!isDragging && (
          <div className="text-center mt-2 text-[10px] tracking-wide animate-pulse" style={{ color: dragTextColor }}>
            {"drag me"}
          </div>
        )}
      </motion.div>
    </div>
  );
}


function ImageLightbox({ images, initialIndex, onClose }) {
  const [imgIdx, setImgIdx] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  const resetZoom = () => { setZoom(1); };
  const prev = () => { setImgIdx((i) => (i - 1 + images.length) % images.length); resetZoom(); };
  const next = () => { setImgIdx((i) => (i + 1) % images.length); resetZoom(); };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.95)" }}
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-xl border border-[rgba(34,211,238,0.3)] hover:border-[#22d3ee] hover:bg-[rgba(34,211,238,0.1)] transition-all">
        <X className="w-5 h-5 text-[#22d3ee]" />
      </button>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        <button onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(z - 0.5, 1)); }}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-[rgba(34,211,238,0.3)] hover:border-[#22d3ee] hover:bg-[rgba(34,211,238,0.1)] transition-all">
          <ZoomOut className="w-4 h-4 text-[#22d3ee]" />
        </button>
        <span className="text-[#22d3ee] text-xs font-bold px-2">{Math.round(zoom * 100)}%</span>
        <button onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(z + 0.5, 4)); }}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-[rgba(34,211,238,0.3)] hover:border-[#22d3ee] hover:bg-[rgba(34,211,238,0.1)] transition-all">
          <ZoomIn className="w-4 h-4 text-[#22d3ee]" />
        </button>
      </div>

      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(34,211,238,0.4)] bg-black/60 hover:bg-[rgba(34,211,238,0.1)] transition-all">
            <ChevronLeft className="w-5 h-5 text-[#22d3ee]" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(34,211,238,0.4)] bg-black/60 hover:bg-[rgba(34,211,238,0.1)] transition-all">
            <ChevronRight className="w-5 h-5 text-[#22d3ee]" />
          </button>
        </>
      )}

      <div onClick={(e) => e.stopPropagation()} className="relative flex items-center justify-center" style={{ maxWidth: "calc(100vw - 120px)", maxHeight: "calc(100vh - 120px)" }}>
        <img
          src={images[imgIdx]}
          alt="Project screenshot"
          style={{
            maxWidth: "100%", maxHeight: "calc(100vh - 120px)",
            objectFit: "contain", borderRadius: "12px",
            transform: `scale(${zoom})`,
            transition: "transform 0.2s ease",
          }}
          draggable={false}
        />
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setImgIdx(i); resetZoom(); }}
              className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? "bg-[#22d3ee]" : "bg-white/30"}`} />
          ))}
        </div>
      )}
    </div>
  );
}


function ProjectModal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    if (lightboxOpen) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleKey); };
  }, [onClose, lightboxOpen]);

  const images = project.images || [];
  const videos = project.videos || [];

  const handlePlay = () => {
    if (previewRef.current) {
      previewRef.current.muted = false;
      previewRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handlePause = () => {
    if (previewRef.current) {
      previewRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 modal-backdrop" onClick={onClose}>
        <div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl border"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-color)",
            boxShadow: "var(--shadow-card-hover)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-lg border border-[rgba(34,211,238,0.3)] hover:border-[#22d3ee] hover:bg-[rgba(34,211,238,0.1)] transition-all">
            <X className="w-4 h-4 text-[#22d3ee]" />
          </button>

          {videos.length > 0 && (
            <div className="relative w-full h-52 sm:h-64 rounded-t-2xl overflow-hidden bg-black">
              <video
                ref={previewRef}
                key={`video-${imgIdx}`}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                preload="metadata"
                muted
              >
                <source src={videos[imgIdx]?.src} type="video/mp4" />
              </video>
              {!isPlaying && (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-[#22d3ee]/90 flex items-center justify-center hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </button>
              )}
              {videos.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); handlePause(); setImgIdx((imgIdx - 1 + videos.length) % videos.length); setIsPlaying(false); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 border border-[rgba(34,211,238,0.4)] rounded-full flex items-center justify-center hover:bg-[rgba(34,211,238,0.1)] transition-all z-10">
                    <ChevronLeft className="w-4 h-4 text-[#22d3ee]" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handlePause(); setImgIdx((imgIdx + 1) % videos.length); setIsPlaying(false); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 border border-[rgba(34,211,238,0.4)] rounded-full flex items-center justify-center hover:bg-[rgba(34,211,238,0.1)] transition-all z-10">
                    <ChevronRight className="w-4 h-4 text-[#22d3ee]" />
                  </button>
                </>
              )}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {videos.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); handlePause(); setImgIdx(i); setIsPlaying(false); }}
                    className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? "bg-[#22d3ee]" : "bg-white/40"}`} />
                ))}
              </div>
            </div>
          )}

          <div className="p-6 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-6 bg-[#22d3ee] rounded-full" />
                <h3 className="text-2xl font-bold" style={{ fontFamily: "'Orbitron', monospace", letterSpacing: "0.04em", color: "var(--text-primary)" }}>
                  {project.title}
                </h3>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{project.longDesc}</p>

            <div>
              <div className="text-[11px] text-[#22d3ee] tracking-widest mb-2 font-semibold">TECH STACK</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-semibold rounded-full"
                    style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.3)", color: "#22d3ee" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {videos.length > 0 && (
              <div>
                <div className="flex gap-2 flex-wrap">
                  {videos.map((vid, i) => (
                    <div key={i}
                      className="relative w-20 h-14 rounded-lg overflow-hidden cursor-pointer border transition-all"
                      style={{ borderColor: i === imgIdx ? "rgba(34,211,238,0.8)" : "rgba(34,211,238,0.15)" }}
                      onClick={() => { setImgIdx(i); setIsPlaying(false); }}
                    >
                      <video className="w-full h-full object-cover" preload="none">
                        <source src={vid.src} type="video/mp4" />
                      </video>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[rgba(34,211,238,0.3)] text-[#22d3ee] hover:border-[#22d3ee] hover:bg-[rgba(34,211,238,0.1)] transition-all">
                  <Github className="w-4 h-4" /> Source Code
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold neon-btn-solid">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <ImageLightbox images={images} initialIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
}


const PROJECTS = [
  {
    title: "POS Cashier System for SMEs",
    desc: "A digital Point of Sale (POS) system designed to help small and medium businesses manage transactions and monitor revenue efficiently.",
    longDesc: "A web-based Point of Sale (POS) system developed as a digital solution for small and medium enterprises (SMEs) to replace manual cashier processes. The system streamlines transaction recording, product management, and sales monitoring within an integrated platform.\n\nDesigned to improve operational efficiency, the application enables business owners to manage daily transactions digitally while maintaining structured financial records and real-time business performance tracking.",
    tech: ["Laravel", "JavaScript", "Tailwind CSS", "MySQL"],
    github: "https://github.com/gungdemayun12/POS_Sistem.git",
    images: ["/pos1.webp","/pos2.webp","/pos3.webp","/pos4.webp","/pos5.webp","/pos6.webp","/pos7.webp","/pos8.webp","/pos9.webp","/pos10.webp"],
    videos: [
      { src: "/videoes/pos system.mp4" },
    ],
    category: "Full-Stack / POS",
    type: "Website",
  },
  {
    title: "Clothing E-Commerce Website",
    desc: "A full-stack clothing e-commerce platform for remote product ordering and comprehensive business management.",
    longDesc: "A full-stack clothing e-commerce web application built with Laravel and Blade. The platform enables customers to order fashion products remotely through a structured and user-friendly shopping experience, while providing administrators with a centralized system for managing and monitoring overall e-commerce operations.",
    tech: ["Laravel", "Blade", "Tailwind CSS", "JavaScript", "MySQL"],
    github: "https://github.com/gungdemayun12/Website-ECommerce.git",
    images: ["/ecommerce1.webp","/ecommerce2.webp","/ecommerce3.webp","/ecommerce4.webp","/ecommerce5.webp","/ecommerce6.webp","/ecommerce7.webp","/ecommerce8.webp","/ecommerce9.webp"],
    category: "Full-Stack / E-Commerce",
    type: "Website",
  },
  {
    title: "Phone Repair Queue System",
    desc: "A digital queue management system designed to streamline customer flow and service operations in phone repair shops.",
    longDesc: "A web-based queue management system developed to optimize service flow in mobile phone repair shops. The system allows customers to take queue numbers digitally and monitor their position in line through an integrated tracking mechanism.",
    tech: ["Laravel","Blade", "JavaScript", "Tailwind CSS", "MySQL"],
    github: "https://github.com/gungdemayun12/Service-Queue.git",
    images: ["/queue service system"],
    videos: [
      { src: "/videoes/queue service system.mp4" },
    ],
    category: "Full-Stack / Queue System",
    type: "Website",
  },
  {
    title: "Gym Management System",
    desc: "A web-based gym management system designed to help fitness centers manage members, membership packages, and revenue efficiently.",
    longDesc: "A web-based Gym Management System developed to streamline daily operations in fitness centers and gyms. The platform provides an integrated solution for managing gym members, membership packages, and overall business revenue within a centralized management system.\n\nAdministrators can register and manage member data, organize different gym membership packages, and monitor income generated from subscriptions and services. The system helps gym owners maintain structured member records while gaining clear insights into business performance and operational activity.\n\nTo enhance usability and user experience, the application also includes a Dark Mode feature that allows users to switch between light and dark interface themes, providing a more comfortable visual experience during extended use.",
    tech: ["Laravel","Blade", "JavaScript", "Tailwind CSS", "MySQL"],
    github: "https://github.com/gungdemayun12/gym-management.git",
    images: ["/gym management system"],
    videos: [
      { src: "/videoes/gym management system.mp4" },
    ],
    category: "Full-Stack / Management System",
    type: "Website",
  },
  {
    title: "Mai Kebali Tour Website",
    desc: "A Bali tour and wedding booking website designed to promote and sell travel packages with integrated online checkout.",
  longDesc: "Mai Kebali Tour is a tourism-focused website developed to promote and sell Bali tour packages and wedding services. Built using WordPress with the Elementor page builder, the platform provides an engaging browsing experience where customers can explore available packages, view detailed information, and complete bookings directly through the website, supported by a seamless online checkout system that enables secure and convenient payments, ultimately enhancing user experience and streamlining the overall booking process.",
    tech: ["WordPress", "Elementor"],
    github: null,
    demo: "https://maikebalitour.com/",
    images: ["/maikebalitour"],
    videos: [
      { src: "/videoes/maikebalitour.mp4" },
    ],
    category: "CMS / Tourism",
    type: "Website",
  },
  {
    title: "Portfolio Website",
    desc: "A personal portfolio website with futuristic design, interactive animations, and a fully responsive layout.",
    longDesc: "A personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion. Features a futuristic design with a cyan theme and matrix background effect. Key features include: an interactive ID card with a draggable lanyard effect, typing animation effect, an about me section with an education timeline, a project showcase with detail modals, and a contact page.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "JavaScript"],
    github: "https://github.com/gungdemayun12/Porto-Gungde.git",
   images: ["/portofolio"],
    videos: [
      { src: "/videoes/portofolio.mp4" },
    ],
    category: "Frontend / Portfolio",
    type: "Website",
  },
  {
    title: "Tour Car Charter Bali",
    desc: "A full-stack car charter and tour booking platform for Bali with comprehensive admin dashboard, customer management, and booking system.",
    longDesc: "Tour Car Charter Bali is a full-stack web application built with Laravel, JavaScript, and Tailwind CSS that provides a complete solution for car charter and tour services in Bali. The platform features a powerful admin dashboard with real-time booking management, customer profiles, revenue analytics, fleet management, and driver scheduling.\n\nCustomers can browse available tour packages, check pricing, make bookings, manage their profiles, and receive digital receipts. The admin panel includes advanced features such as booking calendar overview, customer database, financial reports, tour package management, and driver assignment — all designed to streamline operations for tour businesses.",
    tech: ["Laravel", "JavaScript", "Tailwind CSS", "MySQL", "Blade"],
    github: "https://github.com/gungdemayun12/tour-car-charter-bali.git",
    images: ["/portofolio.webp"],
    videos: [
      { src: "/videoes/landing page.mp4", poster: null, label: "Landing Page" },
      { src: "/videoes/booking process.mp4", poster: null, label: "Booking Process" },
      { src: "/videoes/admin panel.mp4", poster: null, label: "Admin Panel" },
      { src: "/videoes/customer dashboard.mp4", poster: null, label: "Customer Dashboard" },
      { src: "/videoes/page.mp4", poster: null, label: "Page" },
    ],
    category: "Full-Stack / Tourism",
    type: "Website",
  },
  {
    title: "Finance Tracker App",
    desc: "A Flutter-based financial recording app for tracking income and expenses with visual charts, multi-currency support, and profile management.",
    longDesc: "A comprehensive personal finance tracking application built with Flutter. The app allows users to record daily income and expenses with detailed categorization, view financial trends through interactive line charts, and compare income vs. spending with visual breakdowns.\n\nKey features include: income and expense recording with category tags, line chart visualization for financial trends, income-expense comparison reports, multi-currency support, multi-language settings, user profile management, and data export capabilities. The app provides a clean and intuitive interface that makes personal finance management effortless.",
    tech: ["Flutter", "Dart", "SQLite", "Chart.js"],
    github: "https://github.com/gungdemayun12/flutter-aplikasi-pencatatan-keuangan.git",
    images: ["/portofolio.webp"],
    category: "Mobile / Finance",
    type: "Mobile App",
  },
  {
    title: "Tour Business Card",
    desc: "A digital business card showcasing tour company profile with services, contact info, and social links — built with HTML and Tailwind CSS.",
    longDesc: "A clean and professional digital business card designed to present a tour company's brand identity in a compact, modern format. Built with HTML and Tailwind CSS, the card features the company's logo, services overview, contact information, location, and social media links — all laid out in a visually appealing single-page design.\n\nThe business card serves as a quick digital introduction for potential clients, making it easy to share company details via link or QR code. Its lightweight and responsive design ensures it looks great on any device, from phones to desktops.",
    tech: ["HTML", "Tailwind CSS"],
    github: "https://github.com/gungdemayun12/Business-Card-.git",
    img: "/businesscard.png",
    images: ["/businesscard"],
    videos: [
      { src: "/videoes/businesscard.mp4" },
    ],
    category: "Frontend / Business Card",
    type: "Website",
  },
];

const DIGITAL_SKILLS = [
  { icon: <SiNextdotjs className="text-gray-800 dark:text-white" />, name: "Next.js" },
  { icon: <SiHtml5 className="text-orange-500" />, name: "HTML" },
  { icon: <SiLaravel className="text-red-500" />, name: "Laravel" },
  { icon: <SiPhp className="text-indigo-400" />, name: "PHP Native" },
  { icon: <SiTailwindcss className="text-cyan-400" />, name: "Tailwind CSS" },
  { icon: <SiBootstrap className="text-purple-500" />, name: "Bootstrap" },
  { icon: <SiMysql className="text-blue-400" />, name: "MySQL" },
  { icon: <SiWordpress className="text-blue-300" />, name: "WordPress" },
  { icon: <SiGithub className="text-gray-700 dark:text-white" />, name: "GitHub" },
  { icon: <SiGit className="text-orange-500" />, name: "Git" },
];

const OFFICE_SKILLS = [
  { icon: <FaFileExcel className="text-green-500" />, name: "Ms Excel" },
  { icon: <FaFileWord className="text-blue-400" />, name: "Ms Word" },
  { icon: <FaFilePowerpoint className="text-orange-400" />, name: "PowerPoint" },
  { icon: <FaPaintBrush className="text-cyan-300" />, name: "Canva" },
  { icon: <FaDatabase className="text-yellow-400" />, name: "Pentaho" },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#4285F4"/>
        <path d="M12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5S15.03 6.5 12 6.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5S10.07 8.5 12 8.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="#34A853"/>
        <path d="M7.5 12c0-2.49 2.01-4.5 4.5-4.5V5c-3.87 0-7 3.13-7 7h2.5z" fill="#FBBC05"/>
        <path d="M12 19c3.87 0 7-3.13 7-7h-2.5c0 2.49-2.01 4.5-4.5 4.5V19z" fill="#EA4335"/>
      </svg>
    ),
    name: "Looker Studio",
  },
];

const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 97}%`,
  top: `${(i * 23 + 11) % 95}%`,
  delay: `${(i * 0.6) % 5}s`,
  duration: `${8 + (i * 0.7) % 6}s`,
}));


function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "var(--bg-secondary)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--divider)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#home" className="text-lg font-bold" style={{ color: "#22d3ee", fontFamily: "'Orbitron', monospace" }}>
          GD<span style={{ color: "var(--text-primary)" }}>.</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}
              className="text-sm font-medium transition-colors hover:text-[#22d3ee]"
              style={{ color: "var(--text-secondary)" }}>
              {link.label}
            </a>
          ))}
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            <div className="theme-toggle-knob">
              {theme === "light" ? <Moon className="w-3 h-3 text-black" /> : <Sun className="w-3 h-3 text-black" />}
            </div>
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            <div className="theme-toggle-knob">
              {theme === "light" ? <Moon className="w-3 h-3 text-black" /> : <Sun className="w-3 h-3 text-black" />}
            </div>
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="w-10 h-10 flex items-center justify-center rounded-lg"
            style={{ background: "var(--badge-bg)", border: "1px solid var(--border-color)" }}>
            <div className="flex flex-col gap-1">
              <span className={`block w-5 h-0.5 rounded transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} style={{ background: "var(--text-primary)" }} />
              <span className={`block w-5 h-0.5 rounded transition-all ${mobileOpen ? "opacity-0" : ""}`} style={{ background: "var(--text-primary)" }} />
              <span className={`block w-5 h-0.5 rounded transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} style={{ background: "var(--text-primary)" }} />
            </div>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-4 pb-4" style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--divider)" }}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium transition-colors hover:text-[#22d3ee]"
              style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--divider)" }}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}


export default function Home() {
  const words = ["Tech Enthusiast"];
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Website");
  const [activeSubFilter, setActiveSubFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { theme, toggleTheme } = useTheme();
  useScrollReveal();

  const websiteSubFilters = ["All", "POS", "E-Commerce", "Queue", "Management", "CMS", "Portfolio", "Tourism", "Business Card"];
  const mobileAppSubFilters = ["All", "E-Commerce", "Tourism", "Fitness", "Finance"];

  const currentSubFilters = activeCategory === "Website" ? websiteSubFilters : mobileAppSubFilters;

  const filteredProjects = PROJECTS.filter((p) => {
    if (p.type !== activeCategory) return false;
    if (activeSubFilter === "All") return true;
    const cat = p.category.toLowerCase().replace("-", " ");
    const filter = activeSubFilter.toLowerCase().replace("-", " ");
    return cat.includes(filter);
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const typeSpeed = isDeleting ? 80 : 130;
    const currentWord = words[wordIndex];
    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentWord.length) {
        setDisplayedText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayedText(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      }
    }, typeSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <div className="min-h-screen relative overflow-x-hidden matrix-bg">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

     
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="glow-orb" style={{ top: "20%", left: "20%", width: 400, height: 400, background: "#22d3ee", opacity: theme === "dark" ? 0.03 : 0.02 }} />
        <div className="glow-orb" style={{ bottom: "20%", right: "20%", width: 400, height: 400, background: "#22d3ee", opacity: theme === "dark" ? 0.02 : 0.015 }} />
      </div>

    
      <div className="particles-container fixed inset-0 overflow-hidden pointer-events-none z-0">
        {PARTICLES.map((p) => (
          <div key={p.id} className="particle" style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration }} />
        ))}
      </div>

      <section id="home" className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16 z-10">
        <div className="max-w-6xl mx-auto w-full">
        
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div className="space-y-7 reveal-left">
              <div>
                <p className="text-lg mb-1" style={{ color: "var(--text-muted)" }}>{"Hello, I'm"}</p>
                <h1 className="text-5xl xl:text-6xl font-extrabold leading-tight" style={{ fontFamily: "'Orbitron', monospace", color: "var(--text-primary)" }}>
                  Gung<br />
                  <span style={{ color: "#22d3ee" }}>Demayun</span>
                </h1>
              </div>

              <div className="flex items-center gap-3 text-2xl">
                <Terminal className="w-6 h-6 text-[#22d3ee]" />
                <span className="text-[#22d3ee] font-bold typing-cursor">{displayedText}</span>
              </div>

              <p className="text-base leading-relaxed max-w-lg" style={{ color: "var(--text-secondary)" }}>
                {"I build "}
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>high-performance</span>
                {" digital products — from "}
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>web apps</span>
                {" to "}
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>mobile solutions</span>
                {". Let's turn your vision into something extraordinary."}
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="neon-btn-solid flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold tracking-wide">
                  <Rocket className="w-4 h-4" /> VIEW PROJECTS <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="neon-btn flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold tracking-wide">
                  GET IN TOUCH <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-3">
                {[
                  { href: "https://github.com/gungdemayun12", icon: <Github className="w-5 h-5" /> },
                  { href: "https://linkedin.com", icon: <Linkedin className="w-5 h-5" /> },
                  { href: "mailto:gungdemayun64@gmail.com", icon: <Mail className="w-5 h-5" /> },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-xl border transition-all hover:text-[#22d3ee] hover:border-[#22d3ee] hover:bg-[rgba(34,211,238,0.08)]"
                    style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-start justify-center -mt-8 reveal-scale">
              <LanyardCard />
            </div>
          </div>

          <div className="lg:hidden flex flex-col items-center text-center" style={{ gap: "16px" }}>
            <div className="flex flex-col items-center reveal-scale" style={{ transform: "scale(0.72)", transformOrigin: "top center", marginTop: "-40px", marginBottom: "-130px" }}>
              <LanyardCard />
            </div>

            <div className="reveal">
              <p className="text-lg mb-1" style={{ color: "var(--text-muted)" }}>{"Hello, I'm"}</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight" style={{ fontFamily: "'Orbitron', monospace", color: "var(--text-primary)" }}>
                Gung<br />
                <span style={{ color: "#22d3ee" }}>Demayun</span>
              </h1>
            </div>

            <div className="flex items-center justify-center gap-2 text-xl reveal">
              <Terminal className="w-5 h-5 text-[#22d3ee]" />
              <span className="text-[#22d3ee] font-bold typing-cursor">{displayedText}</span>
            </div>

            <p className="text-sm leading-relaxed max-w-sm reveal" style={{ color: "var(--text-secondary)" }}>
              {"I build "}
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>high-performance</span>
              {" digital products — from "}
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>web apps</span>
              {" to "}
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>mobile solutions</span>
              {"."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs reveal">
              <a href="#projects" className="neon-btn-solid flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide w-full">
                <Rocket className="w-4 h-4" /> VIEW PROJECTS
              </a>
              <a href="#contact" className="neon-btn flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide w-full">
                CONTACT ME
              </a>
            </div>

            <div className="flex items-center gap-3 reveal">
              {[
                { href: "https://github.com/gungdemayun12", icon: <Github className="w-5 h-5" /> },
                { href: "https://linkedin.com", icon: <Linkedin className="w-5 h-5" /> },
                { href: "mailto:gungdemayun64@gmail.com", icon: <Mail className="w-5 h-5" /> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-xl border transition-all hover:text-[#22d3ee] hover:border-[#22d3ee] hover:bg-[rgba(34,211,238,0.08)]"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

  
      <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }} />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className={`${anton.className} text-4xl sm:text-5xl font-bold section-heading`} style={{ color: "var(--text-primary)" }}>
              About <span style={{ color: "#22d3ee" }}>Me</span>
            </h2>
            <p className="mt-6 text-base max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              {"I'm a tech enthusiast who transforms ideas into powerful digital experiences — spanning web, mobile, and full-stack solutions that drive real results."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2 portfolio-card p-7 reveal-left">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.3)" }}>
                  <BookOpen className="w-5 h-5 text-[#22d3ee]" />
                </div>
                <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>My Journey</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {"I've built real-world applications ranging from POS systems and e-commerce platforms to mobile finance apps and tour booking systems — each crafted with clean code and a focus on user experience."}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { label: "Projects", value: "11+" },
                  { label: "Tech Stack", value: "14+" },
                ].map((s) => (
                  <div key={s.label} className="text-center py-3 rounded-xl"
                    style={{ background: "var(--stat-bg)", border: "1px solid var(--stat-border)" }}>
                    <div className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 reveal-right">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <GraduationCap className="w-5 h-5 text-[#22d3ee]" />
                Education Background
              </h3>

              <div className="relative ml-3" style={{ borderLeft: "2px solid rgba(34,211,238,0.2)" }}>
                {[
                  {
                    title: "Bachelor of Informatics Engineering",
                    school: "Institut Bisnis dan Teknologi Indonesia",
                    year: "2024 – 2028",
                    desc: "Studying software engineering with a focus on web design, web programming, mobile development, data warehouse, algorithms, and OOP.",
                  },
                  {
                    title: "Senior High School",
                    school: "SMA Dwijendra Denpasar",
                    year: "2021 – 2024",
                    desc: "Studied general sciences. This period built a strong academic foundation and sparked curiosity that led to a deep interest in technology and web development.",
                  },
                ].map((edu, i) => (
                  <div key={i} className="mb-8 ml-8 relative reveal">
                    <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-12"
                      style={{ background: "rgba(34,211,238,0.1)", border: "2px solid rgba(34,211,238,0.5)" }}>
                      <GraduationCap className="w-4 h-4 text-[#22d3ee]" />
                    </span>

                    <div className="p-5 rounded-xl portfolio-card">
                      <h4 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>{edu.title}</h4>
                      <p className="text-xs font-medium mt-0.5" style={{ color: "var(--text-secondary)" }}>{edu.school}</p>
                      <p className="text-xs mt-0.5 mb-2" style={{ color: "var(--text-muted)" }}>{edu.year}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{edu.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

 
      <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }} />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className={`${anton.className} text-4xl sm:text-5xl font-bold section-heading`} style={{ color: "var(--text-primary)" }}>
              My <span style={{ color: "#22d3ee" }}>Skills</span>
            </h2>
            <p className="mt-6 text-base max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              The technologies and tools I use to craft high-quality digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="reveal-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <Cpu className="w-5 h-5 text-[#22d3ee]" />
                <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Digital Skills</h3>
              </div>
              <StaggerReveal className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {DIGITAL_SKILLS.map((skill, idx) => (
                  <div key={idx}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl portfolio-card cursor-default hover:-translate-y-1 transition-transform">
                    <span className="text-xl">{skill.icon}</span>
                    <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{skill.name}</span>
                  </div>
                ))}
              </StaggerReveal>
            </div>

            <div className="reveal-right">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <Layers className="w-5 h-5 text-[#22d3ee]" />
                <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{"Tools & Office"}</h3>
              </div>
              <StaggerReveal className="flex flex-wrap gap-3 justify-center lg:justify-start" delay={200}>
                {OFFICE_SKILLS.map((skill, idx) => (
                  <div key={idx}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl portfolio-card cursor-default hover:-translate-y-1 transition-transform">
                    <span className="text-xl">{skill.icon}</span>
                    <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{skill.name}</span>
                  </div>
                ))}
              </StaggerReveal>
            </div>
          </div>
        </div>
      </section>

    
      <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }} />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className={`${anton.className} text-4xl sm:text-5xl font-bold section-heading`} style={{ color: "var(--text-primary)" }}>
              My <span style={{ color: "#22d3ee" }}>Projects</span>
            </h2>
            <p className="mt-6 text-base max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Here are some of my real-world projects that showcase my skills in web development, mobile apps, system design, and digital solutions.
            </p>
          </div>

          <div className="flex flex-col items-center gap-5 mb-10 reveal relative" style={{ zIndex: 50 }}>
            <div className="inline-flex rounded-xl p-1" style={{ background: "var(--tag-bg)", border: "1px solid var(--tag-border)" }}>
              {["Website", "Mobile App"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setActiveSubFilter("All"); }}
                  className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{
                    background: activeCategory === cat ? "#22d3ee" : "transparent",
                    color: activeCategory === cat ? "#000" : "var(--text-secondary)",
                    boxShadow: activeCategory === cat ? "0 0 12px rgba(34,211,238,0.25)" : "none",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${activeSubFilter !== "All" ? "#22d3ee" : "var(--tag-border)"}`,
                  color: activeSubFilter !== "All" ? "#22d3ee" : "var(--text-secondary)",
                }}
              >
                <Filter className="w-4 h-4" />
                {activeSubFilter === "All" ? "All Categories" : activeSubFilter}
                <svg className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 min-w-[200px] py-1.5 rounded-xl"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
                >
                  {currentSubFilters.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => { setActiveSubFilter(sub); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium transition-colors"
                      style={{
                        color: activeSubFilter === sub ? "#22d3ee" : "var(--text-secondary)",
                        background: activeSubFilter === sub ? "rgba(34,211,238,0.08)" : "transparent",
                      }}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

         
          {filteredProjects.length > 0 ? (
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={100}>
            {filteredProjects.map((project, index) => (
              <div key={project.title}
                className="group relative rounded-2xl overflow-hidden flex flex-col portfolio-card cursor-pointer hover:-translate-y-2 transition-all"
                onClick={() => setActiveModal(project)}
              >
                <div className="h-[3px] w-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(90deg, transparent, #22d3ee, transparent)" }} />

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest"
                      style={{ background: "var(--badge-bg)", border: "1px solid var(--border-color)", color: "var(--badge-text)" }}>
                      {project.category}
                    </span>
                    <span className="text-3xl font-black" style={{ color: "var(--border-color)", fontFamily: "'Orbitron', monospace", lineHeight: 1 }}>
                      {String(PROJECTS.indexOf(project) + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#22d3ee] transition-colors" style={{ color: "var(--text-primary)" }}>
                    {project.title}
                  </h3>

                  <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "var(--text-muted)" }}>
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.slice(0, 4).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ background: "var(--tag-bg)", border: "1px solid var(--tag-border)", color: "var(--tag-text)" }}>
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ color: "var(--text-muted)" }}>
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2" style={{ borderTop: "1px solid var(--divider)" }}>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide neon-btn">
                      <Globe className="w-3.5 h-3.5" /> VIEW DETAIL
                    </button>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border transition-all hover:text-[#22d3ee] hover:border-[rgba(34,211,238,0.4)]"
                        style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}>
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border transition-all hover:text-[#22d3ee] hover:border-[rgba(34,211,238,0.4)]"
                        style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </StaggerReveal>
          ) : (
            <div className="text-center py-20 reveal">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.15)" }}>
                <Rocket className="w-7 h-7 text-[#22d3ee]" />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>Coming Soon</h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Mobile app projects are currently in development. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

      
      <footer id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }} />

        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className={`${anton.className} text-4xl sm:text-5xl font-bold section-heading reveal`} style={{ color: "var(--text-primary)" }}>
            {"Let's"} <span style={{ color: "#22d3ee" }}>Connect</span>
          </h2>

          <p className="text-base leading-relaxed max-w-xl mx-auto reveal" style={{ color: "var(--text-secondary)" }}>
            {"Have a project in mind or want to discuss potential opportunities? Feel free to reach out!"}
          </p>

          <div className="reveal">
            <a href="mailto:gungdemayun64@gmail.com"
              className="neon-btn-solid inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold tracking-wide text-sm">
              <Send className="w-4 h-4" /> SEND EMAIL
            </a>
          </div>

          <div className="flex justify-center flex-wrap gap-6 reveal">
            {[
              { label: "GITHUB", href: "https://github.com/gungdemayun12" },
              { label: "INSTAGRAM", href: "https://instagram.com/@_gungde" },
              { label: "LINKEDIN", href: "https://linkedin.com" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-sm font-semibold tracking-widest transition-all hover:text-[#22d3ee]"
                style={{ color: "var(--text-muted)" }}>
                {s.label}
              </a>
            ))}
          </div>

          <div className="pt-6" style={{ borderTop: "1px solid var(--divider)" }}>
            <p className="text-xs tracking-widest" style={{ color: "var(--text-muted)" }}>
              {"© 2026 "}
              <span className="text-[#22d3ee]" style={{ fontFamily: "'Orbitron', monospace" }}>GUNG DEMAYUN</span>
              {". ALL RIGHTS RESERVED."}
            </p>
          </div>
        </div>
      </footer>

    
      {activeModal && <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />}
    </div>
  );
}