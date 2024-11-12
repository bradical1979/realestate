'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto">
      <Card className="p-8">
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
          <p className="text-gray-600 mb-6">
            Unable to retrieve property details. Please try again.
          </p>
          <div className="flex gap-4">
            <Button onClick={reset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try again
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}