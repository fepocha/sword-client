import classNames from 'classnames';

type KeyType = 'character' | 'enter' | 'backspace';
export type Key = { value: string; type: KeyType };

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
  disabledEnter?: boolean;
  disabledCharacters?: string[];
}

export function Keyboard({ disabledCharacters = [], onKeyClick, disabledEnter }: Props) {
  return (
    <>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-page grid grid-flow-row gap-3 px-[8px] pb-10 bg-white-mid">
        {KEYS.map((row, idx) => (
          <div
            key={`key-${idx}`}
            className={classNames({ 'mx-[22px]': idx === 1 }, 'grid grid-flow-col gap-1.5')}
          >
            {row.map(key => (
              <button
                disabled={
                  key.type === 'enter' ? disabledEnter : disabledCharacters.includes(key.value)
                }
                type="button"
                key={key.value}
                onClick={() => onKeyClick(key)}
                className={classNames(
                  { 'text-xs': key.type === 'enter' || key.type === 'backspace' },
                  `
                    flex
                    justify-center
                    items-center
                    bg-white-light
                    rounded-full
                    py-1.5
                    border-2
                    border-black-dark
                    text-md
                    shadow-light
                    active:shadow-md
                    dark:shadow-dark
                    dark:active:shadow-lg
                    active:translate-y-0.5
                    disabled:opacity-30
                    disabled:translate-y-0
                  `
                )}
              >
                {key.value}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="h-[164px]" />
    </>
  );
}
