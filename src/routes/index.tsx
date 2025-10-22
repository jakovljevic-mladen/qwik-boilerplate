import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import AuthorizationButton from '~/components/AuthorizationButton';
import Row from '~/components/ui/grid/Row';
import Column from '~/components/ui/grid/Column';
import Heading from '~/components/ui/typography/Heading';
import Paragraph from '~/components/ui/typography/Paragraph';

// noinspection JSUnusedGlobalSymbols
export default component$(() => {
  return (
    <>
      <Heading size={1}>Hi 👋</Heading>
      <Row justify="space-around">
        <Column>
          <Paragraph>Can't wait to see what you build with qwik!</Paragraph>
        </Column>
        <Column>
          <Paragraph>Happy coding.</Paragraph>
        </Column>
      </Row>
      <AuthorizationButton />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
