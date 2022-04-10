import { Dialog, DialogContent } from './index';
import type { DialogContentProps, DialogProps } from './index';

export function ErrorDialog({
  title = 'Error',
  description = 'Something went wrong.\nPlease try again.',
  onClick,
}: DialogContentProps & DialogProps) {
  return (
    <Dialog onClick={onClick}>
      <DialogContent title={title} description={description} />
    </Dialog>
  );
}
