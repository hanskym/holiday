import type { Metadata } from 'next';

import { Link } from 'next-view-transitions';

import { buttonVariants } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: '404 Not Found',
};

export default function NotFound() {
  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center space-y-8">
      <div className="text-center">
        <h2 className="text-5xl font-bold">
          <span className="sr-only">Error</span>404
        </h2>
        <p className="mt-4 text-xl font-semibold">Halaman tidak ditemukan.</p>
      </div>

      <Link className={buttonVariants()} href="/">
        Halaman Utama
      </Link>
    </div>
  );
}
