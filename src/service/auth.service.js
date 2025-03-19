import { hexAxios } from "./axios";

export const authService = {
    // 登入
    async login (account) {
        try {
            const res = await hexAxios.post('/admin/signin', account);
            const result = res.data;
            if (!result.success) {
                return {
                    isSuccess: false,
                    msg: result.message
                }
            }
            document.cookie = `ctoken=${result.token}; expires=${new Date(result.expired)}; path=/`;
            return {
                isSuccess: true,
                msg: result.message
            };
        } catch (error) {
            return {
                isSuccess: false,
                msg: error.response.data.message
            };
        }
    },
    // 登入驗證
    async loginCheck () {
        const res = await hexAxios.post('/api/user/check');
        return res.data.success;
    },
    // 登出
    async logout () {
        try {
            const res = await hexAxios.post('/logout');
            const result = res.data;
            return {
                isSuccess: true,
                msg: result.message
            };
        } catch (error) {
            return {
                isSuccess: false,
                msg: error.response.data.message
            };
        }
    }
}