import styles from './LoadingSpinner.scss?inline';
import { component$, useStyles$ } from '@builder.io/qwik';

const LoadingSpinner = component$(() => {
  useStyles$(styles);

  return (
    <svg class="spinner" viewBox="0 0 50 50">
      <circle class="circle" cx="25" cy="25" r="20" />
    </svg>
  );
});

export default LoadingSpinner;
