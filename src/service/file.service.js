import { hexAxios } from "./axios";
const apiPath = import.meta.env.VITE_API_PATH;

export const productService = {
    // 圖片上傳
    async updatePhoto (formdata) {
        try {
            const res = await hexAxios.post(`/api/${apiPath}/admin/upload`, formdata);
            const result = res.data;
            if (!result.success) {
                return {
                    isSuccess: false,
                    msg: res.message
                }
            }
            return {
                isSuccess: true,
                data: result.data
            };
        } catch (error) {
            return {
                isSuccess: false,
                msg: error.response.data.message
            };
        }
    }
}