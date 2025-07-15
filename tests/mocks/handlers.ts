import { http, HttpResponse } from 'msw';
import { products } from './data';

export const handlers = [
  http.get('/categories', () => {
    return HttpResponse.json(products);
  }),

  http.get('/products', () => {
    return HttpResponse.json([
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
      { id: 3, name: 'Product 3' },
    ]);
  }),

  http.get('/products/:id', ({ params }) => {
    const id = parseInt(params.id as string);
    const product = products.find((p) => p.id === id);
    if (!product) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(product);
  }),
];
