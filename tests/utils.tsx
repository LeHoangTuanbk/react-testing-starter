import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import routes from '../src/routes';
import { render } from '@testing-library/react';

export const navigateTo = (path: string) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [path],
  });

  return render(<RouterProvider router={router} />);
};
