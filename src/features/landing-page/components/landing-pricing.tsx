<<<<<<< HEAD
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Icons } from "@/components/icons/icons";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

=======
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
>>>>>>> ae9e771d50d45bb28d5f4fad511fa2055b82d8cf
interface LandingPricingProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  brandPlans: Plan[];
  influencerPlans: Plan[];
  onGetStarted: () => void;
}

export function LandingPricing({ activeTab, setActiveTab, brandPlans, influencerPlans, onGetStarted }: LandingPricingProps) {

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
<<<<<<< HEAD
                <Card key={index} className={`relative ${plan.popular ? "border-blue-500 shadow-lg scale-105" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                      Phổ biến nhất
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <ul className="flex-1 space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <Icons.checkCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-auto" variant={plan.popular ? "default" : "outline"} onClick={onGetStarted}>
                      Bắt đầu ngay
                    </Button>
                  </CardContent>
                </Card>
=======
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
                  onClick={onGetStarted}
                  highlightColor="ring-2 ring-blue-500"
                />
>>>>>>> ae9e771d50d45bb28d5f4fad511fa2055b82d8cf
              ))}
            </div>
          </TabsContent>
          <TabsContent value="influencers">
            <div className="grid md:grid-cols-3 gap-8">
              {influencerPlans.map((plan, index) => (
<<<<<<< HEAD
                <Card key={index} className={`relative ${plan.popular ? "border-purple-500 shadow-lg scale-105" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                      Phổ biến nhất
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-purple-600">{plan.price}</div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <ul className="flex-1 space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <Icons.checkCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} onClick={onGetStarted}>
                      Bắt đầu ngay
                    </Button>
                  </CardContent>
                </Card>
=======
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
                  onClick={onGetStarted}
                  highlightColor="ring-2 ring-purple-500"
                />
>>>>>>> ae9e771d50d45bb28d5f4fad511fa2055b82d8cf
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
