import { useState } from "react";
import { Button } from "@reactive-resume/ui";
import { X, Crown, Check, Star } from "@phosphor-icons/react";
import { useNavigate } from "react-router";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  showUpgradeButton?: boolean;
}

export const SubscriptionModal = ({ 
  isOpen, 
  onClose, 
  title = "Upgrade to Premium", 
  message = "This feature requires a premium subscription. Upgrade now to unlock all features!",
  showUpgradeButton = true
}: SubscriptionModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    navigate('/dashboard/plan-pricing');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Crown size={20} className="text-white" weight="fill" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>
          
          {/* Features List */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Star size={16} className="text-yellow-500" weight="fill" />
              Premium Features
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Check size={16} className="text-green-500" weight="bold" />
                Unlimited resume creation
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Check size={16} className="text-green-500" weight="bold" />
                Access to all premium templates
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Check size={16} className="text-green-500" weight="bold" />
                Advanced resume analytics
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Check size={16} className="text-green-500" weight="bold" />
                Priority customer support
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          {showUpgradeButton && (
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleUpgrade}
                className="w-full bg-[#D6EF3C]/90 text-black py-3 rounded-xl font-semibold hover:bg-[#D6EF3C] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Crown size={18} className="mr-2" />
                Upgrade to Premium
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                Maybe Later
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 