import { Theme } from '@radix-ui/themes';
import { render, screen } from '@testing-library/react';
import OrderStatusSelector from '../../src/components/OrderStatusSelector';
import userEvent from '@testing-library/user-event';

describe('OrderStatusSelector', () => {
  const renderComponent = () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    );

    return {
      trigger: screen.getByRole('combobox'),
      getOptions: () => screen.findAllByRole('option'),
    };
  };

  it('should render New as the default value', async () => {
    const { trigger } = renderComponent();
    expect(trigger).toHaveTextContent(/new/i);
  });

  it('should render correct statuses', async () => {
    const { trigger, getOptions } = renderComponent();

    const user = userEvent.setup();
    await user.click(trigger);

    const options = await getOptions();

    const optionLabels = options.map((option) => option.textContent);

    expect(optionLabels).toEqual(['New', 'Processed', 'Fulfilled']);
  });
});
