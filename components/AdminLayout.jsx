import { NavLink, Outlet } from "react-router";

const AdminLayout = () => {
    const isActiveClass = (style) => {
        return style.isActive ? 'header-nav-active' : ''
    };
    return (<>
        <div className="container my-3">
            <NavLink to="/admin/products" className={isActiveClass}>商品管理</NavLink>
            <div className="py-3">
                <Outlet />
            </div>
        </div>
    </>)
};

export default AdminLayout;