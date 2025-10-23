import {
  component$,
  type Signal,
  type QRL,
  Slot,
  useVisibleTask$,
  $,
  TaskCtx,
} from '@builder.io/qwik';
import Row from '~/components/ui/grid/Row';
import LoadingSpinner from '~/components/ui/LoadingSpinner/LoadingSpinner';
import Button from '~/components/ui/Button/Button';

interface LoadMoreProps {
  rootEl: Signal<HTMLDivElement | undefined>;
  loadMore$: QRL<() => void>;
  singleElementRefs: Signal<HTMLDivElement[]>;
  loading: boolean;
  error: boolean;
}

const LoadMore = component$<LoadMoreProps>(
  ({ rootEl, loadMore$, singleElementRefs, loading, error }) => {
    const startWatchingVisibility = $(
      ({ cleanup, onVisible }: { cleanup: TaskCtx['cleanup']; onVisible: () => void }) => {
        const observer = new IntersectionObserver(entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            observer.disconnect();
            onVisible();
          }
        });

        singleElementRefs.value.splice(-3).forEach(row => observer.observe(row));

        cleanup(observer.disconnect);
      },
    );

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(
      ({ cleanup }) => {
        startWatchingVisibility({ cleanup, onVisible: loadMore$ });
      },
      { strategy: 'document-ready' },
    );

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(
      ({ cleanup }) => {
        const observer = new MutationObserver(mutations => {
          const addedNodes = mutations
            .flatMap(({ addedNodes }) => Array.from(addedNodes) as HTMLElement[])
            // filter by div elements that have id (<Slot /> needs to be wrapped in a list of divs each having an id)
            .filter(
              ({ nodeName, dataset }) => nodeName === 'DIV' && dataset && 'loadmoreRoot' in dataset,
            ).length;

          if (addedNodes > 0) {
            startWatchingVisibility({ cleanup, onVisible: loadMore$ });
          }
        });

        observer.observe(rootEl.value!, { childList: true, subtree: true });
        cleanup(observer.disconnect);
      },
      { strategy: 'document-ready' },
    );

    return (
      <div ref={rootEl}>
        <Slot />
        <Row justify="center">{loading && <LoadingSpinner />}</Row>
        <Row justify="center">
          {error && (
            <Button onClick$={loadMore$}>Buraz, radi li ti Internet? Pokušaj ponovo.</Button>
          )}
        </Row>
      </div>
    );
  },
);

export default LoadMore;
