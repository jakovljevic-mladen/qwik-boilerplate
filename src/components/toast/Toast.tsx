import { component$, useStyles$ } from '@builder.io/qwik';
import Row from '../ui/grid/Row';
import styles from './Toast.scss?inline';
import { toast } from 'qwik-sonner';
import Button from '~/components/ui/Button/Button';
import Svg from '../icons/Svg';

interface ToastProps {
  id: string | number;
  message?: string;
}

export default component$<ToastProps>(({ id, message }) => {
  useStyles$(styles);

  return (
    <Row class="content" justify="space-between" alignItems="center">
      {message}
      <Button class="close" variation="link" noPadding onClick$={() => toast.dismiss(id)}>
        <Svg name="x" />
      </Button>
    </Row>
  );
});
