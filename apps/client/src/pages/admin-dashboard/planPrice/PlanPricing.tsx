import { t } from "@lingui/macro";
import { Helmet } from "react-helmet-async";
import { ScrollArea, Button, Card, Separator, Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@reactive-resume/ui";
import { Check, Shield, CreditCard, Bank, Money, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { axios } from "@/client/libs/axios";
import { BaseListItem } from "../../dashboard/resumes/_layouts/list/_components/base-item";
import { BaseCard } from "../../dashboard/resumes/_layouts/grid/_components/base-card";

export const PlanPricing = () => {
  const [plans,setPlans]=useState([])
  const [isYearly, setIsYearly] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user") || '{"isPlanReached":[],"count":0}');
    setLoading(true)
    setIsAdmin(user.role === "admin");
    let api = user.reference_id ? `/subscription/subscription-plans?reference_id=${user.reference_id}` : `/subscription/subscription-plans`
    axios.get(api).then((res)=>{
      console.log(res,"res")
      setPlans(res.data.data)
      setLoading(false)
    })
  },[])
  
  const getThePlan=(id:string)=>{
    axios.post(`/subscription/subscription-details/`,{
      plan_id:id
    }).then((res)=>{
    if (res.data.data.approve_link) {
      window.location.href = res.data.data.approve_link;
    }
    })
  }

  const handleDeletePlan = (id: string) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      axios.delete(`/subscription/subscription-plans/${id}/`).then((res) => {
        setPlans(plans.filter((plan: any) => plan.id !== id));
      }).catch((err) => {
        console.error("Error deleting plan:", err);
      });
    }
  };

  const getTheOnetimePlan=(data:any)=>{
    let newData = {
      "product_name": data?.name,
      "amount": +data?.price,
      "currency": "usd"
  }
    axios.post(`/subscription/create-one-time-session/`,newData).then((res)=>{
      console.log(res,"res")
      window.location.href = res.data.data.checkout_url;
    })
  }

  return (
    <ScrollArea orientation="vertical" className="h-screen">
      <Helmet>
        <title>{t`Pricing Plans`} - Resume Builder</title>
      </Helmet>

      <div className="container mx-auto">
        <div className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Subscription Plans</h2>
      <div className="flex items-center justify-center mb-8 gap-4">
        <span className="text-gray-700 font-medium">Monthly</span>
        <button
          className={`relative w-14 h-7 rounded-full transition-colors duration-200 focus:outline-none ${isYearly ? 'bg-green-500' : 'bg-gray-300'}`}
          onClick={() => setIsYearly((v) => !v)}
          aria-label="Toggle yearly pricing"
        >
          <span
            className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${isYearly ? 'translate-x-7' : ''}`}
            style={{ transform: isYearly ? 'translateX(28px)' : 'translateX(0)' }}
          />
        </button>
        <span className="text-gray-700 font-medium flex items-center gap-1">
          Yearly <span className="text-green-600 text-xs font-semibold">(Save 20%)</span>
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {
          loading ?
      Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="animate-in fade-in slide-in-from-left-4 duration-500"
            style={{ animationDelay: `${i * 400}ms` }}
          >
         <BaseCard/>
          </div>
        ))  
        :
        
        plans.length > 0 && plans.map((product:any) => (
          <div
            key={product.name}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-100 hover:shadow-2xl transition-shadow duration-200 relative"
          >
            {isAdmin && (
              <button
                onClick={() => handleDeletePlan(product.id)}
                className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 transition-colors"
                title="Delete Plan"
              >
                <Trash size={20} />
              </button>
            )}
            <h3 className="text-xl font-semibold mb-2 text-center">{product.name}</h3>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-gray-900">
                ${isYearly ? product?.price : product?.price}
              </span>
              <span className="text-base text-gray-500 ml-1 font-medium">
                /{isYearly ? 'year' : 'month'}
              </span>
            </div>
            <ul className="mb-8 w-full">
              {Array.isArray(product?.fetures) && product?.fetures?.map((feature:any) => (
                <li key={feature} className="flex items-center gap-2 mb-3 text-gray-700">
                  <Check size={20} style={{ color: '#22c55e' }} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200 shadow-md"
              onClick={()=>{
                if(product?.validity === "onetime"){
                  getTheOnetimePlan(product)
                }else{
                  getThePlan(product?.id)
                }
              }}
            >
              Choose {product?.name}
            </button>
          </div>
        ))}
      </div>
    </div>

      
      </div>
    </ScrollArea>
  );
};

export default PlanPricing;
