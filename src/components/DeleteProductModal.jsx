import { productService } from "../service/product.service";
import Swal from "sweetalert2";

const DeleteProductModal = ({ deleteProductModalRef, closeDeleteModal, tempProduct, getProducts }) => {
    const deleteProduct = async () => {
        try {
            const res = await productService.deleteProduct(tempProduct.id);
            if (!res.isSuccess) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: res.msg,
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.msg,
                showConfirmButton: false,
                timer: 1500
            });
            closeDeleteModal();
            getProducts();
        } finally {
            // add loading
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
                        確認是否刪除 {tempProduct.title}？
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" onClick={closeDeleteModal}>關閉</button>
                        <button type="button" className="btn btn-sm btn-danger" onClick={deleteProduct}>刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
};

export default DeleteProductModal;