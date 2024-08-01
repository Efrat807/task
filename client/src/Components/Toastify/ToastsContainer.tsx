import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';

const ToastsContainer = () => {
  return createPortal(
    <ToastContainer rtl />,
    document.getElementById('toastPortal') as HTMLElement
  );
};

export default ToastsContainer;
