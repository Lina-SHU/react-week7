import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router';
import 'bootstrap';
import './assets/scss/all.scss';
import routes from './routes';
import { store } from './store';
import { Provider } from 'react-redux';
const router = createHashRouter(routes);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
