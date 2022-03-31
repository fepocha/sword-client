import classNames from 'classnames';

type KeyType = 'character' | 'enter' | 'backspace';
type Key = { value: string; type: KeyType };
const KEYS: Key[][] = [
  [
    { value: 'Q', type: 'character' },
    { value: 'W', type: 'character' },
    { value: 'E', type: 'character' },
    { value: 'R', type: 'character' },
    { value: 'T', type: 'character' },
    { value: 'Y', type: 'character' },
    { value: 'U', type: 'character' },
    { value: 'I', type: 'character' },
    { value: 'O', type: 'character' },
    { value: 'P', type: 'character' },
  ],
  [
    { value: 'A', type: 'character' },
    { value: 'S', type: 'character' },
    { value: 'D', type: 'character' },
    { value: 'F', type: 'character' },
    { value: 'G', type: 'character' },
    { value: 'H', type: 'character' },
    { value: 'J', type: 'character' },
    { value: 'K', type: 'character' },
    { value: 'L', type: 'character' },
  ],
  [
    { value: 'ENTER', type: 'enter' },
    { value: 'Z', type: 'character' },
    { value: 'X', type: 'character' },
    { value: 'C', type: 'character' },
    { value: 'V', type: 'character' },
    { value: 'B', type: 'character' },
    { value: 'N', type: 'character' },
    { value: 'M', type: 'character' },
    { value: 'BACK', type: 'backspace' },
  ],
];

interface Props {
  onKeyClick: (key: Key) => void;
}

export function Keyboard({
  onKeyClick,
}: Props) {
  return (
    <div className="grid grid-flow-row gap-3">
      {KEYS.map((row, idx) => (
        <div
          key={idx}
          className={classNames(
          { 'mx-[22px]': idx === 1 },
          'grid grid-flow-col gap-1.5'
          )}>
          {row.map((key) => (
            <button
              type="button"
              key={key.value}
              onClick={() => onKeyClick(key)}
              className={classNames(
                { 'text-xs': key.type === 'enter' || key.type === 'backspace' },
                'flex justify-center items-center bg-white-light rounded-full py-1.5 border-2 border-black-dark text-md shadow-light active:shadow-md dark:shadow-dark dark:active:shadow-lg active:translate-y-1'
              )}
            >
              { key.value }
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
