import { NavLink, Outlet } from "react-router";

const Layout = () => {
    const isActiveClass = (style) => {
        return style.isActive ? 'header-nav-active' : ''
    };
    return (<>
        <NavLink to="/" className={isActiveClass}>首頁</NavLink>
        <Outlet />
    </>)
};

export default Layout;