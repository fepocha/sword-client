import { Dialog, DialogContent } from './index';
import type { DialogContentProps } from './index';

export function ErrorDialog({ title = 'Error', description = 'Something went wrong.\nPlease try again.' }: DialogContentProps) {
  return (
    <Dialog>
      <DialogContent title={title} description={description} />
    </Dialog>
  );
}
