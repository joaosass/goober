import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import deactivateDriver from '@requests/deactivateDriver';
import useStore from '@store';

export default function useOffline() {
  const { plate } = useStore();

  const { mutate } = useMutation({
    mutationFn: deactivateDriver,
  });

  useEffect(() => {
    const handleOffline = () => mutate({ plate });

    window.addEventListener('beforeunload', handleOffline);

    return () => {
      window.removeEventListener('beforeunload', handleOffline);
    };
  }, [plate, mutate]);

  return;
};
