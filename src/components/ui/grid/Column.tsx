import { component$, Slot, useStyles$, ClassList } from '@builder.io/qwik';
import styles from './Column.scss?inline';
import { Ref } from './types';

export type ColumnSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';

export interface ColumnComponent {
  size?: ColumnSizes;
  sm?: ColumnSizes;
  md?: ColumnSizes;
  lg?: ColumnSizes;
  xl?: ColumnSizes;
  class?: ClassList;
  marginBottom?: number;
  grow?: boolean;
  ref?: Ref;
}

const Column = component$<ColumnComponent>(
  ({ marginBottom = 0, class: className, size, sm, md, lg, xl, grow, ref }) => {
    useStyles$(styles);

    return (
      <div
        style={{ marginBottom }}
        class={[
          'column',
          grow && 'column--grow',
          className,
          size && `column--${size}`,
          sm && `column--sm-${sm}`,
          md && `column--md-${md}`,
          lg && `column--lg-${lg}`,
          xl && `column--xl-${xl}`,
        ]}
        ref={ref}>
        <Slot />
      </div>
    );
  },
);

export default Column;
