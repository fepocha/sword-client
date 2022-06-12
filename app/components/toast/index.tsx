import classNames from 'classnames';

export interface Props {
  text?: string;
  isOpen: boolean;
  closeToast?: () => void;
}
export function Toast({
  text = 'Error! Please try again',
  isOpen,
  closeToast,
}: Props) {
  return (
    <div
      className={classNames(
        'fixed bottom-1/3 left-1/2 -translate-x-1/2',
        'flex justify-between',
        'min-w-[250px] px-6 py-4 rounded-lg text-sm bg-[#000] text-[#fff]',
        'bg-opacity-[0.8] dark:bg-opacity-[0.5] transition duration-250 ease-out', {
          'z-10 opacity-1 -translate-y-1/3': isOpen,
          '-z-[1] opacity-0': !isOpen,
        }
      )}
    >
      {text}
      <button
        type="button"
        className="text-gray-light pl-2"
        onClick={closeToast}
      >
        {/* TODO: icon으로 바꾸기 */}
        X
      </button>
    </div>
  );
}
