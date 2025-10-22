import { component$ } from '@builder.io/qwik';
import { SvgIconProps } from '~/components/icons/types';

const ThreeDotsHorizontal = component$<SvgIconProps>(
  ({ width = 24, height = 24, class: className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      width={width}
      height={height}
      class={className}>
      <circle cx="5" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="19" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
);

export default ThreeDotsHorizontal;
