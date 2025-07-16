import type { PlanFeature } from "@/components/ui/plan-card";
import { PlanCard } from "@/components/ui/plan-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Plan {
  name: string;
  price: string | number;
  description: string;
  features: (string | PlanFeature)[];
  popular?: boolean;
  badge?: string;
  badgeColor?: string;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "secondary";
}
interface LandingPricingProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  brandPlans: Plan[];
  influencerPlans: Plan[];
}

export function LandingPricing({ activeTab, setActiveTab, brandPlans, influencerPlans }: LandingPricingProps) {

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bảng giá linh hoạt</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Chọn gói phù hợp với nhu cầu và ngân sách của bạn
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-12 max-w-md mx-auto">
            <TabsTrigger value="brands">Brands</TabsTrigger>
            <TabsTrigger value="influencers">Influencers</TabsTrigger>
          </TabsList>
          <TabsContent value="brands">
            <div className="grid md:grid-cols-3 gap-8">
              {brandPlans.map((plan, index) => (
                <PlanCard
                  key={index}
                  name={plan.name}
                  price={plan.price}
                  description={plan.description}
                  badge={plan.badge}
                  badgeColor={plan.badgeColor || "bg-blue-500"}
                  popular={plan.popular}
                  features={Array.isArray(plan.features) && typeof plan.features[0] === "string"
                    ? (plan.features as string[]).map(f => ({ name: f, included: true }))
                    : (plan.features as PlanFeature[])
                  }
                  buttonText={plan.buttonText || "Bắt đầu ngay"}
                  buttonVariant={plan.buttonVariant || (plan.popular ? "default" : "outline")}
                  highlightColor="ring-2 ring-blue-500"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="influencers">
            <div className="grid md:grid-cols-3 gap-8">
              {influencerPlans.map((plan, index) => (
                <PlanCard
                  key={index}
                  name={plan.name}
                  price={plan.price}
                  description={plan.description}
                  badge={plan.badge}
                  badgeColor={plan.badgeColor || "bg-purple-500"}
                  popular={plan.popular}
                  features={Array.isArray(plan.features) && typeof plan.features[0] === "string"
                    ? (plan.features as string[]).map(f => ({ name: f, included: true }))
                    : (plan.features as PlanFeature[])
                  }
                  buttonText={plan.buttonText || "Bắt đầu ngay"}
                  buttonVariant={plan.buttonVariant || (plan.popular ? "default" : "outline")}
                  highlightColor="ring-2 ring-purple-500"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
