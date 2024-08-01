import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';

const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
};

const showToast = (
  title: string,
  type: 'success' | 'error' | 'info',
  options: ToastOptions = defaultToastOptions
) => {
  toast(title, {
    ...options,
    toastId: title,
    type,
  });
};

const ToastSuccess = async (title = 'בוצע בהצלחה!', options?: ToastOptions) =>
  showToast(title, 'success', options);

const ToastError = async (title = 'שגיאה', options?: ToastOptions) =>
  showToast(title, 'error', options);

const ToastInfo = async (title = 'שים לב!', options?: ToastOptions) =>
  showToast(title, 'info', options);

export { ToastSuccess, ToastError, ToastInfo };
