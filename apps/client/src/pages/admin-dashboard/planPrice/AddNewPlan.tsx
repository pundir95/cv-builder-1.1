import React, { useState } from 'react';

const planTypes = [
  { label: 'One Time Purchase', value: 'one_time' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Annual', value: 'annual' },
  { label: 'Offer', value: 'offer' },
];

interface AddNewPlanProps {
  onBack: () => void;
}

const AddNewPlan: React.FC<AddNewPlanProps> = ({ onBack }) => {
  const [planName, setPlanName] = useState('');
  const [planType, setPlanType] = useState('one_time');
  const [planPrice, setPlanPrice] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleDeleteFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 px-4">
      <div className="flex items-center mb-6">
        <button
          type="button"
          onClick={onBack}
          className="mr-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
        >
          Back
        </button>
        <h2 className="text-lg font-semibold">Add New Plan</h2>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Plan Name</label>
        <input
          type="text"
          placeholder="E.g. Express Plan"
          value={planName}
          onChange={e => setPlanName(e.target.value)}
          className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none placeholder-gray-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Plan Type</label>
        <div className="flex gap-4">
          {planTypes.map(type => (
            <button
              key={type.value}
              type="button"
              onClick={() => setPlanType(type.value)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-150 focus:outline-none ${
                planType === type.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Plan Price</label>
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 px-4 py-3 rounded-l-lg text-gray-400">$</span>
          <input
            type="number"
            placeholder="E.g. 9"
            value={planPrice}
            onChange={e => setPlanPrice(e.target.value)}
            className="w-full bg-gray-100 rounded-r-lg px-4 py-3 outline-none placeholder-gray-400"
          />
        </div>
      </div>
      <div className="mb-8">
        <label className="block mb-2 font-medium">Features</label>
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder={`Feature ${idx + 1}`}
              value={feature}
              onChange={e => handleFeatureChange(idx, e.target.value)}
              className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => handleDeleteFeature(idx)}
              className="px-3 py-2 rounded bg-red-200 hover:bg-red-300 text-red-700 font-medium"
              disabled={features.length === 1}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddFeature}
          className="mt-2 px-4 py-2 rounded bg-blue-200 hover:bg-blue-300 text-blue-700 font-medium"
        >
          Add Feature
        </button>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="bg-lime-300 hover:bg-lime-400 text-black font-medium px-8 py-3 rounded-full transition-colors duration-150"
        >
          Add New Plan
        </button>
      </div>
    </div>
  );
};

export default AddNewPlan;
