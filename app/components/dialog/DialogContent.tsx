export interface DialogContentProps {
  title?: string;
  description?: string;
}

export function DialogContent({ title, description }: DialogContentProps) {
  return (
    <div>
      {title && <h2 className="text-xl mb-4">{title}</h2>}
      {description && <p className="whitespace-pre-line leading-7">{description}</p>}
    </div>
  );
}
