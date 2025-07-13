interface LandingHeroProps {
  stats: { number: string; label: string }[];
}

export function LandingHero({ stats }: LandingHeroProps) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
<<<<<<< HEAD
        <div className="h-24 md:h-32 mb-2 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
=======
        <div className="h-24 md:h-32 mb-2 md:mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-purple-600 bg-clip-text">
>>>>>>> ae9e771d50d45bb28d5f4fad511fa2055b82d8cf
          <h1 className="text-4xl md:text-6xl font-bold text-transparent">
            Kết nối Brands & Influencers
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-transparent">
            Hiệu quả hơn bao giờ hết
          </h2>
        </div>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Nền tảng toàn diện giúp brands tìm kiếm influencer phù hợp và influencer kết nối với các cơ hội hợp tác tuyệt vời
        </p>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
<<<<<<< HEAD
              <div className="text-2xl md:text-3xl font-bold text-blue-600">{stat.number}</div>
=======
              <div className="text-2xl md:text-3xl font-bold text-blue-500 dark:text-blue-600">{stat.number}</div>
>>>>>>> ae9e771d50d45bb28d5f4fad511fa2055b82d8cf
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
