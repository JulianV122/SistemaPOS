import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AlertProps {
    message: string;
    type: 'success' | 'error';
}

export const showAlert = ({ message, type }: AlertProps) => {
    const options = {
        position: 'top-right' as const,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    switch (type) {
        case 'success':
            toast.success(message, options);
            break;
        case 'error':
            toast.error(message, options);
            break;
        default:
            toast(message, options);
    }
};

export function AlertContainer() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    );
} 