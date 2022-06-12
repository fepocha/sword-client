import classNames from 'classnames';

export interface Props {
  text?: string;
  isOpen?: boolean;
}
export function Toast({
  text = 'Error! Please try again',
  isOpen,
}: Props) {
  return (
    <div
      className={classNames(
        'fixed bottom-1/3 left-1/2 -translate-x-1/2',
        'min-w-[250px] px-6 py-3 rounded-lg text-sm bg-[#000] text-[#fff]',
        'bg-opacity-[0.8] dark:bg-opacity-[0.5] transition duration-250 ease-out', {
          'z-10 opacity-1 -translate-y-1/3': isOpen,
          '-z-[1] opacity-0': !isOpen,
        }
      )}
    >
      {text}
    </div>
  );
}
