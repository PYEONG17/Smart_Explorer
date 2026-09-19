"use client";
import { useLang } from "@/contexts/LanguageContext";
import type { TranslationKey } from "@/lib/i18n";

/**
 * Features Section: Showcases key capabilities of SmartExplorer.
 */
type FeatureItem = {
  icon: React.ReactNode;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  color: string;
  bg: string;
  border: string;
};

const FEATURES: FeatureItem[] = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    titleKey: "features.bilingual.title",
    descKey: "features.bilingual.desc",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
      </svg>
    ),
    titleKey: "features.video.title",
    descKey: "features.video.desc",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    titleKey: "features.ai.title",
    descKey: "features.ai.desc",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    titleKey: "features.3d.title",
    descKey: "features.3d.desc",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titleKey: "features.quiz.title",
    descKey: "features.quiz.desc",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    titleKey: "features.progress.title",
    descKey: "features.progress.desc",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
];

export default function FeaturesSection() {
  const { t } = useLang();

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground mb-4">
            {t("features.badge")}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("features.title1")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {t("features.title2")}
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className={`group rounded-2xl border ${feature.border} bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`mb-4 inline-flex rounded-xl ${feature.bg} ${feature.color} p-3`}>
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{t(feature.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(feature.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
