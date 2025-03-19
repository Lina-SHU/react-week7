import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { productService } from "../../service/product.service";
import Swal from "sweetalert2";
import Pagination from "../../components/Pagination";
import DeleteProductModal from "../../components/DeleteProductModal";

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
        const prdInfo = prd || {};
        setTempProduct(prdInfo);
        productModal.current.show();
    };
    const closeModal = () => productModal.current.hide();

    const openDeleteModal = (prd) => {
        setTempProduct(prd || {});
        deleteProductModal.current.show();
    };
    const closeDeleteModal = () => deleteProductModal.current.hide();

    
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
                        <h1 className="modal-title fs-5">商品{ tempProduct?.id ? '編輯' : '新增'}</h1>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="title" className="form-label">商品名稱</label>
                                <input type="text" className="form-control" id="title" placeholder="請輸入名稱" value={tempProduct.title} />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="category" className="form-label">種類</label>
                                <input type="text" className="form-control" id="category" placeholder="請輸入種類" value={tempProduct.category} />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="origin_price" className="form-label">原價</label>
                                <input type="number" min="0" className="form-control" id="origin_price" placeholder="請輸入原價" value={tempProduct.origin_price} />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="price" className="form-label">售價</label>
                                <input type="number" min="0" className="form-control" id="price" placeholder="請輸入售價" value={tempProduct.price} />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="unit" className="form-label">單位</label>
                                <input type="text" className="form-control" id="unit" placeholder="請輸入單位" value={tempProduct.unit} />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="description" className="form-label">商品描述</label>
                                <input type="text" className="form-control" id="description" placeholder="請輸入商品描述" value={tempProduct.description} />
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="content" className="form-label">商品內容</label>
                                <textarea rows="3" className="form-control" id="content" placeholder="請輸入商品內容" value={tempProduct.content} />
                            </div>
                            <div className="col-12 mb-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="is_enabled" value={tempProduct.is_enabled} />
                                    <label className="form-check-label" htmlFor="is_enabled">
                                        是否啟用
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="imageUrl" className="form-label">商品主圖</label>
                                <div className="input-group mb-3">
                                    <input type="file" className="form-control" id="imageUrl" />
                                    <button className="btn btn-outline-secondary" type="button">Button</button>
                                </div>
                                {
                                    tempProduct.imageUrl && (<img src={tempProduct.imageUrl} alt={tempProduct.title} className="img-fluid w-100"/>)
                                }
                            </div>
                            <div className="col-lg-8">
                                <label htmlFor="imagesUrl" className="form-label">商品圖片</label>
                                <div className="row mb-3">
                                    {
                                        tempProduct.imagesUrl && tempProduct.imagesUrl.map((image) => {
                                            return (<>
                                                <div className="col-lg-6">
                                                    <input type="text" value={image} class="form-control" placeholder="請輸入圖片網址" />
                                                    {
                                                        image && (<img src={image} alt={tempProduct.title} className="img-fluid w-100"/>)
                                                    }
                                                </div>
                                            </>)
                                        })
                                    }
                                </div>
                                <button type="button" className="btn py-1 w-100 btn-outline-primary mb-2">新增圖片</button>
                                <button type="button" className="btn py-1 w-100 btn-outline-danger">刪除圖片</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" onClick={closeModal}>關閉</button>
                        <button type="button" className="btn btn-sm btn-primary">儲存</button>
                    </div>
                </div>
            </div>
        </div>

        {/* 刪除商品 Modal */}
        <DeleteProductModal
            deleteProductModalRef={deleteProductModalRef}
            closeDeleteModal={closeDeleteModal}
            tempProduct={tempProduct}
            getProducts={getProducts}
        />
    </>)
};

export default AdminProduct;