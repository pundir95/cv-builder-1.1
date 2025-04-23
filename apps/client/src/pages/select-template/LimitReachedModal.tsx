import { t } from "@lingui/macro";
import limitReachedImage from "../../assets/limit.png";
import { Dialog, DialogContent } from "@reactive-resume/ui";

interface LimitReachedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LimitReachedModal = ({ isOpen, onClose }: LimitReachedModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="flex flex-col items-center p-6 text-center">
          <img 
            src={limitReachedImage} 
            alt="Limit Reached"
            className="w-48 h-48 mb-4" 
          />

          <h2 className="text-2xl font-bold mb-2">
            {t`You are over the resume limit`}
          </h2>

          <p className="text-gray-600 mb-6">
            {t`Only one resume is available on the free plan. Upgrade your plan to create an unlimited number of resumes.`}
          </p>

          <div className="w-full">
            <h3 className="font-medium text-left mb-3">{t`ALSO UNLOCK:`}</h3>
            <ul className="space-y-2 text-left mb-6">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>{t`Access to all templates`}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>{t`Unlimited resume downloads`}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>{t`Unlimited cover letters`}</span>
              </li>
            </ul>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                {t`Skip`}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600"
              >
                {t`Upgrade Plan`}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

