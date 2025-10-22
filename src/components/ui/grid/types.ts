import { Signal } from '@builder.io/qwik';

export type Ref = Signal<HTMLDivElement | undefined> | ((el: Element) => void) | undefined;
