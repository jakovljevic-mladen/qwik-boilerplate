import { ClassList } from '@builder.io/qwik';

export type TypographyAlignments = 'left' | 'center' | 'right';

export interface TypographyDefault {
  marginBottom?: number;
  color?: string;
  class?: ClassList;
  align?: TypographyAlignments;
}
