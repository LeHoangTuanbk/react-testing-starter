import { render, screen } from '@testing-library/react';
import ProductForm from '../../src/components/ProductForm';
import AllProviders from '../AllProviders';
import { Category, Product } from '../../src/entities';
import { db } from '../mocks/db';

describe('ProductForm', () => {
  let category: Category;

  beforeAll(() => {
    category = db.category.create();
  });

  afterAll(() => {
    db.category.delete({ where: { id: { equals: category.id } } });
  });

  const renderComponents = (product?: Product) => {
    render(<ProductForm product={product} onSubmit={vi.fn()} />, {
      wrapper: AllProviders,
    });

    return {
      waitForFormToLoad: () => screen.findByRole('form'),
      getInputs: () => {
        return {
          nameInput: screen.getByPlaceholderText(/name/i),
          priceInput: screen.getByPlaceholderText(/price/i),
          categoryInput: screen.getByRole('combobox', { name: /category/i }),
        };
      },
    };
  };

  it('should render form fields', async () => {
    renderComponents();
    const { waitForFormToLoad, getInputs } = renderComponents();

    await waitForFormToLoad();

    expect(getInputs().nameInput).toBeInTheDocument();

    expect(getInputs().priceInput).toBeInTheDocument();

    expect(getInputs().categoryInput).toBeInTheDocument();
  });

  it('should populate form fields when editing a product', async () => {
    const product: Product = {
      id: 1,
      name: 'Bread',
      price: 10,
      categoryId: category.id,
    };

    const { waitForFormToLoad, getInputs } = renderComponents(product);

    await waitForFormToLoad();

    expect(getInputs().nameInput).toHaveValue(product.name);

    expect(getInputs().priceInput).toHaveValue(product.price.toString());
    //TODO: will check
    screen.debug(screen.getByRole('combobox', { name: /category/i }));
    expect(
      screen.getByRole('combobox', { name: /category/i })
    ).toHaveTextContent(category.name);
  });
});
