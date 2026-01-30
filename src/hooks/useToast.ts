import { toast, ToastOptions, TypeOptions } from 'react-toastify'
import { TOAST_CONFIG } from '../toast-config'

export const useToast = () => {
  const defaultOptions: ToastOptions = TOAST_CONFIG

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
