import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

/**
 * 404 Not Found — Neon Galaxy
 * - Parallax neon blobs
 * - Animated "404" with elastic entrance
 * - Floating particles (GPU friendly)
 * - Magnetic buttons + subtle tilt on hover
 * - Keyboard shortcut: press "H" to return Home
 */

const useMouseTilt = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      setRot({ x: dy * -8, y: dx * 12 });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return { ref, rot } as const;
};

const Particles: React.FC = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(100);
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setCount(Math.min(140, Math.max(60, Math.floor(w / 12))));
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const dots = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);
  return (
    <div ref={container} className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((i) => (
        <motion.span
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-white/60"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: ["0%", "-120%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            delay: Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: Math.random() * 100 + "%",
          }}
        />
      ))}
    </div>
  );
};

const Magnetic: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });
  return (
    <motion.div
      className={className}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={(e) => {
        const { left, top, width, height } = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const mx = e.clientX - (left + width / 2);
        const my = e.clientY - (top + height / 2);
        x.set(mx * 0.2);
        y.set(my * 0.2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

const NotFoundPage: React.FC = () => {
  // shortcut back home
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "h") {
        (document.getElementById("home-link") as HTMLAnchorElement)?.click();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const { ref, rot } = useMouseTilt();

  const t = useMotionValue(0);
  useEffect(() => {
    const interval = setInterval(() => t.set((v) => (v + 1) % 360), 30);
    return () => clearInterval(interval);
  }, [t]);
  const glow = useTransform(t, (v) => `conic-gradient(from ${v}deg, rgba(99,102,241,0.25), rgba(16,185,129,0.25), rgba(236,72,153,0.25), rgba(99,102,241,0.25))`);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* gradient blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-50 bg-gradient-to-tr from-indigo-600/40 via-cyan-400/30 to-emerald-500/30" />
      <div className="pointer-events-none absolute top-1/3 -right-48 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-40 bg-gradient-to-br from-fuchsia-500/40 via-rose-400/30 to-amber-300/30" />

      {/* animated conic glow ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: glow }}
      />

      {/* bento container */}
      <section className="relative z-10 container mx-auto px-4 py-24 sm:py-28 flex flex-col items-center">
        <Particles />

        {/* glass card */}
        <motion.div
          ref={ref}
          style={{ transform: `perspective(1200px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
          className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
        >
          {/* grid background */}
          <div className="absolute inset-0 rounded-3xl [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px] rounded-3xl" />
          </div>

          <div className="relative p-8 sm:p-12">
            {/* 404 headline */}
            <div className="flex flex-col items-center select-none">
              <motion.div
                initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 10 }}
                className="flex items-end gap-2 drop-shadow-[0_8px_24px_rgba(99,102,241,0.45)]"
              >
                <span className="text-[10rem] leading-none font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70">
                  4
                </span>
                <motion.span
                  initial={{ y: -30 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="text-[10rem] leading-none font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-emerald-200 via-cyan-200 to-indigo-200"
                >
                  0
                </motion.span>
                <span className="text-[10rem] leading-none font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70">
                  4
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-2 text-2xl sm:text-3xl font-semibold text-white/90"
              >
                Page introuvable
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-2 max-w-xl text-center text-white/60"
              >
                On a tout cherché dans la galaxie Himaya, mais cette page s'est perdue dans l'hyperespace. Essayez de revenir à l'accueil ou explorez nos formations.
              </motion.p>
            </div>

            {/* actions */}
            <div className="flex justify-center">
              <Magnetic>
                <Link
                  id="home-link"
                  to="/"
                  className="group relative inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-base font-semibold text-white backdrop-blur hover:bg-white/15 transition shadow-lg"
                >
                  <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-indigo-500/30 via-emerald-500/30 to-fuchsia-500/30 opacity-0 blur-xl transition group-hover:opacity-100" />
                  <Home className="mr-2 h-5 w-5" />
                  Retour à l'accueil
                </Link>
              </Magnetic>

              
            </div>
          </div>

          {/* bottom glow */}
          <div className="pointer-events-none absolute -bottom-16 left-1/2 h-32 w-[70%] -translate-x-1/2 rounded-full blur-2xl bg-gradient-to-r from-indigo-500/30 via-cyan-400/25 to-emerald-400/25" />
        </motion.div>

        {/* tip */}
        <div className="mt-6 text-xs text-white/50">Astuce : appuyez sur <kbd className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono">H</kbd> pour revenir à l\'accueil</div>
      </section>

      {/* corner back button */}
      <Link
        to="/"
        className="group fixed left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur hover:bg-white/10 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Accueil
        <span className="ml-1 opacity-0 transition group-hover:opacity-100">↩︎</span>
      </Link>
    </main>
  );
};

export default NotFoundPage;
