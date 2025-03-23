import { NavLink, Outlet } from "react-router";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authService } from "../service/auth.service";
import { addToast } from "../slice/toastSlice";
import Toast from "./Toast";

const AdminLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isActiveClass = (style) => {
        return style.isActive ? 'header-nav-active' : ''
    };

    const logout = async (e) => {
        e.preventDefault();
        try {
            const res = await authService.logout();
            if (!res.isSuccess) {
                dispatch(addToast({
                    title: '錯誤',
                    text: res.msg,
                    status: 'danger'
                }));
                return
            }
            dispatch(addToast({
                title: '成功',
                text: '登出成功',
                status: 'success'
            }));
            navigate('/');
        } finally {
            // add loading
        }
    };
    return (<>
        <div className="container my-3">
            <NavLink to="/admin/products" className={isActiveClass}>商品管理</NavLink> | 
            <a href="#" onClick={(e) => logout(e)}>登出</a>
            <div className="py-3">
                <Outlet />
            </div>

            {/* toast 訊息 */}
            <Toast />
        </div>
    </>)
};

export default AdminLayout;