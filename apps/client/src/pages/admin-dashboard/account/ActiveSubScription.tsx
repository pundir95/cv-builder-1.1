import { axios } from "@/client/libs/axios";
import { t } from "@lingui/macro";
import { Card, Button } from "@reactive-resume/ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle, Crown } from "@phosphor-icons/react";

interface ActiveSubscriptionProps {
  activeSection: string;
}

interface SubscriptionDetails {
  plan_name: string;
  status: string;
  start_date: string;
  end_date: string;
  features: string[];
  plan_details: {
    name: string;
    price: string;
    validity: string;
    fetures: string[];
  };
}

export const ActiveSubscription = ({ activeSection }: ActiveSubscriptionProps) => {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await axios.get('/subscription/subscription-details/');
        setSubscription(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  if (loading) {
    return (
      <div className={`md:col-span-3 ${activeSection !== 'subscription' && 'hidden'}`}>
        <Card className="p-6 bg-white shadow-lg rounded-xl">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </Card>
      </div>
    );
  }

  if (subscription) {
    return (
      <div className={`md:col-span-3 ${activeSection !== 'subscription' && 'hidden'}`}>
        <Card className="p-6 bg-white shadow-lg rounded-xl">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Crown size={32} className="text-blue-600" weight="fill" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t`Active Subscription`}</h2>
            <p className="text-blue-600 font-semibold mb-6">{subscription?.plan_details?.name}</p>
            
            <div className="bg-blue-50 p-6 rounded-xl w-full max-w-2xl mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">{t`Start Date`}</h3>
                  <p className="text-lg font-semibold text-gray-800">
                    {subscription?.plan_details?.price}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">{t`End Date`}</h3>
                  <p className="text-lg font-semibold text-gray-800">
                    {subscription?.plan_details?.validity}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-2xl mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">{t`Your Premium Benefits`}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subscription.plan_details?.fetures?.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <CheckCircle size={20} className="text-green-500" weight="fill" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={() => navigate('/dashboard/plan-pricing')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-[0_4px_14px_rgba(59,130,246,0.4)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.5)]"
            >
              {t`Manage Subscription`}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={`md:col-span-3 ${activeSection !== 'subscription' && 'hidden'}`}>
      <Card className="p-6 bg-white shadow-lg rounded-xl">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path fill="#F59E42" d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.77 7.82 20 9 12.91l-5-3.64 5.91-.01z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{t`No Subscription Active`}</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            {t`Upgrade your account to unlock premium features and take your resume building experience to the next level.`}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full max-w-2xl">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">{t`Free Plan Features`}</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {t`Basic resume templates`}
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {t`Limited resume creation`}
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {t`Standard support`}
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">{t`Premium Features`}</h3>
              <ul className="text-sm text-blue-600 space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">★</span>
                  {t`Unlimited resume creation`}
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">★</span>
                  {t`Premium templates`}
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">★</span>
                  {t`Priority support`}
                </li>
              </ul>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/dashboard/plan-pricing')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-[0_4px_14px_rgba(59,130,246,0.4)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.5)]"
          >
            {t`Upgrade to Premium`}
          </Button>
        </div>
      </Card>
    </div>
  );
};