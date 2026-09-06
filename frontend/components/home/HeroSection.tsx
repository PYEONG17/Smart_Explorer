import Link from "next/link";
import Image from "next/image";

/**
 * Hero Section: First impression of SmartExplorer.
 * Contains headline, description, CTA buttons, and hero illustration.
 */
export default function HeroSection() {
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
          <div className="flex flex-col gap-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex self-center lg:self-start items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              Nền tảng học STEM hàng đầu K-9
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Explore.{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Learn.
              </span>{" "}
              Understand.
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Nền tảng học{" "}
              <strong className="text-white">Toán và Khoa học</strong> bằng
              tiếng Anh thông qua bài học song ngữ, video tương tác, AI và mô
              hình 3D.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition-all duration-200 hover:-translate-y-0.5"
              >
                Bắt đầu học ngay
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>

              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
              >
                Khám phá khóa học
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 justify-center lg:justify-start pt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-slate-400">Bài học</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3D</div>
                <div className="text-xs text-slate-400">Mô hình tương tác</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">AI</div>
                <div className="text-xs text-slate-400">Trợ lý học tập</div>
              </div>
            </div>
          </div>

          {/* Right: Hero illustration */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative h-72 w-72 md:h-96 md:w-96 lg:h-[440px] lg:w-[440px]">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/30 to-cyan-500/20 blur-2xl" />
              <Image
                src="/hero-illustration.png"
                alt="STEM learning 3D illustration"
                fill
                className="relative z-10 object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
