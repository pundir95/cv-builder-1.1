import React, { useState } from 'react';

const plan = {
  name: 'Business Plan',
  price: 35.0,
  currency: 'USD',
  expireDate: '23 Jun 2025 06:00 PM',
  features: [
    { label: 'No of eSign', value: 'Unlimited' },
    { label: 'No of BankID Sign', value: 'Unlimited' },
    { label: 'AI Tokens', value: 'Unlimited' },
    { label: 'Storage Limit', value: '2.0 GB' },
  ],
  description: 'Premium monthly plan with enhanced features',
  status: 'Active',
};

const paymentHistory = [
  {
    id: 1,
    plan: 'Business Plan',
    startDate: '23 May 2025',
    expireDate: '23 Jun 2025',
    amount: '35.00 USD',
    status: 'successful',
    invoice: 'invoices (4)',
    invoiceLink: '#',
  },
  {
    id: 2,
    plan: 'Free Trial',
    startDate: '23 May 2025',
    expireDate: '30 May 2025',
    amount: '0.00 USD',
    status: 'Inactive',
    invoice: '',
    invoiceLink: '#',
  },
];

const paymentMethod = {
  brand: 'Visa',
  last4: '4242',
  expMonth: 2,
  expYear: 2028,
  holder: 'Card Holder',
  flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg', // Example flag/icon
};

const statusBadge = (status: string) => {
  if (status === 'successful') {
    return <span className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">successful</span>;
  }
  return <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">Inactive</span>;
};

const SubcribedPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'method' | 'overview'>('history');

  return (
    <div className="w-full">
      {/* Plan Card */}
      <div className="max-w-sm bg-indigo-500 text-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">{plan.name}</h2>
          <div className="text-right">
            <span className="text-3xl font-bold">${plan.price.toFixed(2)}</span>
            <div className="text-base font-medium">Monthly</div>
          </div>
        </div>
        <div className="text-sm mb-4">Expire Date: {plan.expireDate}</div>
        <div className="space-y-2 mb-4">
          {plan.features.map((f) => (
            <div key={f.label} className="flex justify-between">
              <span>{f.label}</span>
              <span className="font-bold">{f.value}</span>
            </div>
          ))}
        </div>
        <div className="text-sm mb-4">{plan.description}</div>
        <button className="bg-white text-indigo-500 font-semibold px-6 py-2 rounded-full shadow mb-2">Active</button>
        <div>
          <a href="#" className="underline text-white text-sm">Read more</a>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex space-x-6 mb-4">
          <button
            className={`px-4 py-2 rounded-full font-semibold focus:outline-none ${activeTab === 'history' ? 'bg-indigo-200 text-indigo-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('history')}
          >
            Payment History
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold focus:outline-none ${activeTab === 'method' ? 'bg-indigo-200 text-indigo-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('method')}
          >
            Payment Method
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold focus:outline-none ${activeTab === 'overview' ? 'bg-indigo-200 text-indigo-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'history' && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2 px-2">S.No</th>
                  <th className="py-2 px-2">Subscription Plan</th>
                  <th className="py-2 px-2">Start Date</th>
                  <th className="py-2 px-2">Expire Date</th>
                  <th className="py-2 px-2">Amount</th>
                  <th className="py-2 px-2">Status</th>
                  <th className="py-2 px-2">Invoice Id</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((item) => (
                  <tr key={item.id} className="border-b last:border-b-0">
                    <td className="py-2 px-2">{item.id}</td>
                    <td className="py-2 px-2">{item.plan}</td>
                    <td className="py-2 px-2">{item.startDate}</td>
                    <td className="py-2 px-2">{item.expireDate}</td>
                    <td className="py-2 px-2">{item.amount}</td>
                    <td className="py-2 px-2">{statusBadge(item.status)}</td>
                    <td className="py-2 px-2">
                      {item.invoice ? (
                        <a href={item.invoiceLink} className="text-indigo-600 underline flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {item.invoice}
                        </a>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'method' && (
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Payment Methods</h2>
              <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-indigo-600 transition">Add Payment Method</button>
            </div>
            <div className="max-w-md bg-blue-50 border border-blue-300 rounded-xl p-6 mb-4 flex flex-col gap-2 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img src={paymentMethod.flagUrl} alt="Visa" className="w-8 h-8 rounded" />
                  <span className="text-lg font-bold">{paymentMethod.brand}</span>
                </div>
                <button className="text-gray-500 hover:text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" /></svg>
                </button>
              </div>
              <div className="text-xl tracking-widest font-mono mb-2">**** **** **** {paymentMethod.last4}</div>
              <div className="flex justify-between items-end mb-2">
                <div className="text-gray-500 text-sm">Card Holder</div>
                <div className="text-gray-500 text-sm">Expires <span className="text-black font-bold">{paymentMethod.expMonth}/{paymentMethod.expYear}</span></div>
              </div>
              <div className="border-t pt-2 text-gray-600 text-base">Use for payments</div>
            </div>
            <hr className="my-6" />
            <div className="text-gray-500">Your payment information is stored securely.</div>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto">
            {/* Plan Details */}
            <h2 className="text-2xl font-bold mb-2">Plan Details</h2>
            <p className="mb-4">Your plan's validity will expire in <span className="font-bold">28 days.</span></p>
            <div className="border-l-4 border-gray-200 pl-4 mb-8">
              <p className="mb-4">You are using <span className="font-bold">Business Plan</span>, billed <span className="font-bold">Business Monthly</span> for <span className="font-bold">$35</span>.</p>
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <span>Do you want to update subscription?</span>
                <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-indigo-600 transition">Update</button>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <span>Do you want to cancel the subscription?</span>
                <button className="border border-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">Cancel</button>
              </div>
            </div>

            {/* Account Status */}
            <h2 className="text-2xl font-bold mb-2">Account Status</h2>
            <div className="border-l-4 border-gray-200 pl-4">
              <p className="mb-2">You have remaining add-on user limit is <span className="font-bold">5</span>.</p>
              <p className="mb-2">Click on Add-on User to pay for adding a user</p>
              <a href="#" className="text-indigo-600 font-medium hover:underline">Add-On User</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubcribedPlan;
