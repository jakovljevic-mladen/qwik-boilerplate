import {
  component$,
  Slot,
  useStyles$,
  QRL,
  ClassList,
  ButtonHTMLAttributes,
} from '@builder.io/qwik';
import styles from './Button.scss?inline';
import LoadingSpinner from '~/components/ui/LoadingSpinner/LoadingSpinner';
import { IconName } from '~/components/icons/types';
import Svg from '~/components/icons/Svg';

export type ButtonVariations = 'primary' | 'secondary' | 'transparent' | 'link' | 'danger';

export type ButtonSizes = 'large' | 'medium' | 'small';

export type ButtonProps = {
  class?: ClassList;
  noPadding?: boolean;
  onClick$?: QRL<(event: MouseEvent) => void>;
  variation?: ButtonVariations;
  fullWidth?: boolean;
  size?: ButtonSizes;
  disabled?: boolean;
  loading?: boolean;
  attributes?: ButtonHTMLAttributes<HTMLButtonElement>;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  noWrapContent?: boolean;
};

const Button = component$<ButtonProps>(
  ({
    noPadding,
    onClick$,
    variation = 'primary',
    fullWidth,
    size = 'medium',
    disabled = false,
    loading,
    attributes,
    class: className,
    icon,
    iconPosition = 'left',
    noWrapContent,
  }) => {
    useStyles$(styles);

    return (
      <button
        type="button"
        {...attributes}
        class={[
          'button',
          noPadding && 'button--no-padding',
          `button--${variation}`,
          fullWidth && 'button--full-width',
          `button--${size}`,
          noWrapContent && 'button--no-wrap',
          className,
        ]}
        onClick$={onClick$}
        disabled={disabled || loading}>
        {icon && iconPosition === 'left' && !loading && (
          <Svg name={icon} class="button__icon button__icon-left" />
        )}
        {!loading && <Slot />}
        {loading && <LoadingSpinner />}
        {icon && iconPosition === 'right' && !loading && (
          <Svg name={icon} class="button__icon button__icon-right" />
        )}
      </button>
    );
  },
);

export default Button;
