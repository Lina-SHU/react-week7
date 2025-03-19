import { hexAxios } from "./axios";
const apiPath = import.meta.env.VITE_API_PATH;

export const productService = {
    // 取得商品列表
    async getProducts (page = 1) {
        try {
            const res = await hexAxios.get(`/api/${apiPath}/admin/products?page=${page}`);
            const result = res.data;
            if (!result.success) {
                return {
                    isSuccess: false,
                    msg: res.message
                }
            }
            return {
                isSuccess: true,
                data: res.data
            };
        } catch (error) {
            return {
                isSuccess: false,
                msg: error.response.data.message
            };
        }
    },
    // 新增商品
    async addProduct (product) {
        try {
            const res = await hexAxios.post(`/api/${apiPath}/admin/product`, { data: product });
            const result = res.data;
            if (!result.success) {
                return {
                    isSuccess: false,
                    msg: res.message
                }
            }
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
    // 編輯商品
    async editProduct (product) {
        try {
            const res = await hexAxios.put(`/api/${apiPath}/admin/product/${product.id}`, { data: product });
            const result = res.data;
            if (!result.success) {
                return {
                    isSuccess: false,
                    msg: res.message
                }
            }
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
    // 刪除商品
    async deleteProduct (productId) {
        try {
            const res = await hexAxios.delete(`/api/${apiPath}/admin/product/${productId}`);
            const result = res.data;
            if (!result.success) {
                return {
                    isSuccess: false,
                    msg: res.message
                }
            }
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
}