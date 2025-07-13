interface LandingHeroProps {
  stats: { number: string; label: string }[];
}

export function LandingHero({ stats }: LandingHeroProps) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="h-24 md:h-32 mb-2 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
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
              <div className="text-2xl md:text-3xl font-bold text-blue-600">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
