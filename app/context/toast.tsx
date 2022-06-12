import { useState, createContext, useContext, PropsWithChildren, useMemo, useCallback, useRef } from 'react';
import { Toast, Props as ToastProps } from '~/components/toast';

interface ToastOption extends Pick<ToastProps, 'text'> {
  duration?: number;
}
interface ToastContextType {
  openToast: (options: ToastOption) => void;
  closeToast: () => void;
}

const ToastContext = createContext<null | ToastContextType>(null);

const DEFAULT_TOAST_OPTION: ToastOption = {
  text: '',
};
const DEFAULT_TOAST_DURATION = 2000;

function ToastProvider({ children }: PropsWithChildren<unknown>) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ToastOption>(DEFAULT_TOAST_OPTION);
  const timeoutIdRef = useRef<NodeJS.Timeout | undefined>();

  const openToast = useCallback((toastOptions: ToastOption) => {
    setOptions((prevOptions: ToastOption) => ({
      ...prevOptions,
      ...toastOptions,
    }));
    setIsOpen(true);

    const timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, toastOptions.duration || DEFAULT_TOAST_DURATION);
    timeoutIdRef.current = timeoutId;
  }, []);

  const closeToast = useCallback(() => {
    setIsOpen(false);
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
  }, []);

  const contextValue = useMemo(() => ({
    openToast,
    closeToast
  }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      <Toast
        {...options}
        isOpen={isOpen}
        closeToast={closeToast}
      />
      {children}
    </ToastContext.Provider>
  );
}

const useToastContext = () => {
  const context = useContext(ToastContext);

  if (context === null) {
    throw new Error(`useToastContext should be used within a ${ToastProvider.name}`);
  }

  return context;
};

export { ToastProvider, useToastContext };
