import { NavLink, Outlet } from "react-router";

const AdminLayout = () => {
    const isActiveClass = (style) => {
        return style.isActive ? 'header-nav-active' : ''
    };
    return (<>
        <NavLink to="/admin/products" className={isActiveClass}>商品管理</NavLink>
        <Outlet />
    </>)
};

export default AdminLayout;