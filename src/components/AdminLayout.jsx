import { NavLink, Outlet } from "react-router";
import { useNavigate } from "react-router";
import { authService } from "../service/auth.service";
import Swal from "sweetalert2";

const AdminLayout = () => {
    const navigate = useNavigate();
    const isActiveClass = (style) => {
        return style.isActive ? 'header-nav-active' : ''
    };

    const logout = async () => {
        try {
            const res = await authService.logout();
            if (!res.isSuccess) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: res.msg,
                    showConfirmButton: false,
                    timer: 1500
                });
                return
            }
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.msg,
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        } finally {
            // add loading
        }
    };
    return (<>
        <div className="container my-3">
            <NavLink to="/admin/products" className={isActiveClass}>商品管理</NavLink> | 
            <a href="#" onClick={logout}>登出</a>
            <div className="py-3">
                <Outlet />
            </div>
        </div>
    </>)
};

export default AdminLayout;