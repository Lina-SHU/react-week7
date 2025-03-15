const Home = () => {
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('login');
    };
    return (<>
        <div className="row justify-content-center">
            <div className="col-6">
                <h2 className="h4 text-center">請先登入</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="email" placeholder="輸入信箱" />
                        <label for="email">信箱</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="password" placeholder="請輸入密碼" />
                        <label for="password">密碼</label>
                    </div>
                    <button type="submit" className="btn btn-primary py-2 w-100">登入</button>
                </form>
            </div>
        </div>
    </>)
};

export default Home;