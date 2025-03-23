import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";

const Loading = () => {
    const isLoading = useSelector((state) => state.loading.loadingStatus);

    return (<>
        {
            isLoading ? (<>
                <div className="position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center" style={{
                    backdropFilter: 'blur(2px)',
                    backgroundColor: 'rgba(255, 255, 255, .5)',
                    zIndex: 1201
                }}>
                    <ClipLoader
                    color={'#000000'}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
                </div>
            </>) : ''
        }    
    </>)
};

export default Loading;