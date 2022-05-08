import { DialogContainer, DialogContainerProps } from './DialogContainer';
import { DialogContent, DialogContentProps } from './DialogContent';

export type DialogProps = DialogContentProps & DialogContainerProps;

export function Dialog({
  title,
  description,
  onClick,
}: DialogProps) {
  return (
    <DialogContainer onClick={onClick}>
      <DialogContent title={title} description={description} />
    </DialogContainer>
  );
}
