// useActivity.ts
import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from './delayquery'
import type { Activity } from '../../lib/types';


export function useActivity(id?: string | null) {
  const qc = useQueryClient()
  const client = api;

  return useQuery({
    queryKey: ['activity', id],
    enabled: !!id,                      // не бьёмся в API, когда id нет
    queryFn: () => client.get<Activity>(`/Activities/${id}`).then(r => r.data),

    // Мгновенно показать объект из списка, если он уже загружен,
    // и параллельно фоново подтянуть полную версию детали:
    placeholderData: () => {
      const list = qc.getQueryData<Activity[]>(['activities'])
      return list?.find(x => x.id === id)
    }
  })
}
