import { cn } from '@/lib/utils';

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('container mx-auto w-full max-w-6xl px-4', className)}>{children}</div>;
}
