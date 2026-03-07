"use client"; import Image from "next/image"; import { useState, useEffect, useRef } from "react"; import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion"; import AOS from "aos"; import "aos/dist/aos.css"; import {   ArrowRight, Rocket, Github, Linkedin, Mail,   BookOpen, GraduationCap, X, ExternalLink, ChevronLeft, ChevronRight,   Globe, Terminal, Cpu, Layers, Send, ZoomIn, ZoomOut } from "lucide-react"; import {   SiHtml5, SiNextdotjs,   SiMysql, SiPhp, SiLaravel, SiTailwindcss, SiWordpress, SiBootstrap,   SiGithub, SiGit } from "react-icons/si"; import { FaFileExcel, FaFileWord, FaFilePowerpoint, FaPaintBrush, FaDatabase } from "react-icons/fa"; import { Anton } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: "400" });

function LanyardCard() {
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.8 });
  const [dragging, setDragging] = useState(false);
  const [currentY, setCurrentY] = useState(0);

  useEffect(() => {
    const unsubY = springY.onChange((v) => setCurrentY(v));
    return () => unsubY();
  }, [springY]);

  const nailX = 110;
  const nailY = 8;
  const cardTopY = 148 + currentY;
  const leftAttachX = 75;
  const rightAttachX = 145;
  const slack = 30 + Math.abs(currentY) * 0.2;

  const leftRopePath = `M ${nailX} ${nailY} C ${nailX - 10} ${nailY + slack}, ${leftAttachX + 10} ${cardTopY - slack * 0.5}, ${leftAttachX} ${cardTopY}`;
  const rightRopePath = `M ${nailX} ${nailY} C ${nailX + 10} ${nailY + slack}, ${rightAttachX - 10} ${cardTopY - slack * 0.5}, ${rightAttachX} ${cardTopY}`;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center select-none"
      style={{ width: 220, height: 420 }}
    >
      <div
        className="absolute z-30 flex flex-col items-center"
        style={{ top: 0, left: "50%", transform: "translateX(-50%)" }}
      >
        <div
          style={{
            width: 16,
            height: 8,
            background: "rgba(57,255,20,0.25)",
            border: "1px solid rgba(57,255,20,0.6)",
            borderRadius: "4px 4px 0 0",
            boxShadow: "0 0 8px rgba(57,255,20,0.4)",
          }}
        />
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1a1a1a, #0d0d0d)",
            border: "2px solid rgba(57,255,20,0.7)",
            boxShadow: "0 0 12px rgba(57,255,20,0.5), inset 0 0 4px rgba(57,255,20,0.2)",
            marginTop: -4,
          }}
        />
      </div>

      <svg
        width="220"
        height="420"
        viewBox="0 0 220 420"
        className="absolute top-0 left-0 pointer-events-none z-10"
        style={{ overflow: "visible" }}
      >
        <path
          d={leftRopePath}
          fill="none"
          stroke="#39ff14"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.75"
          style={{ filter: "drop-shadow(0 0 4px #39ff14)" }}
        />
        <path
          d={rightRopePath}
          fill="none"
          stroke="#39ff14"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.75"
          style={{ filter: "drop-shadow(0 0 4px #39ff14)" }}
        />
        <motion.rect
          x="87"
          y={140 + currentY}
          width="46"
          height="9"
          rx="3"
          fill="#1a1a1a"
          stroke="#39ff14"
          strokeWidth="1.5"
          style={{ filter: "drop-shadow(0 0 5px #39ff14)" }}
        />
      </svg>

      <motion.div
        ref={cardRef}
        drag="y"
        dragConstraints={{ top: 0, bottom: 200 }}
        dragElastic={0.1}
        style={{ y: springY, marginTop: 148, position: "relative", zIndex: 20 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => {
          setDragging(false);
          y.set(0);
        }}
        whileDrag={{ scale: 1.04, rotateZ: 1 }}
        animate={{ rotateZ: [0, 0.8, -0.8, 0.4, -0.4, 0] }}
        transition={{
          rotateZ: {
            duration: 4,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          },
        }}
        className="lanyard-card"
      >
        <div
          className="w-[220px] rounded-2xl overflow-hidden shadow-2xl border"
          style={{
            background: "linear-gradient(160deg, #0d0d0d 0%, #111 60%, #0a1a0a 100%)",
            borderColor: "rgba(57,255,20,0.35)",
            boxShadow: "0 0 30px rgba(57,255,20,0.12), 0 20px 60px rgba(0,0,0,0.8)",
          }}
        >
          <div
            className="px-4 py-2 flex items-center justify-between"
            style={{ background: "rgba(57,255,20,0.08)", borderBottom: "1px solid rgba(57,255,20,0.2)" }}
          >
            <span
              className="text-[10px] font-bold text-[#39ff14] tracking-widest"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              ID CARD
            </span>
          </div>

          <div className="p-4 flex flex-col items-center gap-3">
            <div
              className="relative w-[90px] h-[90px] rounded-xl overflow-hidden"
              style={{
                border: "2px solid rgba(57,255,20,0.5)",
                boxShadow: "0 0 15px rgba(57,255,20,0.25)",
              }}
            >
              <Image src="/profil.jpg" alt="Gungdemayun" fill className="object-cover" priority />
            </div>

            <div className="text-center space-y-1">
              <div
                className="text-[11px] text-[rgba(57,255,20,0.6)] tracking-widest"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                FULL NAME
              </div>
              <div className="text-white font-bold text-base leading-tight">
                Gung Demayun
              </div>
              <div
                className="text-[10px] text-[#39ff14] tracking-wide font-medium"
                style={{ textShadow: "0 0 8px #39ff14" }}
              >
                Web Developer
              </div>
            </div>

            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest"
              style={{
                background: "rgba(57,255,20,0.08)",
                border: "1px solid rgba(57,255,20,0.4)",
                color: "#39ff14",
                textShadow: "0 0 6px #39ff14",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-pulse shadow-[0_0_6px_#39ff14]" />
              Open To Work
            </div>

            <div className="w-full pt-1">
              <div
                className="flex gap-[2px] justify-center h-6"
                style={{ opacity: 0.25 }}
              >
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#39ff14]"
                    style={{ width: i % 3 === 0 ? 3 : 1, height: "100%" }}
                  />
                ))}
              </div>
              <div className="text-center text-[8px] text-[rgba(57,255,20,0.3)] tracking-[0.2em] mt-1">
                IBIT-2026-GM
              </div>
            </div>
          </div>
        </div>

        {!dragging && (
          <motion.div
            className="text-center mt-2 text-[10px] text-[rgba(57,255,20,0.4)] tracking-wide"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {"↕ drag me"}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function ImageLightbox({ images, initialIndex, onClose }) {
  const [imgIdx, setImgIdx] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [posStart, setPosStart] = useState({ x: 0, y: 0 });

  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const prev = () => {
    setImgIdx((i) => (i - 1 + images.length) % images.length);
    resetZoom();
  };

  const next = () => {
    setImgIdx((i) => (i + 1) % images.length);
    resetZoom();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, imgIdx]);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.5, 4));
  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 0.5, 1);
    setZoom(newZoom);
    if (newZoom === 1) setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setPosStart({ ...position });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: posStart.x + (e.clientX - dragStart.x),
        y: posStart.y + (e.clientY - dragStart.y),
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((z) => Math.min(z + 0.25, 4));
    } else {
      const newZoom = Math.max(zoom - 0.25, 1);
      setZoom(newZoom);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.95)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-xl border border-[rgba(57,255,20,0.3)] hover:border-[#39ff14] hover:bg-[rgba(57,255,20,0.1)] transition-all duration-200"
      >
        <X className="w-5 h-5 text-[#39ff14]" />
      </button>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-[rgba(57,255,20,0.3)] hover:border-[#39ff14] hover:bg-[rgba(57,255,20,0.1)] transition-all duration-200"
        >
          <ZoomOut className="w-4 h-4 text-[#39ff14]" />
        </button>
        <span className="text-[#39ff14] text-xs font-bold px-2" style={{ fontFamily: "'Orbitron', monospace" }}>
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-[rgba(57,255,20,0.3)] hover:border-[#39ff14] hover:bg-[rgba(57,255,20,0.1)] transition-all duration-200"
        >
          <ZoomIn className="w-4 h-4 text-[#39ff14]" />
        </button>
        {zoom > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); resetZoom(); }}
            className="px-3 h-9 flex items-center justify-center rounded-xl border border-[rgba(57,255,20,0.3)] hover:border-[#39ff14] hover:bg-[rgba(57,255,20,0.1)] transition-all duration-200 text-[10px] font-bold text-[#39ff14] tracking-widest"
          >
            RESET
          </button>
        )}
      </div>

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(57,255,20,0.4)] bg-black/60 hover:bg-[rgba(57,255,20,0.1)] hover:border-[#39ff14] transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-[#39ff14]" />
        </button>
      )}

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(57,255,20,0.4)] bg-black/60 hover:bg-[rgba(57,255,20,0.1)] hover:border-[#39ff14] transition-all"
        >
          <ChevronRight className="w-5 h-5 text-[#39ff14]" />
        </button>
      )}

      <div
        className="relative flex items-center justify-center"
        style={{
          width: "calc(100vw - 120px)",
          height: "calc(100vh - 120px)",
          overflow: "hidden",
          cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <motion.div
          key={imgIdx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.2s ease",
            maxWidth: "100%",
            maxHeight: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={images[imgIdx]}
            alt="Project screenshot"
            style={{
              maxWidth: "100%",
              maxHeight: "calc(100vh - 120px)",
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 0 40px rgba(57,255,20,0.15)",
              userSelect: "none",
              pointerEvents: "none",
            }}
            draggable={false}
          />
        </motion.div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setImgIdx(i); resetZoom(); }}
              className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? "bg-[#39ff14] shadow-[0_0_6px_#39ff14]" : "bg-white/30"}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (lightboxOpen) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, lightboxOpen]);

  const images = project.images || [];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl border"
            style={{
              background: "linear-gradient(160deg, #0d0d0d 0%, #111 100%)",
              borderColor: "rgba(57,255,20,0.3)",
              boxShadow: "0 0 60px rgba(57,255,20,0.12), 0 40px 80px rgba(0,0,0,0.8)",
            }}
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-lg border border-[rgba(57,255,20,0.3)] hover:border-[#39ff14] hover:bg-[rgba(57,255,20,0.1)] transition-all duration-200"
            >
              <X className="w-4 h-4 text-[#39ff14]" />
            </button>

            {images.length > 0 && (
              <div className="relative w-full h-52 sm:h-64 rounded-t-2xl overflow-hidden bg-black group">
                <Image
                  src={images[imgIdx]}
                  alt={project.title}
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() => openLightbox(imgIdx)}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  style={{ background: "rgba(0,0,0,0.3)" }}
                  onClick={() => openLightbox(imgIdx)}
                >
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold text-[#39ff14] tracking-widest"
                    style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(57,255,20,0.4)" }}
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    CLICK TO ZOOM
                  </div>
                </div>
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setImgIdx((imgIdx - 1 + images.length) % images.length); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 border border-[rgba(57,255,20,0.4)] rounded-full flex items-center justify-center hover:bg-[rgba(57,255,20,0.1)] transition-all"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#39ff14]" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setImgIdx((imgIdx + 1) % images.length); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 border border-[rgba(57,255,20,0.4)] rounded-full flex items-center justify-center hover:bg-[rgba(57,255,20,0.1)] transition-all"
                    >
                      <ChevronRight className="w-4 h-4 text-[#39ff14]" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? "bg-[#39ff14] shadow-[0_0_6px_#39ff14]" : "bg-white/30"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-6 bg-[#39ff14] rounded-full shadow-[0_0_8px_#39ff14]" />
                  <h3
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "'Orbitron', monospace", letterSpacing: "0.04em" }}
                  >
                    {project.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">{project.longDesc}</p>

              <div>
                <div className="text-[11px] text-[rgba(57,255,20,0.6)] tracking-widest mb-2 font-semibold">
                  TECH STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-semibold rounded-full"
                      style={{
                        background: "rgba(57,255,20,0.08)",
                        border: "1px solid rgba(57,255,20,0.3)",
                        color: "#39ff14",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {images.length > 1 && (
                <div>
                  <div className="text-[11px] text-[rgba(57,255,20,0.6)] tracking-widest mb-2 font-semibold">
                    SCREENSHOTS
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {images.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-20 h-14 rounded-lg overflow-hidden cursor-pointer border transition-all duration-200"
                        style={{ borderColor: i === imgIdx ? "rgba(57,255,20,0.6)" : "rgba(57,255,20,0.15)" }}
                        onClick={() => { setImgIdx(i); openLightbox(i); }}
                      >
                        <Image src={img} alt={`Screenshot ${i + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[rgba(57,255,20,0.3)] text-[#39ff14] hover:border-[#39ff14] hover:bg-[rgba(57,255,20,0.1)] transition-all duration-200"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold neon-btn-solid"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {lightboxOpen && (
          <ImageLightbox
            images={images}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const PROJECTS = [
  {
    title: "POS Cashier System for SMEs",
    desc: "A digital Point of Sale (POS) system designed to help small and medium businesses manage transactions and monitor revenue efficiently.",
    longDesc:
      "A web-based Point of Sale (POS) system developed as a digital solution for small and medium enterprises (SMEs) to replace manual cashier processes. The system streamlines transaction recording, product management, and sales monitoring within an integrated platform.\n\nDesigned to improve operational efficiency, the application enables business owners to manage daily transactions digitally while maintaining structured financial records and real-time business performance tracking.",
    tech: ["Laravel", "JavaScript", "Tailwind CSS", "MySQL"],
    github: "https://github.com/gungdemayun12/POS_Sistem.git",
    images: ["/pos1.webp","/pos2.webp","/pos3.webp","/pos4.webp","/pos5.webp","/pos6.webp"],
    category: "Full-Stack / POS",
  },
  {
    title: "Clothing E-Commerce Website",
    desc: "A full-stack clothing e-commerce platform for remote product ordering and comprehensive business management.",
    longDesc:
      "A full-stack clothing e-commerce web application built with Laravel and Blade. The platform enables customers to order fashion products remotely through a structured and user-friendly shopping experience, while providing administrators with a centralized system for managing and monitoring overall e-commerce operations.\n\nDesigned as a complete business solution, the system integrates customer-side purchasing workflows with an administrative management panel to support operational control, sales monitoring, and business performance tracking.",
    tech: ["Laravel", "Blade", "Tailwind CSS", "JavaScript", "MySQL"],
    github: "https://github.com/gungdemayun12/Website-ECommerce.git",
    images: ["/ecommerce1.webp","/ecommerce2.webp","/ecommerce3.webp","/ecommerce4.webp","/ecommerce5.webp","/ecommerce6.webp","/ecommerce7.webp","/ecommerce8.webp","/ecommerce9.webp"],
    category: "Full-Stack / E-Commerce",
  },
  {
    title: "Phone Repair Queue System",
    desc: "A digital queue management system designed to streamline customer flow and service operations in phone repair shops.",
    longDesc:
      "A web-based queue management system developed to optimize service flow in mobile phone repair shops. The system allows customers to take queue numbers digitally and monitor their position in line through an integrated tracking mechanism.\n\nAdministrators can monitor incoming queues in real-time and call customers directly through the system, with automatic display updates and voice notifications on a dedicated screen. The platform also provides structured queue records and statistical insights to help business owners analyze daily, weekly, and monthly service trends.",
    tech: ["Laravel","Blade", "JavaScript", "Tailwind CSS", "MySQL"],
    github: "https://github.com/gungdemayun12/Service-Queue.git",
    images: ["/servicequeue1.webp","/servicequeue2.webp","/servicequeue3.webp","/servicequeue4.webp","/servicequeue5.webp"],
    category: "Full-Stack / Queue System",
  },
  {
  title: "Gym Management System",
  desc: "A web-based gym management system designed to help fitness centers manage members, membership packages, and revenue efficiently.",
  longDesc:
    "A web-based Gym Management System developed to streamline daily operations in fitness centers and gyms. The platform provides an integrated solution for managing gym members, membership packages, and overall business revenue within a centralized management system.\n\nAdministrators can register and manage member data, organize different gym membership packages, and monitor income generated from subscriptions and services. The system helps gym owners maintain structured member records while gaining clear insights into business performance and operational activity.\n\nTo enhance usability and user experience, the application also includes a Dark Mode feature that allows users to switch between light and dark interface themes, providing a more comfortable visual experience during extended use.",
  tech: ["Laravel","Blade", "JavaScript", "Tailwind CSS", "MySQL"],
  github: "https://github.com/gungdemayun12",
  images: ["/gym1.webp","/gym2.webp","/gym3.webp","/gym4.webp","/gym5.webp"],
  category: "Full-Stack / Management System",
},
  {
    title: "Mai Kebali Tour Website",
    desc: "A Bali tour and wedding booking website designed to promote and sell travel packages with integrated online checkout.",
    longDesc:
      "Mai Kebali Tour is a tourism-focused website developed to promote and sell Bali tour packages and wedding services. Built using WordPress with the Elementor page builder, the platform provides an engaging browsing experience where customers can explore available packages, view detailed information, and complete bookings directly through the website.\n\nThe system integrates an online checkout and payment process, with booking details automatically delivered to the company via email for operational follow-up. Designed as a practical digital sales channel, the website helps streamline inquiries, bookings, and package management in a structured and user-friendly environment.",
    tech: ["WordPress", "Elementor"],
    github: null,
    demo: "https://maikebalitour.com/",
    images: ["/maikebalitour1.webp","/maikebalitour2.webp","/maikebalitour3.webp","/maikebalitour4.webp"],
    category: "CMS / Tourism",
  },
  {
    title: "Portfolio Website",
    desc: "A personal portfolio website with futuristic design, interactive animations, and a fully responsive layout.",
    longDesc:
      "A personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion. Features a futuristic design with a neon green theme and matrix background effect. Key features include: an interactive ID card with a draggable lanyard effect, typing animation effect, an about me section with an education timeline, a project showcase with detail modals, and a contact page. Optimized for both mobile and desktop displays with smooth animations powered by AOS and Framer Motion.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "JavaScript"],
    github: "https://github.com/gungdemayun12",
    images: ["/portofolio.webp"],
    category: "Frontend / Portfolio",
  },
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 97}%`,
  top: `${(i * 23 + 11) % 95}%`,
  delay: `${(i * 0.4) % 5}s`,
  duration: `${6 + (i * 0.7) % 8}s`,
}));

const DIGITAL_SKILLS = [
  { icon: <SiNextdotjs className="text-white" />, name: "Next.js" },
  { icon: <SiHtml5 className="text-orange-500" />, name: "HTML" },
  { icon: <SiLaravel className="text-red-500" />, name: "Laravel" },
  { icon: <SiPhp className="text-indigo-400" />, name: "PHP Native" },
  { icon: <SiTailwindcss className="text-cyan-400" />, name: "Tailwind CSS" },
  { icon: <SiBootstrap className="text-purple-500" />, name: "Bootstrap" },
  { icon: <SiMysql className="text-blue-400" />, name: "MySQL" },
  { icon: <SiWordpress className="text-blue-300" />, name: "WordPress Elementor" },
  { icon: <SiGithub className="text-white" />, name: "GitHub" },
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
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#4285F4"/>
        <path d="M12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5S15.03 6.5 12 6.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5S10.07 8.5 12 8.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="#34A853"/>
        <path d="M7.5 12c0-2.49 2.01-4.5 4.5-4.5V5c-3.87 0-7 3.13-7 7h2.5z" fill="#FBBC05"/>
        <path d="M12 19c3.87 0 7-3.13 7-7h-2.5c0 2.49-2.01 4.5-4.5 4.5V19z" fill="#EA4335"/>
      </svg>
    ),
    name: "Looker Studio",
  },
];

export default function Home() {
  const words = ["Web Developer"];
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

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

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 80, easing: "ease-out" });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden matrix-bg">

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#39ff14] opacity-[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#39ff14] opacity-[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute w-[3px] h-[3px] bg-[#39ff14] rounded-full animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: 0.4,
              boxShadow: "0 0 6px #39ff14",
            }}
          />
        ))}
      </div>

      <section
        id="home"
        className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16 z-10"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">

            <div className="space-y-7" data-aos="fade-right" data-aos-delay="100">
              
              <div data-aos="fade-up" data-aos-delay="250">
                <p className="text-gray-400 text-lg mb-1">{"Hello, I'm"}</p>
                <h1
                  className="text-5xl xl:text-6xl font-extrabold text-white leading-tight"
                  style={{ fontFamily: "'Orbitron', monospace" }}
                >
                  Gung<br />
                  <span style={{ color: "#39ff14", textShadow: "0 0 20px rgba(57,255,20,0.5)" }}>
                    Demayun
                  </span>
                </h1>
              </div>

              <div
                className="flex items-center gap-3 text-2xl"
                data-aos="fade-up" data-aos-delay="350"
              >
                <Terminal className="w-6 h-6 text-[#39ff14]" />
                <span className="text-[#39ff14] font-bold typing-cursor">{displayedText}</span>
              </div>

              <p
                className="text-gray-400 text-base leading-relaxed max-w-lg"
                data-aos="fade-up" data-aos-delay="450"
              >
                {"Passionate about crafting digital solutions that are "}
                <span className="text-[#39ff14] font-semibold">creative</span>
                {", "}
                <span className="text-[#39ff14] font-semibold">innovative</span>
                {", and "}
                <span className="text-[#39ff14] font-semibold">impactful</span>
                {". Turning ideas into extraordinary digital experiences."}
              </p>

              <div className="flex flex-wrap gap-4" data-aos="fade-up" data-aos-delay="550">
                <a href="#projects" className="neon-btn-solid flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold tracking-wide">
                  <Rocket className="w-4 h-4" />
                  VIEW PROJECTS
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="neon-btn flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold tracking-wide">
                  GET IN TOUCH
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-3" data-aos="fade-up" data-aos-delay="650">
                {[
                  { href: "https://github.com/gungdemayun12", icon: <Github className="w-5 h-5" /> },
                  { href: "https://linkedin.com", icon: <Linkedin className="w-5 h-5" /> },
                  { href: "mailto:gungdemayun64@gmail.com", icon: <Mail className="w-5 h-5" /> },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-xl border border-[rgba(57,255,20,0.2)] text-gray-400 hover:text-[#39ff14] hover:border-[#39ff14] hover:bg-[rgba(57,255,20,0.08)] hover:shadow-[0_0_12px_rgba(57,255,20,0.2)] transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div
              className="flex items-start justify-center -mt-8"
              data-aos="zoom-in-up" data-aos-delay="300"
            >
              <LanyardCard />
            </div>
          </div>

          <div className="lg:hidden flex flex-col items-center text-center pt-0" style={{ gap: "16px" }}>

            <div
              data-aos="zoom-in-up"
              data-aos-delay="100"
              className="flex flex-col items-center"
              style={{
                transform: "scale(0.72)",
                transformOrigin: "top center",
                marginTop: "-40px",
                marginBottom: "-130px",
              }}
            >
              <LanyardCard />
            </div>

            <div data-aos="fade-up" data-aos-delay="200">
              <p className="text-gray-400 text-lg mb-1">{"Hello, I'm"}</p>
              <h1
                className="text-4xl sm:text-5xl font-extrabold text-white leading-tight"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                Gung<br />
                <span style={{ color: "#39ff14", textShadow: "0 0 20px rgba(57,255,20,0.5)" }}>
                  Demayun
                </span>
              </h1>
            </div>

            <div className="flex items-center justify-center gap-2 text-xl" data-aos="fade-up" data-aos-delay="300">
              <Terminal className="w-5 h-5 text-[#39ff14]" />
              <span className="text-[#39ff14] font-bold typing-cursor">{displayedText}</span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm" data-aos="fade-up" data-aos-delay="400">
              {"Passionate about crafting digital solutions that are "}
              <span className="text-[#39ff14] font-semibold">creative</span>
              {", "}
              <span className="text-[#39ff14] font-semibold">innovative</span>
              {", and "}
              <span className="text-[#39ff14] font-semibold">impactful</span>
              {"."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs" data-aos="fade-up" data-aos-delay="500">
              <a href="#projects" className="neon-btn-solid flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide w-full">
                <Rocket className="w-4 h-4" /> VIEW PROJECTS
              </a>
              <a href="#contact" className="neon-btn flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide w-full">
                CONTACT ME
              </a>
            </div>

            <div className="flex items-center gap-3" data-aos="fade-up" data-aos-delay="600">
              {[
                { href: "https://github.com/gungdemayun12", icon: <Github className="w-5 h-5" /> },
                { href: "https://linkedin.com", icon: <Linkedin className="w-5 h-5" /> },
                { href: "mailto:gungdemayun64@gmail.com", icon: <Mail className="w-5 h-5" /> },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-xl border border-[rgba(57,255,20,0.2)] text-gray-400 hover:text-[#39ff14] hover:border-[#39ff14] hover:bg-[rgba(57,255,20,0.08)] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(57,255,20,0.3)] to-transparent" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2
              className={`${anton.className} text-4xl sm:text-5xl font-bold text-white section-heading`}
            >
              About <span style={{ color: "#39ff14" }}>Me</span>
            </h2>
            <p
              className="mt-6 text-gray-400 text-base max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {"I'm a passionate web developer with experience in creating innovative and aesthetically crafted digital solutions."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2 dark-card p-7" data-aos="fade-right" data-aos-delay="100">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(57,255,20,0.1)", border: "1px solid rgba(57,255,20,0.3)" }}
                >
                  <BookOpen className="w-5 h-5 text-[#39ff14]" />
                </div>
                <h3 className="text-xl font-bold text-white">My Journey</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {"I've built real-world web applications ranging from POS systems and e-commerce platforms to queue management systems and tour websites — each crafted with clean code and a focus on user experience. My journey started with curiosity and grew into a passion for developing digital solutions that are functional, visually engaging, and impactful."}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { label: "Projects", value: "5+" },
                  { label: "Tech Stack", value: "14+" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="text-center py-3 rounded-xl"
                    style={{ background: "rgba(57,255,20,0.05)", border: "1px solid rgba(57,255,20,0.15)" }}
                  >
                    <div className="text-2xl font-bold text-[#39ff14]" style={{ textShadow: "0 0 10px #39ff14" }}>
                      {s.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3" data-aos="fade-left" data-aos-delay="150">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#39ff14]" />
                Education Background
              </h3>

              <div className="relative ml-3" style={{ borderLeft: "2px solid rgba(57,255,20,0.2)" }}>
                {[
                  {
                    title: "Bachelor of Informatics Engineering",
                    school: "Institut Bisnis dan Teknologi Indonesia",
                    year: "2024 – 2028",
                    desc: "Studying software engineering with a focus on web design, web programming, mobile development, data warehouse, algorithms, and object-oriented programming (OOP). Actively applying academic knowledge to real projects and developing a strong foundation in building impactful digital solutions.",
                    delay: 200,
                  },
                  {
                    title: "Senior High School",
                    school: "SMA Dwijendra Denpasar",
                    year: "2021 – 2024",
                    desc: "Studied general sciences with a focus on theoretical subjects. No programming was taught here, but this period built a strong academic foundation and sparked curiosity that eventually led to a deep interest in technology and web development.",
                    delay: 350,
                  },
                ].map((edu, i) => (
                  <div
                    key={i}
                    className="mb-8 ml-8 relative"
                    data-aos="zoom-in-up"
                    data-aos-delay={edu.delay}
                  >
                    <span
                      className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-12"
                      style={{
                        background: "rgba(57,255,20,0.1)",
                        border: "2px solid rgba(57,255,20,0.5)",
                        boxShadow: "0 0 10px rgba(57,255,20,0.3)",
                      }}
                    >
                      <GraduationCap className="w-4 h-4 text-[#39ff14]" />
                    </span>

                    <div
                      className="p-5 rounded-xl transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: "rgba(57,255,20,0.04)",
                        border: "1px solid rgba(57,255,20,0.15)",
                      }}
                    >
                      <h4 className="font-bold text-white text-base">{edu.title}</h4>
                      <p className="text-[#39ff14] text-xs font-medium mt-0.5">{edu.school}</p>
                      <p className="text-gray-500 text-xs mt-0.5 mb-2">{edu.year}</p>
                      <p className="text-gray-400 text-sm leading-relaxed">{edu.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(57,255,20,0.3)] to-transparent" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2
              className={`${anton.className} text-4xl sm:text-5xl font-bold text-white section-heading`}
            >
              My <span style={{ color: "#39ff14" }}>Skills</span>
            </h2>
            <p className="mt-6 text-gray-400 text-base max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              The technologies and tools I use to craft high-quality digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div data-aos="fade-right" data-aos-delay="150">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <Cpu className="w-5 h-5 text-[#39ff14]" />
                <h3 className="text-xl font-bold text-white">Digital Skills</h3>
              </div>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {DIGITAL_SKILLS.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-default"
                    style={{
                      background: "rgba(57,255,20,0.04)",
                      border: "1px solid rgba(57,255,20,0.15)",
                    }}
                    data-aos="zoom-in-up"
                    data-aos-delay={200 + idx * 60}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(57,255,20,0.5)";
                      e.currentTarget.style.background = "rgba(57,255,20,0.08)";
                      e.currentTarget.style.boxShadow = "0 0 15px rgba(57,255,20,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(57,255,20,0.15)";
                      e.currentTarget.style.background = "rgba(57,255,20,0.04)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span className="text-xl">{skill.icon}</span>
                    <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-aos="fade-left" data-aos-delay="200">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <Layers className="w-5 h-5 text-[#39ff14]" />
                <h3 className="text-xl font-bold text-white">{"Tools & Office"}</h3>
              </div>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {OFFICE_SKILLS.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-default"
                    style={{
                      background: "rgba(57,255,20,0.04)",
                      border: "1px solid rgba(57,255,20,0.15)",
                    }}
                    data-aos="zoom-in-up"
                    data-aos-delay={400 + idx * 80}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(57,255,20,0.5)";
                      e.currentTarget.style.background = "rgba(57,255,20,0.08)";
                      e.currentTarget.style.boxShadow = "0 0 15px rgba(57,255,20,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(57,255,20,0.15)";
                      e.currentTarget.style.background = "rgba(57,255,20,0.04)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span className="text-xl">{skill.icon}</span>
                    <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(57,255,20,0.3)] to-transparent" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2
              className={`${anton.className} text-4xl sm:text-5xl font-bold text-white section-heading`}
            >
              My <span style={{ color: "#39ff14" }}>Projects</span>
            </h2>
            <p className="mt-6 text-gray-400 text-base max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Here are some of my real-world projects that showcase my skills in web development, system design, and digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-400 hover:-translate-y-2"
                style={{
                  background: "linear-gradient(160deg, #0d0d0d 0%, #0a0a0a 100%)",
                  border: "1px solid rgba(57,255,20,0.15)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
                data-aos="fade-up"
                data-aos-delay={150 + index * 100}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(57,255,20,0.4)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(57,255,20,0.12), 0 8px 32px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(57,255,20,0.15)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";
                }}
              >
                <div
                  className="h-[3px] w-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, #39ff14, transparent)",
                    boxShadow: "0 0 10px #39ff14",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                  ref={(el) => {
                    if (el) {
                      el.parentElement.addEventListener("mouseenter", () => el.style.opacity = 1);
                      el.parentElement.addEventListener("mouseleave", () => el.style.opacity = 0);
                    }
                  }}
                />

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest"
                      style={{
                        background: "rgba(57,255,20,0.08)",
                        border: "1px solid rgba(57,255,20,0.25)",
                        color: "#39ff14",
                      }}
                    >
                      {project.category}
                    </span>
                    <span
                      className="text-3xl font-black"
                      style={{
                        color: "rgba(57,255,20,0.12)",
                        fontFamily: "'Orbitron', monospace",
                        lineHeight: 1,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#39ff14] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.slice(0, 4).map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-gray-400"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-gray-500" style={{ background: "rgba(255,255,255,0.04)" }}>
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[rgba(57,255,20,0.08)]">
                    <button
                      onClick={() => setActiveModal(project)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 neon-btn"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      VIEW DETAIL
                    </button>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-[rgba(57,255,20,0.15)] text-gray-500 hover:text-[#39ff14] hover:border-[rgba(57,255,20,0.4)] transition-all duration-200"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-[rgba(57,255,20,0.15)] text-gray-500 hover:text-[#39ff14] hover:border-[rgba(57,255,20,0.4)] transition-all duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(57,255,20,0.3)] to-transparent" />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-[#39ff14] opacity-[0.03] blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2
            className={`${anton.className} text-4xl sm:text-5xl font-bold text-white section-heading`}
            data-aos="fade-up"
          >
            {"Let's"} <span style={{ color: "#39ff14" }}>Connect</span>
          </h2>

          <p
            className="text-gray-400 text-base leading-relaxed max-w-xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {"Have a project in mind or want to discuss potential opportunities? Whether it's a digital experience or creative collaboration, feel free to reach out!"}
          </p>

          <div data-aos="fade-up" data-aos-delay="200">
            <a
              href="mailto:gungdemayun64@gmail.com"
              className="neon-btn-solid inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold tracking-wide text-sm"
            >
              <Send className="w-4 h-4" />
              SEND EMAIL
            </a>
          </div>

          <div
            className="flex justify-center flex-wrap gap-6"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {[
              { label: "GITHUB", href: "https://github.com/gungdemayun12" },
              { label: "INSTAGRAM", href: "https://instagram.com" },
              { label: "LINKEDIN", href: "https://linkedin.com" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#39ff14] text-sm font-semibold tracking-widest transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="border-t border-[rgba(57,255,20,0.1)] pt-6">
            <p className="text-gray-600 text-xs tracking-widest">
              {"© 2026 "}
              <span style={{ color: "rgba(57,255,20,0.6)", fontFamily: "'Orbitron', monospace" }}>
                GUNG DEMAYUN
              </span>
              {". ALL RIGHTS RESERVED."}
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {activeModal && (
          <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}




