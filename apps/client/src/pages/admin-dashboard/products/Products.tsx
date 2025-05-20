import React, { useState } from 'react';
import { Check } from '@phosphor-icons/react';

const products = [
  {
    name: 'Basic',
    features: ['1 resume', 'Basic templates'],
    monthly: 5,
    yearly: 50,
  },
  {
    name: 'Pro',
    features: ['5 resumes', 'Premium templates'],
    monthly: 10,
    yearly: 100,
  },
  {
    name: 'Premium',
    features: ['Unlimited resumes', 'All features included'],
    monthly: 20,
    yearly: 200,
  },
];

const Products: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
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
        {products.map((product) => (
          <div
            key={product.name}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-100 hover:shadow-2xl transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold mb-2 text-center">{product.name}</h3>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-gray-900">
                ${isYearly ? product.yearly : product.monthly}
              </span>
              <span className="text-base text-gray-500 ml-1 font-medium">
                /{isYearly ? 'year' : 'month'}
              </span>
            </div>
            <ul className="mb-8 w-full">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 mb-3 text-gray-700">
                  <Check size={20} style={{ color: '#22c55e' }} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200 shadow-md"
            >
              Choose {product.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
