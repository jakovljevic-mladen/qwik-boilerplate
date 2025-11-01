import { userEvent } from '@testing-library/user-event';
import { render, screen } from '@noma.to/qwik-testing-library';
import Button from '~/components/ui/Button/Button';

describe('Button', () => {
  it('should render button', async () => {
    await render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
  });

  it('should apply primary variation classes', async () => {
    await render(<Button variation="primary">Primary Button</Button>);

    const button = screen.getByRole('button', { name: 'Primary Button' });
    expect(button).toHaveClass('button--primary');

    await render(<Button variation="secondary">Secondary Button</Button>);
    const buttonSecondary = screen.getByRole('button', { name: 'Secondary Button' });
    expect(buttonSecondary).toHaveClass('button--secondary');

    await render(<Button variation="transparent">Transparent Button</Button>);
    const buttonTransparent = screen.getByRole('button', { name: 'Transparent Button' });
    expect(buttonTransparent).toHaveClass('button--transparent');

    await render(<Button variation="link">Link Button</Button>);
    const buttonLink = screen.getByRole('button', { name: 'Link Button' });
    expect(buttonLink).toHaveClass('button--link');

    await render(<Button variation="danger">Danger Button</Button>);
    const buttonDanger = screen.getByRole('button', { name: 'Danger Button' });
    expect(buttonDanger).toHaveClass('button--danger');
  });

  it('should be disabled when disabled prop is true', async () => {
    await render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });

  it('should show loading state when loading prop is true', async () => {
    await render(<Button loading>Loading Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.querySelector('.spinner')).toBeInTheDocument();
  });

  it('should render icon when icon prop is provided', async () => {
    await render(<Button icon="three-dots-vertical">Button with Icon</Button>);

    const button = screen.getByRole('button', { name: 'Button with Icon' });
    expect(button.querySelector('svg')).toBeInTheDocument();

    await render(
      <Button icon="three-dots-vertical" iconPosition="right">
        Button with Right Icon
      </Button>,
    );
    const buttonRightIcon = screen.getByRole('button', { name: 'Button with Right Icon' });
    expect(buttonRightIcon.querySelector('svg')).toBeInTheDocument();
  });

  it('should render button with icon only when no child content is provided', async () => {
    await render(<Button icon="three-dots-vertical" />);

    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('should apply fullWidth class when fullWidth prop is true', async () => {
    await render(<Button fullWidth>Full Width Button</Button>);

    const button = screen.getByRole('button', { name: 'Full Width Button' });
    expect(button).toHaveClass('button--full-width');
  });

  it('should apply size classes correctly', async () => {
    await render(<Button size="large">Large Button</Button>);
    let button = screen.getByRole('button', { name: 'Large Button' });
    expect(button).toHaveClass('button--large');

    await render(<Button size="medium">Medium Button</Button>);
    button = screen.getByRole('button', { name: 'Medium Button' });
    expect(button).toHaveClass('button--medium');

    await render(<Button size="small">Small Button</Button>);
    button = screen.getByRole('button', { name: 'Small Button' });
    expect(button).toHaveClass('button--small');
  });

  it('should not wrap content when noWrapContent prop is true', async () => {
    await render(<Button noWrapContent>Non-wrapping Button</Button>);

    const button = screen.getByRole('button', { name: 'Non-wrapping Button' });
    expect(button).toHaveClass('button--no-wrap');
  });

  it('should apply custom class names', async () => {
    const customClass = 'custom-button-class';
    await render(<Button class={customClass}>Button with Custom Class</Button>);

    const button = screen.getByRole('button', { name: 'Button with Custom Class' });
    expect(button).toHaveClass(customClass);
  });

  it('should not have padding when noPadding prop is true', async () => {
    await render(<Button noPadding>Button without Padding</Button>);

    const button = screen.getByRole('button', { name: 'Button without Padding' });
    expect(button).toHaveClass('button--no-padding');
  });

  it('should pass additional attributes to the button element', async () => {
    await render(
      <Button attributes={{ type: 'submit', title: 'Custom Button Title' }}>
        Button with Attributes
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Button with Attributes' });
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('title', 'Custom Button Title');
  });

  it('should handle onClick event', async () => {
    const handleClick = vi.fn();
    // eslint-disable-next-line qwik/valid-lexical-scope
    await render(<Button onClick$={handleClick}>Clickable Button</Button>);

    const button = screen.getByRole('button', { name: 'Clickable Button' });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('should not trigger onClick when disabled', async () => {
    const handleClick = vi.fn();

    await render(
      // eslint-disable-next-line qwik/valid-lexical-scope
      <Button onClick$={handleClick} disabled>
        Disabled Clickable Button
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Disabled Clickable Button' });
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should not trigger onClick when loading', async () => {
    const handleClick = vi.fn();

    await render(
      // eslint-disable-next-line qwik/valid-lexical-scope
      <Button onClick$={handleClick} loading>
        Loading Clickable Button
      </Button>,
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should handle multiple clicks', async () => {
    const handleClick = vi.fn();
    // eslint-disable-next-line qwik/valid-lexical-scope
    await render(<Button onClick$={handleClick}>Multi-click Button</Button>);

    const button = screen.getByRole('button', { name: 'Multi-click Button' });
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(3);
  });
});
