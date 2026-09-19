"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useLang } from "@/contexts/LanguageContext";

/**
 * Hero Section: First impression of SmartExplorer.
 */
export default function HeroSection() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-24 md:py-32">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left: Text content */}
          <motion.div
            className="flex flex-col gap-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex self-center lg:self-start items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              {t("hero.badge")}
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-7xl">
              Explore.{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                Learn.
              </span>{" "}
              <br />
              Understand.
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              {t("hero.desc")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition-all duration-200 hover:-translate-y-0.5"
              >
                {t("hero.cta.start")}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
              >
                {t("hero.cta.explore")}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 justify-center lg:justify-start pt-2">
              <div className="text-center">
                <div className="text-2xl font-black text-white">500+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{t("hero.stat.lessons")}</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-black text-white">3D</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{t("hero.stat.models")}</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-black text-white">AI</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{t("hero.stat.ai")}</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Hero illustration */}
          <motion.div
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div
              className="relative h-72 w-72 md:h-96 md:w-96 lg:h-[480px] lg:w-[480px]"
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/30 via-cyan-500/20 to-indigo-500/30 blur-3xl mix-blend-screen" />
              <Image
                src="/hero-illustration.png"
                alt="STEM learning 3D illustration"
                fill
                className="relative z-10 object-contain drop-shadow-[0_20px_50px_rgba(0,163,255,0.4)]"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
