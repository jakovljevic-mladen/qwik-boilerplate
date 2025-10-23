import { component$ } from '@builder.io/qwik';
import { SvgIconProps } from '~/components/icons/types';

const X = component$<SvgIconProps>(({ width = 24, height = 24, class: className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width={width}
    height={height}
    class={className}>
    <g transform="rotate(45 50 50)">
      <rect x="45" y="20" width="10" height="60" fill="currentColor" />
      <rect x="20" y="45" width="60" height="10" fill="currentColor" />
    </g>
  </svg>
));

export default X;
