"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons/icons"
import { useTheme } from "@/components/theme/theme-provider"
import { LandingFeatures } from "@/features/landing-page/components/landing-features"
import { LandingFooter } from "@/features/landing-page/components/landing-footer"
import { LandingHeader } from "@/features/landing-page/components/landing-header"
import { LandingHero } from "@/features/landing-page/components/landing-hero"
import { LandingPricing } from "@/features/landing-page/components/landing-pricing"
import { LandingTestimonials } from "@/features/landing-page/components/landing-testimonials"

export function LandingPage() {
  const { theme } = useTheme();
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("brands")

  const brandFeatures = [
    {
      icon: <Icons.target className="h-6 w-6" />,
      title: t("landing.features.brand.title1"),
      description: t("landing.features.brand.description1"),
    },
    {
      icon: <Icons.barChart3 className="h-6 w-6" />,
      title: t("landing.features.brand.title2"),
      description: t("landing.features.brand.description2"),
    },
    {
      icon: <Icons.users className="h-6 w-6" />,
      title: t("landing.features.brand.title3"),
      description: t("landing.features.brand.description3"),
    },
    {
      icon: <Icons.shield className="h-6 w-6" />,
      title: t("landing.features.brand.title4"),
      description: t("landing.features.brand.description4"),
    },
  ]

  const influencerFeatures = [
    {
      icon: <Icons.camera className="h-6 w-6" />,
      title: t("landing.features.influencer.title1"),
      description: t("landing.features.influencer.description1"),
    },
    {
      icon: <Icons.trendingUp className="h-6 w-6" />,
      title: t("landing.features.influencer.title2"),
      description: t("landing.features.influencer.description2"),
    },
    {
      icon: <Icons.messageSquare className="h-6 w-6" />,
      title: t("landing.features.influencer.title3"),
      description: t("landing.features.influencer.description3"),
    },
    {
      icon: <Icons.zap className="h-6 w-6" />,
      title: t("landing.features.influencer.title4s"),
      description: t("landing.features.influencer.description4"),
    },
  ]

  const brandPlans = [
    {
      name: t("landing.pricing.brand.starter.name"),
      price: t("landing.pricing.brand.starter.price"),
      description: t("landing.pricing.brand.starter.description"),
      features: t("landing.pricing.brand.starter.features", { returnObjects: true }) as string[],
      popular: false,
    },
    {
      name: t("landing.pricing.brand.pro.name"),
      price: t("landing.pricing.brand.pro.price"),
      description: t("landing.pricing.brand.pro.description"),
      features: t("landing.pricing.brand.pro.features", { returnObjects: true }) as string[],
      popular: true,
    },
    {
      name: t("landing.pricing.brand.enterprise.name"),
      price: t("landing.pricing.brand.enterprise.price"),
      description: t("landing.pricing.brand.enterprise.description"),
      features: t("landing.pricing.brand.enterprise.features", { returnObjects: true }) as string[],
      popular: false,
    },
  ]

  const influencerPlans = [
    {
      name: t("landing.pricing.influencer.creator.name"),
      price: t("landing.pricing.influencer.creator.price"),
      description: t("landing.pricing.influencer.creator.description"),
      features: t("landing.pricing.influencer.creator.features", { returnObjects: true }) as string[],
      popular: false,
    },
    {
      name: t("landing.pricing.influencer.pro.name"),
      price: t("landing.pricing.influencer.pro.price"),
      description: t("landing.pricing.influencer.pro.description"),
      features: t("landing.pricing.influencer.pro.features", { returnObjects: true }) as string[],
      popular: true,
    },
    {
      name: t("landing.pricing.influencer.agency.name"),
      price: t("landing.pricing.influencer.agency.price"),
      description: t("landing.pricing.influencer.agency.description"),
      features: t("landing.pricing.influencer.agency.features", { returnObjects: true }) as string[],
      popular: false,
    },
  ]

  const testimonials = [
    {
      name: "Nguyễn Minh Anh",
      role: "Marketing Director, Fashion Brand",
      avatar: "/placeholder.svg?height=40&width=40",
      content: t("landing.testimonials.0"),
      rating: 5,
    },
    {
      name: "Trần Thị Hương",
      role: "Beauty Influencer, 500K followers",
      avatar: "/placeholder.svg?height=40&width=40",
      content: t("landing.testimonials.1"),
      rating: 5,
    },
    {
      name: "Lê Văn Đức",
      role: "CEO, Tech Startup",
      avatar: "/placeholder.svg?height=40&width=40",
      content: t("landing.testimonials.2"),
      rating: 5,
    },
  ]

  const stats = [
    { number: "10,000+", label: t("landing.stats.influencers") },
    { number: "5,000+", label: t("landing.stats.brands") },
    { number: "50,000+", label: t("landing.stats.campaigns") },
    { number: "20,000+", label: t("landing.stats.posts") },
  ]

  const backgroundImage =
    theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? '/background-dark.png'
      : '/background-light.png';

  return (
    <div
      className="min-h-screen flex-col bg-cover bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <LandingHeader />

      <LandingHero stats={stats} />

      <LandingFeatures
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        brandFeatures={brandFeatures}
        influencerFeatures={influencerFeatures}
      />

      <LandingPricing
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        brandPlans={brandPlans}
        influencerPlans={influencerPlans}
      />

      <LandingTestimonials testimonials={testimonials} />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("landing.cta.title")}</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("landing.cta.description")}
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700"
          >
            {t("landing.cta.button")}
            <Icons.arrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
