"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Terminal } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-black/95 backdrop-blur-lg shadow-[0_0_20px_rgba(57,255,20,0.1)] border-b border-[rgba(57,255,20,0.15)]"
            : "bg-transparent border-b border-[rgba(57,255,20,0.05)]"
          }`}
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 sm:px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 bg-black border border-[rgba(57,255,20,0.5)] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:border-[#39ff14] group-hover:shadow-[0_0_15px_rgba(57,255,20,0.5)]">
              <Terminal className="w-5 h-5 text-[#39ff14]" />
            </div>
            <span
              className="text-xl font-bold text-white group-hover:text-[#39ff14] transition-all duration-300"
              style={{ fontFamily: "'Orbitron', monospace", letterSpacing: "0.1em" }}
            >
              Gungdev
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative px-4 py-2.5 text-gray-400 hover:text-[#39ff14] font-medium transition-all duration-300 text-sm tracking-wide"
              >
                {link.name}
                <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-[#39ff14] group-hover:w-full group-hover:left-0 transition-all duration-300 shadow-[0_0_8px_#39ff14]" />
              </a>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center space-x-3">
            <a
              href="#contact"
              className="hidden md:block neon-btn px-5 py-2 rounded-lg text-sm font-semibold tracking-wide"
            >
              Hire Me
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg border border-[rgba(57,255,20,0.3)] hover:border-[#39ff14] hover:bg-[rgba(57,255,20,0.05)] transition-all duration-300"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-[#39ff14]" />
              ) : (
                <Menu className="w-5 h-5 text-[#39ff14]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${isOpen ? "visible" : "invisible"
          }`}
      >
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] border-l border-[rgba(57,255,20,0.2)] shadow-[0_0_40px_rgba(57,255,20,0.1)] transform transition-all duration-500 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          style={{ background: "linear-gradient(160deg, #050505 0%, #0a0a0a 100%)" }}
        >
          <div className="relative h-full flex flex-col p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black border border-[rgba(57,255,20,0.5)] rounded-lg flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-[#39ff14]" />
                </div>
                <span
                  className="text-lg font-bold text-[#39ff14]"
                  style={{ fontFamily: "'Orbitron', monospace" }}
                >
                  MENU
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[rgba(57,255,20,0.2)] hover:border-[#39ff14] transition-all duration-300"
              >
                <X className="w-4 h-4 text-[#39ff14]" />
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 space-y-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center space-x-4 p-3.5 rounded-xl border border-[rgba(57,255,20,0.08)] hover:border-[rgba(57,255,20,0.4)] hover:bg-[rgba(57,255,20,0.05)] transition-all duration-300"
                  style={{
                    animation: isOpen
                      ? `slideIn 0.4s ease-out ${index * 0.07}s both`
                      : "none",
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#39ff14] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_6px_#39ff14]" />
                  <span className="flex-1 text-gray-400 group-hover:text-[#39ff14] font-medium transition-colors duration-300 text-sm tracking-wide">
                    {link.name}
                  </span>
                </a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="neon-btn-solid w-full py-3.5 px-6 text-center font-bold rounded-xl text-sm tracking-widest"
            >
              HIRE ME
            </a>

            {/* Decorative corner glow */}
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#39ff14] opacity-[0.03] blur-3xl rounded-full pointer-events-none" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
