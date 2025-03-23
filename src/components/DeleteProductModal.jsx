import { memo } from "react";
import { productService } from "../service/product.service";
import { useDispatch } from "react-redux";
import { addToast } from "../slice/toastSlice";
import { toggleLoading } from "../slice/loadingSlice";

const DeleteProductModal = memo(({ deleteProductModalRef, closeDeleteModal, tempDeleteProduct, getProducts }) => {
    const dispatch = useDispatch();

    const deleteProduct = async () => {
        try {
            dispatch(toggleLoading());
            const res = await productService.deleteProduct(tempDeleteProduct.id);
            if (!res.isSuccess) {
                dispatch(addToast({
                    title: '錯誤',
                    text: res.msg,
                    status: 'danger'
                }));
                return;
            }
            dispatch(addToast({
                title: '成功',
                text: res.msg,
                status: 'success'
            }));
            closeDeleteModal();
            getProducts();
        } finally {
            dispatch(toggleLoading());
        }
    };
    return (<>
        <div className="modal fade" ref={deleteProductModalRef} id="deleteProductModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-danger">
                        <h1 className="modal-title fs-5 text-white">商品刪除</h1>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeDeleteModal}></button>
                    </div>
                    <div className="modal-body">
                        確認是否刪除 {tempDeleteProduct.title}？
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" onClick={closeDeleteModal}>關閉</button>
                        <button type="button" className="btn btn-sm btn-danger" onClick={deleteProduct}>刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
});

export default DeleteProductModal;