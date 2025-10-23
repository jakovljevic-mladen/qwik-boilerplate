import { component$ } from '@builder.io/qwik';
import { IconName, SvgIconProps } from '~/components/icons/types';
import ThreeDotsHorizontal from '~/components/icons/ThreeDotsHorizontal';
import ThreeDotsVertical from '~/components/icons/ThreeDotsVertical';
import X from '~/components/icons/X';

type SvgProps = SvgIconProps & {
  name: IconName;
};

const Svg = component$<SvgProps>(({ name, width, height, class: className }) => {
  switch (name) {
    case 'three-dots-horizontal':
      return <ThreeDotsHorizontal width={width} height={height} class={className} />;
    case 'three-dots-vertical':
      return <ThreeDotsVertical width={width} height={height} class={className} />;
    case 'x':
      return <X width={width} height={height} class={className} />;
  }
});

export default Svg;
