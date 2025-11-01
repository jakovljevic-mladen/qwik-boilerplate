import { screen, render } from '@noma.to/qwik-testing-library';
import Row from '~/components/ui/grid/Row';
import Column from '~/components/ui/grid/Column';

suite('Row/Column', () => {
  test('should have two children', async () => {
    await render(
      <Row>
        <Column />
        <Column />
      </Row>,
    );
    const row = screen.getByTestId('row');
    expect(row.children.length).toBe(2);
  });

  test('should apply gap classes', async () => {
    await render(<Row gap="md" gapSm="sm" gapMd="lg" />);
    const row = screen.getByTestId('row');
    expect(row).toHaveClass('row--gap-md');
    expect(row).toHaveClass('row--gap-sm-sm');
    expect(row).toHaveClass('row--gap-md-lg');
  });

  test('should apply justify and alignItems classes', async () => {
    await render(<Row justify="center" alignItems="flex-end" />);
    const row = screen.getByTestId('row');
    expect(row).toHaveClass('row__justify-center');
    expect(row).toHaveClass('row__align-flex-end');
  });

  test('should apply noWrap class when noWrap is true', async () => {
    await render(<Row noWrap={true} />);
    const row = screen.getByTestId('row');
    expect(row).toHaveClass('row--no-wrap');
  });

  test('should set marginBottom style', async () => {
    const marginBottomValue = 32;
    await render(<Row marginBottom={marginBottomValue} />);
    const row = screen.getByTestId('row');
    expect(row).toHaveStyle(`margin-bottom: ${marginBottomValue}px`);
  });

  test('should apply column class when column is true', async () => {
    await render(<Row column={true} />);
    const row = screen.getByTestId('row');
    expect(row).toHaveClass('row--flex-column');
  });

  test('should apply size classes to Column', async () => {
    await render(<Column size={6} sm={12} md={8} lg={4} xl={3} />);
    const column = screen.getByTestId('column');
    expect(column).toHaveClass('column--6');
    expect(column).toHaveClass('column--sm-12');
    expect(column).toHaveClass('column--md-8');
    expect(column).toHaveClass('column--lg-4');
    expect(column).toHaveClass('column--xl-3');
  });

  test('should apply grow class when grow is true', async () => {
    await render(<Column grow={true} />);
    const column = screen.getByTestId('column');
    expect(column).toHaveClass('column--grow');
  });

  test('should set marginBottom style on Column', async () => {
    const marginBottomValue = 24;
    await render(<Column marginBottom={marginBottomValue} />);
    const column = screen.getByTestId('column');
    expect(column).toHaveStyle(`margin-bottom: ${marginBottomValue}px`);
  });

  test('should render children inside Row', async () => {
    const childText = 'Row Child';
    await render(
      <Row>
        <div>{childText}</div>
      </Row>,
    );
    const row = screen.getByTestId('row');
    expect(row).toHaveTextContent(childText);
  });

  test('should render children inside Column', async () => {
    const childText = 'Test Child';
    await render(
      <Column>
        <div>{childText}</div>
      </Column>,
    );
    const column = screen.getByTestId('column');
    expect(column).toHaveTextContent(childText);
  });

  test('should handle multiple Columns inside Row', async () => {
    const columnCount = 3;
    await render(
      <Row>
        {Array.from({ length: columnCount }).map((_, index) => (
          <Column key={index} />
        ))}
      </Row>,
    );
    const row = screen.getByTestId('row');
    expect(row.children.length).toBe(columnCount);
  });

  test('should combine Row and Column props correctly', async () => {
    await render(
      <Row gap="lg" justify="space-between" alignItems="center">
        <Column size={4} grow={true} marginBottom={10} />
        <Column size={8} sm={12} />
      </Row>,
    );
    const row = screen.getByTestId('row');
    expect(row).toHaveClass('row--gap-lg');
    expect(row).toHaveClass('row__justify-space-between');
    expect(row).toHaveClass('row__align-center');

    const [firstColumn, secondColumn] = row.children;
    expect(firstColumn).toHaveClass('column--4');
    expect(firstColumn).toHaveClass('column--grow');
    expect(firstColumn).toHaveStyle('margin-bottom: 10px');

    expect(secondColumn).toHaveClass('column--8');
    expect(secondColumn).toHaveClass('column--sm-12');
  });

  test('should apply custom class names to Row and Column', async () => {
    const rowClass = 'custom-row-class';
    const columnClass = 'custom-column-class';
    await render(
      <Row class={rowClass}>
        <Column class={columnClass} />
      </Row>,
    );
    const row = screen.getByTestId('row');
    expect(row).toHaveClass(rowClass);

    const column = screen.getByTestId('column');
    expect(column).toHaveClass(columnClass);
  });

  test('should combine all props correctly in a complex layout', async () => {
    await render(
      <Row
        gapXl="xl"
        justify="space-evenly"
        alignItems="stretch"
        noWrap={true}
        marginBottom={20}
        column={true}
        class="complex-row">
        <Column
          size={3}
          sm={6}
          md={4}
          lg={3}
          xl={2}
          grow={true}
          marginBottom={15}
          class="complex-column-1"
        />
        <Column size={9} sm={6} md={8} lg={9} xl={10} class="complex-column-2" />
      </Row>,
    );
    const row = screen.getByTestId('row');
    expect(row).toHaveClass('row--gap-xl-xl');
    expect(row).toHaveClass('row__justify-space-evenly');
    expect(row).toHaveClass('row__align-stretch');
    expect(row).toHaveClass('row--no-wrap');
    expect(row).toHaveStyle('margin-bottom: 20px');
    expect(row).toHaveClass('row--flex-column');
    expect(row).toHaveClass('complex-row');

    const [firstColumn, secondColumn] = row.children;
    expect(firstColumn).toHaveClass('column--3');
    expect(firstColumn).toHaveClass('column--sm-6');
    expect(firstColumn).toHaveClass('column--md-4');
    expect(firstColumn).toHaveClass('column--lg-3');
    expect(firstColumn).toHaveClass('column--xl-2');
    expect(firstColumn).toHaveClass('column--grow');
    expect(firstColumn).toHaveStyle('margin-bottom: 15px');
    expect(firstColumn).toHaveClass('complex-column-1');

    expect(secondColumn).toHaveClass('column--9');
    expect(secondColumn).toHaveClass('column--sm-6');
    expect(secondColumn).toHaveClass('column--md-8');
    expect(secondColumn).toHaveClass('column--lg-9');
    expect(secondColumn).toHaveClass('column--xl-10');
    expect(secondColumn).toHaveClass('complex-column-2');
  });
});
