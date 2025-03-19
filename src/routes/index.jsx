import Layout from "../components/Layout";
import AdminLayout from "../components/AdminLayout";
import Home from "../views/Home";
import AdminProduct from "../views/admin/Products";

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Home />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: 'products',
                element: <AdminProduct />
            }
        ]
    }
];

export default routes;