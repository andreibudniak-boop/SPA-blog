import { toast, ToastOptions, TypeOptions } from 'react-toastify'

export const useToast = () => {
  const defaultOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  }

  const showToast = (
    type: TypeOptions,
    message: string,
    options?: Partial<ToastOptions>
  ) => {
    return toast(message, {
      ...defaultOptions,
      type,
      ...options,
    })
  }

  return {
    success: (message: string, options?: Partial<ToastOptions>) =>
      showToast('success', message, options),

    error: (message: string, options?: Partial<ToastOptions>) =>
      showToast('error', message, options),

    info: (message: string, options?: Partial<ToastOptions>) =>
      showToast('info', message, options),

    warning: (message: string, options?: Partial<ToastOptions>) =>
      showToast('warning', message, options),

    loading: (message: string, options?: Partial<ToastOptions>) =>
      toast.loading(message, { ...defaultOptions, ...options }),

    dismiss: toast.dismiss,
    update: toast.update,
    isActive: toast.isActive,
  }
}
