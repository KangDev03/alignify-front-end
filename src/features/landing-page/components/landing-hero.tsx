import { useTranslation } from "react-i18next";

interface LandingHeroProps {
  stats: { number: string; label: string }[];
}

export function LandingHero({ stats }: LandingHeroProps) {
  const { t } = useTranslation();

  return (
    <section className="py-48 px-4">
      <div className="container mx-auto text-center">
        <div className="h-24 md:h-32 mb-2 md:mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-purple-600 bg-clip-text">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent">
            {t("landingHero.titleLine1")}
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-transparent">
            {t("landingHero.titleLine2")}
          </h2>
        </div>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t("landingHero.description")}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-500 dark:text-blue-600">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{t(`landingHero.stats.${index}`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
