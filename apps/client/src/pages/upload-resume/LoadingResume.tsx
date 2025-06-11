import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import iconAnim from '../../assets/resume-loading-anim.gif';

interface IconItem {
  text: string;
}

interface LoadingResumeProps {
  isComplete?: boolean;
}

const LoadingResume = ({ isComplete }: LoadingResumeProps) => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons: IconItem[] = [
    { text: 'Reading your resume...' },
    { text: 'Processing content...' },
    { text: 'Analyzing skills...' },
    { text: 'Almost done...' },
  ];

  useEffect(() => {
    if (isComplete) return;

    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="relative w-32 h-32 mb-8">
        <div className="relative w-[120px] h-[120px] flex justify-center items-center bg-[#f3f9ff] rounded-full">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
          <img src={iconAnim} className='w-[80px] h-[80px]' />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.1 }}
        className="text-xl font-medium text-[#0D84F3]"
      >
        {icons[currentIcon].text}
      </motion.div>
    </div>
  );
};

export default LoadingResume;
