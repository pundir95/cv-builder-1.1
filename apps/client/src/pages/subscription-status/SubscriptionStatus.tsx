import { axios } from '@/client/libs/axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const SubscriptionStatus = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const email = searchParams.get('email_id');

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (!email) {
        setStatus('error');
        return;
      }

      try {
        const response = await axios.get(`/subscription/session-status/${email}/`);
        if (response.status === 200) {
          axios.get(`/accounts/api/users/`).then((res)=>{
            localStorage.setItem("user",JSON.stringify(res.data[0]))
    
          }) 

          setStatus('success');
          // Redirect to dashboard after 5 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 5000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    checkSubscriptionStatus();
  }, [email, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      {status === 'loading' && (
        <>
          <h1 className="text-3xl font-bold mb-4">Checking Payment Status...</h1>
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </>
      )}
      
      {status === 'success' && (
        <>
          <h1 className="text-3xl font-bold mb-4 text-green-600">Payment Successful!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your subscription. You will be redirected to your dashboard shortly.
          </p>
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </>
      )}

      {status === 'error' && (
        <>
          <h1 className="text-3xl font-bold mb-4 text-red-600">Payment Not Successful</h1>
          <p className="text-gray-600 mb-4">
            There was an issue with your payment. Please try again or contact support.
          </p>
        </>
      )}
    </div>
  );
};

export default SubscriptionStatus;
