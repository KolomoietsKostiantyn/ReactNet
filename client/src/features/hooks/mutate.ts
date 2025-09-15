import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "./delayquery";
import type { Activity } from "../../lib/types";


export function useMutate()
{
  const client = api;
    const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: (a: Activity) =>
      client.post<Activity>('/Activities', a).then(r => r.data),
    onSuccess: (created) => {
      // мгновенно можно доложить в кэш списка (необязательно)
      queryClient.setQueryData<Activity[]>(['activities'], (old = []) => [created, ...old])

      // а затем гарантированно синхронизироваться с бэком
      //qc.invalidateQueries({ queryKey: ['activities'],refetchType: 'active'  })
    }
  })

  // ── Мутация обновления
  const updateMutation = useMutation({
    mutationFn: (a: Activity) =>
      client.put<Activity>(`/Activities/`, a).then(r => r.data),
    onSuccess: (updated, a) => {
      // обновим деталь и список без лишнего GET
      queryClient.setQueryData(['activity', a.id], a)
      queryClient.setQueryData<Activity[]>(['activities'], (old) =>
        old ? old.map(x => x.id === a.id ? a : x) : old
      )
      // и всё равно инвалидируем группу на случай других фильтров/страниц
      queryClient.invalidateQueries({ queryKey: ['activities'], refetchType: 'active'  })
    }
  })

  const switchActivityStatys = useMutation({
    mutationFn: (id: string)=> client.post(`/Activities/${id}/swith`),
    onMutate:(id)=> {
        const data = queryClient.getQueryData<Activity>(['activity', id]);
        queryClient.setQueryData<Activity>(['activity', id], (old) => {
      if (!old) return old; // если данных не было
      return { ...old, isCancelled: !old.isCancelled };
    })
      return {data};
    },
    onError: (err, id, context)=> {
      
      queryClient.setQueryData<Activity>(['activity', id], context?.data)

    }
  })

  const subscribeUnsubscribe = useMutation({
    mutationFn: (id: string)=> client.post(`/Activities/${id}/subscribe`),
    onSuccess: (data, id)=> {
        queryClient.cancelQueries({queryKey:['activity', id]});
        queryClient.invalidateQueries({queryKey: ['activity', id]});
    }
  })

  return {createMutation, updateMutation,switchActivityStatys, subscribeUnsubscribe}
}