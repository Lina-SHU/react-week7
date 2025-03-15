const AdminProduct = () => {
    return (<>
        <h2 className="h4">商品管理</h2>
        <div className="text-end">
            <button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#productModal">新增商品</button>
        </div>
        <table class="table">
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
                <tr>
                    <td>名稱</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Otto</td>
                    <td>
                        <button type="button" className="btn btn-sm btn-primary me-1" data-bs-toggle="modal" data-bs-target="#productModal">編輯</button>
                        <button type="button" className="btn btn-sm btn-outline-danger">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">商品編輯</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">關閉</button>
                        <button type="button" class="btn btn-sm btn-primary">儲存</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
};

export default AdminProduct;