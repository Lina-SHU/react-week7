import { memo } from "react";

const Pagination = memo(({ pagination, getProductList }) => {
    return (
        <nav>
            <ul className="pagination">
                <li className={`page-item ${ !pagination.has_pre && 'disabled'}`}><a className="page-link" href="#" onClick={(e) => getProductList(e, pagination.current_page - 1)}>上一頁</a></li>
                {
                    pagination.total_pages && Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => {
                        return (<li key={page} className={`page-item ${page === pagination.current_page && 'active'}`}><a className="page-link" href="#" onClick={(e) => getProductList(e, page)}>{page}</a></li>)
                    })
                }
                <li className={`page-item ${ !pagination.has_next && 'disabled'}`}><a className="page-link" href="#" onClick={(e) => getProductList(e, pagination.current_page + 1)}>下一頁</a></li>
            </ul>
        </nav>
    )
});

export default Pagination;
