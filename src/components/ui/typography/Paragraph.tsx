import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { TypographyDefault } from './types';
import styles from './Paragraph.scss?inline';

interface ParagraphComponent extends TypographyDefault {
  weight?: 'thin' | 'light' | 'medium' | 'regular' | 'bold';
  size?: 1 | 2 | 3 | 4 | 5;
}

const Paragraph = component$<ParagraphComponent>(
  ({ weight = 'light', size = 2, color, class: className, marginBottom = 12, align = 'left' }) => {
    useStyles$(styles);

    return (
      <p
        style={{ marginBottom, color }}
        class={[
          'paragraph',
          `paragraph--align-${align}`,
          `paragraph--${weight}`,
          `paragraph--${size}`,
          className,
        ]}>
        <Slot />
      </p>
    );
  },
);

export default Paragraph;
