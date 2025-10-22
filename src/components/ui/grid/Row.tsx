import { Slot, component$, useStyles$, ClassList } from '@builder.io/qwik';
import styles from './Row.scss?inline';
import { Ref } from './types';

export type RowItemsAlignment = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

export type RowJustify =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type RowGaps = 'sm' | 'md' | 'lg' | 'xl';

export interface RowComponent {
  alignItems?: RowItemsAlignment;
  justify?: RowJustify;
  gap?: RowGaps;
  gapSm?: RowGaps;
  gapMd?: RowGaps;
  gapLg?: RowGaps;
  gapXl?: RowGaps;
  marginBottom?: number;
  column?: boolean;
  class?: ClassList;
  noWrap?: boolean;
  ref?: Ref;
}

const Row = component$<RowComponent>(
  ({
    class: className,
    justify,
    alignItems,
    gap,
    gapSm,
    gapMd,
    gapLg,
    gapXl,
    marginBottom,
    column,
    noWrap,
    ref,
  }) => {
    useStyles$(styles);

    return (
      <div
        style={{ marginBottom }}
        class={[
          className,
          'row',
          noWrap && 'row--no-wrap',
          gap && `row--gap-${gap}`,
          gapSm && `row--gap-sm-${gapSm}`,
          gapMd && `row--gap-md-${gapMd}`,
          gapLg && `row--gap-lg-${gapLg}`,
          gapXl && `row--gap-xl-${gapXl}`,
          justify && `row__justify-${justify}`,
          alignItems && `row__align-${alignItems}`,
          column && 'row--flex-column',
        ]}
        ref={ref}>
        <Slot />
      </div>
    );
  },
);

export default Row;
