import { useState, createContext, useContext, PropsWithChildren, useMemo, useCallback } from 'react';
import { Dialog, DialogProps } from '~/components/dialog';

interface DialogContextType {
  openDialog: (options: DialogProps) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<null | DialogContextType>(null);

const DEFAULT_DIALOG_OPTION: DialogProps = {
  title: 'Error',
  description: 'Something went wrong.\nPlease try again.',
  buttonText: 'Close',
};

function DialogProvider({ children }: PropsWithChildren<unknown>) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<DialogProps>(DEFAULT_DIALOG_OPTION);

  const openDialog = useCallback((dialogOptions: DialogProps) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      ...dialogOptions,
    }));
    setIsOpen(true);
  }, []);
  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const contextValue = useMemo(() => ({
    openDialog,
    closeDialog
  }), []);

  return (
    <DialogContext.Provider value={contextValue}>
      {isOpen && (
        <Dialog
          {...options}
          onClick={() => {
            options?.onClick?.();
            closeDialog();
          }}
        />
      )}
      {children}
    </DialogContext.Provider>
  );
}

const useDialogContext = () => {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error(`useDialogContext should be used within a ${DialogProvider.name}`);
  }

  return context;
};

export { DialogProvider, useDialogContext };
