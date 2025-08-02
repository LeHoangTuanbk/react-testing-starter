import { render, screen } from '@testing-library/react';
import { CartProvider } from '../../src/providers/CartProvider';
import QuantitySelector from '../../src/components/QuantitySelector';
import { Product } from '../../src/entities';
import userEvent from '@testing-library/user-event';

describe('QuantitySelect', () => {
  const renderComponent = () => {
    const product: Product = {
      id: 1,
      name: 'Milk',
      price: 5,
      categoryId: 1,
    };

    render(
      <CartProvider>
        <QuantitySelector product={product} />
      </CartProvider>
    );

    const getAddToCartButton = () =>
      screen.queryByRole('button', { name: /add to cart/i });
    const getQuantityControls = () => ({
      quantity: screen.queryByRole('status'),
      decrementButton: screen.queryByRole('button', { name: '-' }),
      incrementButton: screen.queryByRole('button', { name: '+' }),
    });

    const user = userEvent.setup();

    const addToCart = async () => {
      const button = getAddToCartButton();
      await user.click(button!);
    };

    const incrementQuantity = async () => {
      const { incrementButton } = getQuantityControls();
      await user.click(incrementButton!);
    };

    const decrementQuantity = async () => {
      const { decrementButton } = getQuantityControls();
      await user.click(decrementButton!);
    };

    return {
      getAddToCartButton,
      getQuantityControls,
      user,
      addToCart,
      incrementQuantity,
      decrementQuantity,
    };
  };

  it('should render the Add to Card button', () => {
    const { getAddToCartButton } = renderComponent();
    screen.debug();

    expect(getAddToCartButton()).toBeInTheDocument();
  });

  it('should add the product to the card', async () => {
    const { getAddToCartButton, addToCart, getQuantityControls } =
      renderComponent();

    await addToCart();

    const { quantity, incrementButton, decrementButton } =
      getQuantityControls();

    expect(quantity).toHaveTextContent('1');
    expect(decrementButton).toBeInTheDocument();
    expect(incrementButton).toBeInTheDocument();
    expect(getAddToCartButton()).not.toBeInTheDocument();
  });

  it('should increment the quantity', async () => {
    const { incrementQuantity, addToCart, getQuantityControls } =
      renderComponent();

    await addToCart();

    await incrementQuantity();
    const { quantity } = getQuantityControls();

    expect(quantity).toHaveTextContent('2');
  });

  it.todo('should decrement the quantity', () => {});

  it.todo('should remove the product from the cart');
});
