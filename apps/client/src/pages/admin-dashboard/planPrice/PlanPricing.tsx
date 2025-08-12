import { t } from "@lingui/macro";
import { Helmet } from "react-helmet-async";
import { ScrollArea, Button, Card, Separator, Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@reactive-resume/ui";
import { Check, Shield, CreditCard, Bank, Money, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { axios } from "@/client/libs/axios";
import { BaseListItem } from "../../dashboard/resumes/_layouts/list/_components/base-item";
import { BaseCard } from "../../dashboard/resumes/_layouts/grid/_components/base-card";
import SubcribedPlan from "./SubcribedPlan";
import { useNavigate } from "react-router";
import  {ArrowLeft} from "@phosphor-icons/react";

export const PlanPricing = () => {
  const [plans,setPlans]=useState([])
  const navigate = useNavigate();
  const [filteredPlans,setFilteredPlans]=useState([])
  const [isYearly, setIsYearly] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading,setLoading]=useState(false)
  const [subscribed,setSubscribed]=useState(false)
  const user = JSON.parse(localStorage.getItem("user") || '{"isPlanReached":[],"count":0}');


  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user") || '{"isPlanReached":[],"count":0}');
    setLoading(true)
    setIsAdmin(user.role === "admin");
    let api = user.role !== "admin" ? `/subscription/subscription-plans?reference_id=${user.reference_id}` : `/subscription/subscription-plans`
    axios.get(api).then((res)=>{
      setPlans(res?.data?.results?.plans)
      setLoading(false)
    })
  },[])

  useEffect(()=>{ 
    let filteredDataList = plans.filter((item:any) => item.plan_type === (isYearly ? "yearly" : "monthly"))
    console.log(filteredDataList,"filteredDataList")
    setFilteredPlans(filteredDataList)
  },[isYearly,plans])

  
  const getThePlan=(id:string)=>{
    if(user.subscription_details.length > 0){
      axios.post(`/subscription/update-subscription-plan/${id}/`).then((res)=>{
        console.log(res,"res9999")
        // if (res.data.data.approve_link) {
        //   window.location.href = res.data.data.approve_link;
        // }
      })
    }else{
    axios.post(`/subscription/create-subscription/`,{
      product_id:id
    }).then((res)=>{
      console.log(res,"res66")
  
      window.location.href = res.data.data.payment_link;
    
    })
  }
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
    <ScrollArea orientation="vertical" className="h-screen bg-gray-50">
      <Helmet>
        <title>{t`Pricing Plans`} - Resume Builder</title>
      </Helmet>

      <div className="w-full mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
        <div className="">
         {subscribed && <div className="flex items-center mb-6 cursor-pointer" onClick={()=>{
            setSubscribed(false)
          }}>
              <ArrowLeft size={20} className="mr-2" />
              <span className="text-base sm:text-lg">Back to Dashboard</span>            
          </div>}
          
      <h2 className="text-2xl sm:text-3xl lg:text:xl font-bold text-left mb-10 text-gray-900">Subscription Plans</h2>

      {
        user.subscription_details.length > 0 && !subscribed ?
        <SubcribedPlan data={user.subscription_details} setSubscribed={setSubscribed} />
        :
        <>

        <div className="flex items-center justify-center mb-8 gap-4">
        <span className="text-gray-700 font-medium">Monthly</span>
        <button
          className={`relative w-14 h-7 rounded-full transition-colors duration-200 focus:outline-none border-2 border-gray-300 ${isYearly ? 'bg-green-500 border-green-500' : 'bg-gray-300'}`}
          onClick={() =>{
            setIsYearly((v) => !v)
          }}
          aria-label="Toggle yearly pricing"
        >
          <span
            className={`absolute left-[2px] top-[2px] w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 border ${isYearly ? 'translate-x-7 border-green-500' : 'border-gray-300'}`}
            style={{ transform: isYearly ? 'translateX(28px)' : 'translateX(0)' }}
          />
        </button>
        <span className="text-gray-700 font-medium flex items-center gap-1">
          Yearly <span className="text-green-600 text-xs font-semibold">(Save 20%)</span>
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
        
          filteredPlans.length > 0 && filteredPlans.map((product:any) => (
          <div
            key={product.name}
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center border border-gray-100 hover:shadow-2xl transition-shadow duration-200 relative min-h-[420px] w-full"
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
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2 text-center min-h-[40px]">{product.description}</p>
            <div className="text-center mb-6">
              <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                ${product?.price}
              </span>
              <span className="text-base text-gray-500 ml-1 font-medium">
                /{product?.plan_type === "yearly" ? 'year' : 'month'}
              </span>
            </div>
            <ul className="mb-8 w-full">
              {Array.isArray(product?.fetures) && product?.fetures?.map((feature:any) => (
                <li key={feature} className="flex items-center gap-2 mb-3 text-gray-700">
                  <Check size={20} style={{ color: '#22c55e' }} />
                  <span className="text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-[#D6EF3C]/90 hover:bg-[#D6EF3C] text-black font-semibold py-2 rounded-lg transition-colors duration-200 shadow-md text-base sm:text-lg"
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
        {filteredPlans.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No {isYearly ? 'yearly' : 'monthly'} plans available at the moment.</p>
          </div>
        )}
        </>
        }

    </div>

      
      </div>
    </ScrollArea>
  );
};

export default PlanPricing;
