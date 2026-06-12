import { useQuery } from '@tanstack/react-query';
import { getApps } from '../api/mockApi';

export function useApps(mockErrorEnabled: boolean) {
  return useQuery({
    queryKey: ['apps', mockErrorEnabled],
    queryFn: () => getApps(mockErrorEnabled),
  });
}