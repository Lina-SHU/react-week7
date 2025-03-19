import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { productService } from "../../service/product.service";
import Swal from "sweetalert2";
import Pagination from "../../../components/Pagination";

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [tempProduct, setTempProduct] = useState([]);
    const productModalRef = useRef(null);
    const productModal = useRef(null);
    const deleteProductModalRef = useRef(null);
    const deleteProductModal = useRef(null);

    const getProducts = async (page = 1) => {
        try {
            const res = await productService.getProducts(page);
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
            setProducts(res.data.products);
            setPagination(res.data.pagination);
        } finally {
            // add loading
        }
    };

    const getProductList = (e, page) => {
        e.preventDefault();
        getProducts(page);
    };

    useEffect(() => {
        productModal.current = new Modal(productModalRef.current, { keyboard: false });
        deleteProductModal.current = new Modal(deleteProductModalRef.current, { keyboard: false });
        getProducts();
    }, []);

    const openModal = (prd) => {
        setTempProduct(prd || {});
        productModal.current.show();
    };
    const closeModal = () => productModal.current.hide();

    const openDeleteModal = (prd) => {
        setTempProduct(prd || {});
        deleteProductModal.current.show();
    };
    const closeDeleteModal = () => deleteProductModal.current.hide();

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
        <h2 className="h4">商品管理</h2>
        <div className="text-end">
            <button type="button" className="btn btn-sm btn-primary" onClick={() => openModal()}>新增商品</button>
        </div>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col" width="20%">商品名稱</th>
                    <th scope="col">種類</th>
                    <th scope="col">原價</th>
                    <th scope="col">售價</th>
                    <th scope="col">是否啟用</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((prd) => {
                        return (
                            <tr key={prd.id}>
                                <td>{prd.title}</td>
                                <td>{prd.category}</td>
                                <td>{prd.origin_price}</td>
                                <td>{prd.price}</td>
                                <td>{prd.is_enabled ? '已啟用' : '未啟用'}</td>
                                <td>
                                    <button type="button" className="btn btn-sm btn-primary me-1" onClick={() => openModal(prd)}>編輯</button>
                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => openDeleteModal(prd)}>刪除</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <Pagination pagination={pagination} getProductList={getProductList} />

        {/* 新增/編輯商品 Modal */}
        <div className="modal fade" ref={productModalRef} id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">商品{ tempProduct.id ? '編輯' : '新增'}</h1>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" onClick={closeModal}>關閉</button>
                        <button type="button" className="btn btn-sm btn-primary">儲存</button>
                    </div>
                </div>
            </div>
        </div>

        {/* 刪除商品 Modal */}
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

export default AdminProduct;