import { useLoading } from '@/client/contexts/loading-context';
import { cn } from '@reactive-resume/utils';

export const Loading = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm',
      'transition-opacity duration-200',
      isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
    )}>
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
    </div>
  );
}; 