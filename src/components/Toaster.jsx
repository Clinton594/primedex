import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToast, defaultStatus } from "../redux/statusReducer";

export default function Toaster() {
  const dispatch = useDispatch();
  const { status: toast } = useSelector((store) => store);

  const variant = toast.status ? "success" : "danger";
  const icon = toast.status ? "check" : "ban";
  const show = toast.show ? "show" : "";

  useEffect(() => {
    if (toast.show) {
      setTimeout(() => {
        dispatch(setToast(defaultStatus));
      }, 3000);
    }
  }, [toast.show]);
  return (
    <>
      {toast.show && (
        <div
          className={`toast ${show} bg-${variant}`}
          onClose={() => dispatch(setToast(defaultStatus))}
          style={{ position: "absolute", right: 10, top: 10 }}
        >
          <div className="toast-header">
            <i className={`fa fa-${icon} mr-2`}></i>
            <strong className="me-auto">{toast.title}</strong>
          </div>
          <div className="toast-body">{toast.message}</div>
        </div>
      )}
    </>
  );
}
