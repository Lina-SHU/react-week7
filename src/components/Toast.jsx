import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Toast as BsToast } from "bootstrap";
import { useDispatch } from "react-redux";
import { removeToast } from "../slice/toastSlice";

const TOAST_DURATION = 2000;

const Toast = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.toast.messages);

    const toastRefs = useRef({});
    useEffect(() => {
        messages.forEach((msg) => {
            const messageElement = toastRefs.current[msg.id];

            if (messageElement) {
                const toastInstance = new BsToast(messageElement);
                toastInstance.show();

                setTimeout(() => {
                    dispatch(removeToast(msg.id));
                }, TOAST_DURATION);
            }
        });
    }, [messages]);

    const closeToast = (toastId) => {
        dispatch(removeToast(toastId));
    };

    return (
        <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: 1200 }}>
            {
                messages.map((msg) => {
                    return (
                        <div ref={(el) => toastRefs.current[msg.id] = el} key={msg.id} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className={`toast-header bg-${msg.status} text-white`}>
                                <strong className="me-auto">{msg.title}</strong>
                                <button type="button" className="btn-close"  aria-label="Close" onClick={(() => closeToast(msg.id))}></button>
                            </div>
                            <div className="toast-body">
                                {msg.text}
                            </div>
                        </div>
                    )
                })
            } 
        </div>
    )
};

export default Toast;