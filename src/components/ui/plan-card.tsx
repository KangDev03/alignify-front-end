import React from "react";
import { useTranslation } from "react-i18next";
import { Check, Star, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export interface PlanFeature {
  name: string;
  included: boolean;
  limit?: string;
}

export interface PlanCardProps {
  name: string;
  price: React.ReactNode;
  description: string;
  badge?: string;
  badgeColor?: string;
  popular?: boolean;
  features: PlanFeature[];
  buttonText: string;
  buttonVariant?: "default" | "outline" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  highlightColor?: string; // e.g. 'ring-primary' or 'border-blue-500'
}

export const PlanCard: React.FC<PlanCardProps> = ({
  name,
  price,
  description,
  badge,
  badgeColor = "bg-blue-500",
  popular,
  features,
  buttonText,
  buttonVariant = "default",
  onClick,
  disabled,
  highlightColor = "",
}) => {
  const { t } = useTranslation()

  return (

    <Card
      className={`relative transition-all duration-300 hover:shadow-lg ${popular ? `${highlightColor} shadow-lg scale-105` : ""
        }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4 py-1">
            <Star className="h-3 w-3 mr-1" />
            {t("plan.recommended")}
          </Badge>
        </div>
      )}
      <CardHeader className="text-center pb-4">
        {badge && (
          <div className="flex items-center justify-center mb-2">
            <Badge className={`${badgeColor} text-white`}>{badge}</Badge>
          </div>
        )}
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
        <div className="mt-4">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold">{price}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 flex-1">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            {feature.included ? (
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            ) : (
              <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1">
              <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                {feature.name}
              </span>
              {feature.limit && <div className="text-xs text-muted-foreground">{feature.limit}</div>}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={buttonVariant} onClick={onClick} disabled={disabled}>
          {disabled && <Check className="h-4 w-4 mr-2" />}
          {t("plan.buttonText") || buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
};
