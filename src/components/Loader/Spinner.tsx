import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils';

const Spinner = ({ size = 24, className }: { size?: number; className?: string }) => {
    return (
      <Loader2
        className={cn("animate-spin text-red-500", className)}
        style={{ width: size, height: size }}
      />
    );
  }

export default Spinner