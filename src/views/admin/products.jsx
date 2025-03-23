import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { addToast } from "../../slice/toastSlice";
import { toggleLoading } from "../../slice/loadingSlice";
import { productService } from "../../service/product.service";
import Pagination from "../../components/Pagination";
import ProductModal from "../../components/ProductModal";
import DeleteProductModal from "../../components/DeleteProductModal";

const init_product = {
    title: '',
    category: '',
    origin_price: 0,
    price: 0,
    description: '',
    content: '',
    unit: '',
    location: '',
    is_enabled: false,
    imageUrl: '',
    imagesUrl: ['']
  };

const AdminProduct = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [tempProduct, setTempProduct] = useState(init_product);   
    
    const productModalRef = useRef(null);
    const productModal = useRef(null);
    const deleteProductModalRef = useRef(null);
    const deleteProductModal = useRef(null);

    const getProducts = async (page = 1) => {
        try {
            dispatch(toggleLoading());
            const res = await productService.getProducts(page);
            if (!res.isSuccess) {
                dispatch(addToast({
                    title: '錯誤',
                    text: res.msg,
                    status: 'danger'
                }));
                return;
            }
            setProducts(res.data.products);
            setPagination(res.data.pagination);
        } finally {
            dispatch(toggleLoading());
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
        const prdInfo = prd ? { ...prd, is_enabled: !!prd.is_enabled } : init_product;
        setTempProduct(prdInfo);
        productModal.current.show();
    };
    const closeModal = () => productModal.current.hide();

    const openDeleteModal = (prd) => {
        setTempProduct(prd);
        deleteProductModal.current.show();
    };
    const closeDeleteModal = () => deleteProductModal.current.hide();

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setTempProduct({
            ...tempProduct,
            [name]: type === "checkbox" ? checked : value
        })
    };

    const editProduct = async () => {
        try {
            dispatch(toggleLoading());
            let url = 'addProduct';
            if (tempProduct.id) {
                url = 'editProduct'
            }
            const data = {
                ...tempProduct,
                price: parseInt(tempProduct.price),
                origin_price: parseInt(tempProduct.origin_price),
                is_enabled: tempProduct.is_enabled ? 1 : 0
            }
            const res = await productService[url](data);
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
                text: `${tempProduct.id ? '編輯' : '新增'}產品成功`,
                status: 'success'
            }));
            closeModal();
            getProducts();
        } finally {
            dispatch(toggleLoading());
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
        <ProductModal
            productModalRef={productModalRef}
            tempProduct={tempProduct}
            closeModal={closeModal}
            handleChange={handleChange}
            editProduct={editProduct}
            setTempProduct={setTempProduct}
        />

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