import { useSignal, $, type QRL } from '@builder.io/qwik';

export const useLoadMore = <T>(initialItems: T[], loadMore: QRL<(last: T) => Promise<T[]>>) => {
  const items = useSignal(initialItems);
  const rootEl = useSignal<HTMLDivElement>();
  const singleElementRefs = useSignal<HTMLDivElement[]>([]);
  const loading = useSignal(false);
  const error = useSignal(false);

  const loadMore$ = $(() => {
    error.value = false;
    loading.value = true;
    const last = items.value[items.value.length - 1];

    loadMore(last)
      .then(res => {
        items.value = items.value.concat(res);
        error.value = false;
      })
      .catch(() => (error.value = true))
      .finally(() => {
        loading.value = false;
      });
  });

  return { items, rootEl, loadMore$, loading, error, singleElementRefs };
};
