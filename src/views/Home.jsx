import { useForm } from "react-hook-form";
import { authService } from "../service/auth.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onTouched'
    });
    const onSubmit = async (data) => {
        try {
            const res = await authService.login(data);
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
            navigate('/admin/products');
        } finally {
            // add loading
        }
    };

    // 登入驗證
    const loginCheck = async () => {
        try {
            const res = await authService.loginCheck();
            return res
        } finally {
            // add loading
        }
    };

    useEffect(() => {
        async () => {
            if (await loginCheck()) {
                navigate('/admin/products');
            }
        }
    }, []);
    return (<>
        <div className="row justify-content-center">
            <div className="col-6">
                <h2 className="h4 text-center">請先登入</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className={`form-control ${errors.username && 'is-invalid'}`}
                            id="email"
                            placeholder="請輸入信箱"
                            {...register('username', {
                                required: {
                                    value: true,
                                    message: '信箱為必填'
                                },
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: '信箱格式不正確'
                                }
                            })}
                        />
                        <label htmlFor="email">信箱</label>
                        {
                            errors.username && <div className="invalid-feedback">{errors.username.message}</div>
                        }
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className={`form-control ${errors.password && 'is-invalid'}`}
                            id="password"
                            placeholder="請輸入密碼"
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: '密碼為必填'
                                },
                                minLength: {
                                    value: 6,
                                    message: '長度不小於 6 碼'
                                }
                            })}
                        />
                        <label htmlFor="password">密碼</label>
                        {
                            errors.password && <div className="invalid-feedback">{errors.password.message}</div>
                        }
                    </div>
                    <button type="submit" className="btn btn-primary py-2 w-100">登入</button>
                </form>
            </div>
        </div>
    </>)
};

export default Home;