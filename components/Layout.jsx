import { NavLink, Outlet } from "react-router";

const Layout = () => {
    const isActiveClass = (style) => {
        return style.isActive ? 'header-nav-active' : ''
    };
    return (<>
        <div className="container my-3">
            <NavLink to="/" className={isActiveClass}>首頁</NavLink>
            <div className="py-3">
                <Outlet />
            </div>
        </div>
    </>)
};

export default Layout;