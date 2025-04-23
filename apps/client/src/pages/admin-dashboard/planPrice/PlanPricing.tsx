import { t } from "@lingui/macro";
import { Helmet } from "react-helmet-async";
import { ScrollArea, Button, Card, Separator, Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@reactive-resume/ui";
import { Check, Shield, CreditCard, Bank, Money } from "@phosphor-icons/react";

export const PlanPricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month", 
      features: [
        "1 Resume Template",
        "Basic Export Options",
        "Limited Storage",
        "Community Support"
      ],
      buttonText: "Current Plan",
      isPopular: false
    },
    {
      name: "Premium",
      price: "$7.99",
      period: "/month",
      features: [
        "All Resume Templates",
        "Advanced Export Options",
        "Unlimited Storage",
        "Priority Support",
        "Custom Domains",
        "Remove Watermark"
      ],
      buttonText: "Upgrade Now",
      isPopular: true
    },
    {
      name: "Team",
      price: "$24.99",
      period: "/month",
      features: [
        "Everything in Premium",
        "Team Management",
        "Shared Templates",
        "Analytics Dashboard",
        "API Access",
        "24/7 Support"
      ],
      buttonText: "Contact Sales",
      isPopular: false
    }
  ];

  return (
    <ScrollArea orientation="vertical" className="h-screen">
      <Helmet>
        <title>{t`Pricing Plans`} - Resume Builder</title>
      </Helmet>

      <div className="container mx-auto py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">{t`Choose Your Plan`}</h1>
          <p className="text-xl text-primary/70">
            {t`Select the perfect plan for your resume building needs`}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {plans.map((plan) => (
            <Card key={plan.name} className={`p-6 relative ${plan.isPopular ? 'border-2 border-primary' : ''}`}>
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-primary/70">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check size={20} className="text-green-500" />
                    <span className="text-primary/80">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full ${plan.isPopular ? 'bg-blue-500 text-white' : 'bg-primary/10'}`}
                variant={plan.isPopular ? 'primary' : 'outline'}
              >
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="flex flex-col items-center justify-center gap-4">

            <div className="flex items-center gap-2 mb-4">
              <Shield size={24} className="text-primary" />
              <h3 className="text-xl font-semibold text-primary">{t`Secure Payment`}</h3>
            </div>

            <p className="text-primary/70 max-w-2xl mx-auto mb-8">
              {t`All payments are securely processed through our payment partners. We accept all major credit cards and PayPal.`}
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                <CreditCard size={32} className="text-primary" />
                <div>
                  <h4 className="font-semibold text-primary">{t`Credit Card`}</h4>
                  <p className="text-sm text-primary/70">{t`Visa, Mastercard, Amex`}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                <Bank size={32} className="text-primary" />
                <div>
                  <h4 className="font-semibold text-primary">{t`Bank Transfer`}</h4>
                  <p className="text-sm text-primary/70">{t`Direct bank payment`}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                <Money size={32} className="text-primary" />
                <div>
                  <h4 className="font-semibold text-primary">{t`PayPal`}</h4>
                  <p className="text-sm text-primary/70">{t`Fast & secure method`}</p>
                </div>
              </div>
            </div>

            <Separator className="my-12" />

            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">{t`Frequently Asked Questions`}</h3>
              <div className="max-w-3xl mx-auto grid gap-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">
                      {t`Can I change plans later?`}
                    </AccordionTrigger>
                    <AccordionContent>
                      {t`Yes, you can upgrade or downgrade your plan at any time. The new pricing will be prorated based on your remaining subscription period.`}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left">
                      {t`What happens when my trial ends?`}
                    </AccordionTrigger>
                    <AccordionContent>
                      {t`When your trial period ends, you'll need to choose a paid plan to continue using premium features. Your free features will remain accessible.`}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left">
                      {t`Is there a refund policy?`}
                    </AccordionTrigger>
                    <AccordionContent>
                      {t`Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service. Contact our support team for assistance.`}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-primary/70 mb-4">
                {t`Still have questions? We're here to help.`}
              </p>
              <Button 
                variant="outline"
                className="bg-primary text-white hover:bg-primary/90"
              >
                {t`Contact Support`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default PlanPricing;
