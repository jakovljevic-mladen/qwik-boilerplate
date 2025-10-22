import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { TypographyDefault } from './types';
import styles from './Heading.scss?inline';

interface HeadingComponent extends TypographyDefault {
  id?: string;
  weight?: 'regular' | 'bold';
  size: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading = component$<HeadingComponent>(
  ({ id, size, weight = 'regular', color, class: className, marginBottom = 8, align = 'left' }) => {
    useStyles$(styles);
    const style = {
      marginBottom,
      color,
    };
    const classes = [
      'heading',
      `heading--${weight}`,
      `heading--size-${size}`,
      `heading--align-${align}`,
      className,
    ];

    switch (size) {
      case 1:
        return (
          <h1 id={id} style={style} class={classes}>
            <Slot />
          </h1>
        );
      case 2:
        return (
          <h2 id={id} style={style} class={classes}>
            <Slot />
          </h2>
        );
      case 3:
        return (
          <h3 id={id} style={style} class={classes}>
            <Slot />
          </h3>
        );
      case 4:
        return (
          <h4 id={id} style={style} class={classes}>
            <Slot />
          </h4>
        );
      case 5:
        return (
          <h5 id={id} style={style} class={classes}>
            <Slot />
          </h5>
        );
      case 6:
        return (
          <h6 id={id} style={style} class={classes}>
            <Slot />
          </h6>
        );
      default:
        return null;
    }
  },
);

export default Heading;
