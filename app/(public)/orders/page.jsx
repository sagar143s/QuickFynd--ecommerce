'use client'
import dynamic from 'next/dynamic';

const OrdeRsClient = dynamic(() => import('./OrdeRsClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  )
});

export default function OrdeRsPage() {
  return <OrdeRsClient />;
}