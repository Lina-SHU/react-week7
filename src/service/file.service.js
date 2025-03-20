import { hexAxios } from "./axios";
const apiPath = import.meta.env.VITE_API_PATH;

export const fileService = {
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
                data: result.imageUrl
            };
        } catch (error) {
            return {
                isSuccess: false,
                msg: error.response.data.message
            };
        }
    }
}