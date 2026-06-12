import { useQuery } from '@tanstack/react-query';
import { getAppGraph } from '../api/mockApi';

export function useGraph(appId: string, mockErrorEnabled: boolean) {
  return useQuery({
    queryKey: ['apps', appId, 'graph', mockErrorEnabled],
    queryFn: () => getAppGraph(appId, mockErrorEnabled),
  });
}