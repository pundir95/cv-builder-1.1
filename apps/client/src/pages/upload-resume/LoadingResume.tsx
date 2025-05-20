import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FileText, Upload, CheckCircle, Spinner } from '@phosphor-icons/react';

interface IconItem {
  Icon: React.ElementType;
  text: string;
}

interface LoadingResumeProps {
  isComplete?: boolean;
}

const LoadingResume = ({ isComplete }: LoadingResumeProps) => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons: IconItem[] = [
    { Icon: FileText, text: 'Reading your resume...' },
    { Icon: Upload, text: 'Processing content...' },
    { Icon: Spinner, text: 'Analyzing skills...' },
    { Icon: CheckCircle, text: 'Almost done...' },
  ];

  useEffect(() => {
    if (isComplete) return;
    
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isComplete]);

  const CurrentIcon = icons[currentIcon].Icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="relative w-32 h-32 mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIcon}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
              <CurrentIcon 
                className="w-20 h-20 text-primary relative z-10" 
                weight="duotone"
                style={{ filter: 'drop-shadow(0 0 8px rgba(var(--color-primary), 0.3))' }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        key={currentIcon}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-medium text-gray-700"
      >
        {icons[currentIcon].text}
      </motion.div>
    </div>
  );
};

export default LoadingResume;
