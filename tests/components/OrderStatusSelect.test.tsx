import { Theme } from '@radix-ui/themes';
import { render, screen } from '@testing-library/react';
import OrderStatusSelector from '../../src/components/OrderStatusSelector';
import userEvent from '@testing-library/user-event';
import { late } from 'zod';

describe('OrderStatusSelector', () => {
  it('should render New as the default value', async () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    );

    const button = screen.getByRole('combobox');

    expect(button).toHaveTextContent(/new/i);
  });

  it('should render correct statuses', async () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    );

    const button = screen.getByRole('combobox');

    expect(button).toHaveTextContent(/new/i);

    const user = userEvent.setup();
    await user.click(button);

    const options = await screen.findAllByRole('option');

    expect(options.length).toBe(3);

    const optionLabels = options.map((option) => option.textContent);

    expect(optionLabels).toEqual(['New', 'Processed', 'Fulfilled']);
  });
});
