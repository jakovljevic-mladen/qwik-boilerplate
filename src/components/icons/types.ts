import { ClassList } from '@builder.io/qwik';

// prettier-ignore
export type IconName =
  | 'three-dots-horizontal'
  | 'three-dots-vertical'
  | 'x'
  ;

export interface SvgIconProps {
  class?: ClassList;
  width?: number | string;
  height?: number | string;
}
