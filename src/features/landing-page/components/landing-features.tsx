import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Icons } from "@/components/icons/icons";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface LandingFeaturesProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  brandFeatures: Feature[];
  influencerFeatures: Feature[];
}

export function LandingFeatures({ activeTab, setActiveTab, brandFeatures, influencerFeatures }: LandingFeaturesProps) {
  return (
    <section id="features" className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tính năng nổi bật</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Được thiết kế riêng cho nhu cầu của từng đối tượng
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-12">
            <TabsTrigger value="brands" className="flex items-center gap-2">
              <Icons.crown className="h-4 w-4" />
              Dành cho Brands
            </TabsTrigger>
            <TabsTrigger value="influencers" className="flex items-center gap-2">
              <Icons.camera className="h-4 w-4" />
              Dành cho Influencers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="brands">
            <div className="grid md:grid-cols-2 gap-8">
              {brandFeatures.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="influencers">
            <div className="grid md:grid-cols-2 gap-8">
              {influencerFeatures.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
