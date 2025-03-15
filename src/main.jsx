import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router';
import 'bootstrap';
import './assets/scss/all.scss';
import routes from '../routes';
const router = createHashRouter(routes);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
