'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface DemoDataButtonProps {
  onDataLoaded: () => void;
}

export function DemoDataButton({ onDataLoaded }: DemoDataButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const loadDemoData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/demo-data', {
        method: 'POST',
      });

      if (response.ok) {
        onDataLoaded();
      }
    } catch (error) {
      console.error('Failed to load demo data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={loadDemoData} disabled={isLoading} variant="secondary" size="sm">
      {isLoading ? 'Loading...' : 'Load Demo Data'}
    </Button>
  );
}
