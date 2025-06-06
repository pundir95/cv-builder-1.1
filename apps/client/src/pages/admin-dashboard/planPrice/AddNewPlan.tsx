import React, { useState } from 'react';
import { axios } from '@/client/libs/axios';

const planValidityList = [
  { label: 'One Time Payment', value: 'onetime' },
  { label: 'Monthly', value: 'month' },
  { label: 'Annual', value: 'year' },
  { label: 'Offer', value: 'offer' },
];

const planTypeList = [
  { label: 'Personal', value: 'personal' },
  { label: 'Premium', value: 'premium' },
  { label: 'Organization', value: 'organization' },
  { label: 'Enterprise', value: 'enterprise' },
  { label: 'Team', value: 'team' },
];

interface AddNewPlanProps {
  onBack: () => void;
}

const AddNewPlan: React.FC<AddNewPlanProps> = ({ onBack }) => {
  const [planName, setPlanName] = useState('');
  const [planType, setPlanType] = useState('personal');
  const [planValidity, setPlanValidity] = useState('onetime');
  const [planPrice, setPlanPrice] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState('');

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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!planName.trim()) {
      newErrors.planName = 'Plan name is required';
    }

    if (!planPrice.trim()) {
      newErrors.planPrice = 'Plan price is required';
    } else if (isNaN(Number(planPrice)) || Number(planPrice) <= 0) {
      newErrors.planPrice = 'Please enter a valid price';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (features.length === 0 || features.some(feature => !feature.trim())) {
      newErrors.features = 'At least one feature is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('/subscription/subscription-plans/', {
        name: planName,
        validity: planValidity,
        price: Number(planPrice),
        currency: 'USD',
        description: description,
        plan_type:planType,
        fetures: features.filter(feature => feature.trim()),
      });

      if (response.status === 201 || response.status === 200) {
        onBack(); // Go back to the plans list on success
      }
    } catch (error: any) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to create plan. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
          className={`w-full bg-gray-100 rounded-lg px-4 py-3 outline-none placeholder-gray-400 ${
            errors.planName ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.planName && <p className="text-red-500 text-sm mt-1">{errors.planName}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Description</label>
        <input
          type="text"
          placeholder="E.g. This plan is for the express plan"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className={`w-full bg-gray-100 rounded-lg px-4 py-3 outline-none placeholder-gray-400 ${
            errors.description ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Plan Type</label>
        <div className="flex gap-4">
          {planTypeList.map(type => (
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
        <label className="block mb-2 font-medium">Plan Validity</label>
        <div className="flex gap-4">
          {planValidityList.map(type => (
            <button
              key={type.value}
              type="button"
              onClick={() => setPlanValidity(type.value)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-150 focus:outline-none ${
                planValidity === type.value
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
            className={`w-full bg-gray-100 rounded-r-lg px-4 py-3 outline-none placeholder-gray-400 ${
              errors.planPrice ? 'border-2 border-red-500' : ''
            }`}
          />
        </div>
        {errors.planPrice && <p className="text-red-500 text-sm mt-1">{errors.planPrice}</p>}
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
              className={`w-full bg-gray-100 rounded-lg px-4 py-3 outline-none placeholder-gray-400 ${
                errors.features ? 'border-2 border-red-500' : ''
              }`}
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
        {errors.features && <p className="text-red-500 text-sm mt-1">{errors.features}</p>}
        <button
          type="button"
          onClick={handleAddFeature}
          className="mt-2 px-4 py-2 rounded bg-blue-200 hover:bg-blue-300 text-blue-700 font-medium"
        >
          Add Feature
        </button>
      </div>
      {errors.submit && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {errors.submit}
        </div>
      )}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`bg-lime-300 hover:bg-lime-400 text-black font-medium px-8 py-3 rounded-full transition-colors duration-150 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Creating Plan...' : 'Add New Plan'}
        </button>
      </div>
    </div>
  );
};

export default AddNewPlan;
