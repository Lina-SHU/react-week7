import { useState, useEffect, useRef } from "react";
import { fileService } from "../service/file.service";
import { useDispatch } from "react-redux";
import { addToast } from "../slice/toastSlice";

const ProductModal = ({ productModalRef, tempProduct, closeModal, handleChange, editProduct, setTempProduct }) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [imageSelected, setImageSelected] = useState(null);

    useEffect(() => {
        fileInputRef.current = null;
    }, [tempProduct]);

    const handleImage = (e, index) => {
        const newImages = { ...tempProduct.imagesUrl };
        newImages[index] = e.target.value;
        setTempProduct({
            ...tempProduct,
            imagesUrl: newImages
        });
    };

    const chooseImage = (e) => {
        const fd = new FormData();
        fd.append('file', e.target.files[0]);
        setImageSelected(fd);
    };
    const uploadImage = async () => {
        try {
            const res = await fileService.updatePhoto(imageSelected);
            if (!res.isSuccess) {
                dispatch(addToast({
                    title: '錯誤',
                    text: res.msg,
                    status: 'danger'
                }));
                return;
            }
            setTempProduct({
                ...tempProduct,
                imageUrl: res.data
            })
            dispatch(addToast({
                title: '成功',
                text: '圖片上傳成功',
                status: 'success'
            }));
        } finally {
            // add loading
        }
    };
    return (
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
                                <input type="text" name="title" className="form-control" id="title" placeholder="請輸入名稱" value={tempProduct.title} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="category" className="form-label">種類</label>
                                <input type="text" name="category" className="form-control" id="category" placeholder="請輸入種類" value={tempProduct.category} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="origin_price" className="form-label">原價</label>
                                <input type="number" min="0" name="origin_price" className="form-control" id="origin_price" placeholder="請輸入原價" value={tempProduct.origin_price} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="price" className="form-label">售價</label>
                                <input type="number" min="0" name="price" className="form-control" id="price" placeholder="請輸入售價" value={tempProduct.price} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="unit" className="form-label">單位</label>
                                <input type="text" name="unit" className="form-control" id="unit" placeholder="請輸入單位" value={tempProduct.unit} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="description" className="form-label">商品描述</label>
                                <input type="text" name="description" className="form-control" id="description" placeholder="請輸入商品描述" value={tempProduct.description} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="content" className="form-label">商品內容</label>
                                <textarea rows="3" name="content" className="form-control" id="content" placeholder="請輸入商品內容" value={tempProduct.content} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="col-12 mb-3">
                                <div className="form-check">
                                    <input className="form-check-input" name="is_enabled" type="checkbox" id="is_enabled" checked={tempProduct.is_enabled} onChange={(e) => handleChange(e)}/>
                                    <label className="form-check-label" htmlFor="is_enabled">
                                        是否啟用
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="imageUrl" className="form-label">商品主圖</label>
                                <div className="input-group mb-3">
                                    <input type="file" ref={fileInputRef} className="form-control" id="imageUrl" onChange={(e) => chooseImage(e)}/>
                                    <button className="btn btn-outline-secondary" type="button" onClick={uploadImage}>上傳</button>
                                </div>
                                {
                                    tempProduct.imageUrl && (<img src={tempProduct.imageUrl} alt={tempProduct.title} className="img-fluid w-100"/>)
                                }
                            </div>
                            <div className="col-lg-8">
                                <label htmlFor="imagesUrl" className="form-label">商品圖片</label>
                                <div className="row mb-3">
                                    {
                                        tempProduct.imagesUrl && tempProduct.imagesUrl.map((image, index) => {
                                            return (
                                                <div key={image} className="col-lg-6">
                                                    <input type="text" value={image} onChange={(e) => handleImage(e, index)} className="form-control" placeholder="請輸入圖片網址" />
                                                    {
                                                        image && (<img src={image} alt={tempProduct.title} className="img-fluid w-100"/>)
                                                    }
                                                </div>
                                            )
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
                        <button type="button" className="btn btn-sm btn-primary" onClick={editProduct}>儲存</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductModal