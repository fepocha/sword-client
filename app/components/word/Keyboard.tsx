import classNames from 'classnames';

const KEYS = [
  [
    { value: 'Q' },
    { value: 'W' },
    { value: 'E' },
    { value: 'R' },
    { value: 'T' },
    { value: 'Y' },
    { value: 'U' },
    { value: 'I' },
    { value: 'O' },
    { value: 'P' },
  ],
  [
    { value: 'A' },
    { value: 'S' },
    { value: 'D' },
    { value: 'F' },
    { value: 'G' },
    { value: 'H' },
    { value: 'J' },
    { value: 'K' },
    { value: 'L' },
  ],
  [
    { value: 'ENTER', type: 'enter' },
    { value: 'Z' },
    { value: 'X' },
    { value: 'C' },
    { value: 'V' },
    { value: 'B' },
    { value: 'N' },
    { value: 'M' },
    { value: 'BACK', type: 'backspace' },
  ],
];

export function Keyboard() {
  return (
    <div className="grid grid-flow-row gap-3">
      {KEYS.map((row, idx) => (
        <div
          key={idx}
          className={classNames(
          { 'mx-[22px]': idx === 1 },
          'grid grid-flow-col gap-1.5'
          )}>
          {row.map(({ value, type }) => (
            <button
              type="button"
              key={value}
              className={classNames(
                { 'text-xs': type },
                'flex justify-center items-center bg-white-light rounded-full py-1.5 border-2 border-black-dark text-md shadow-light active:shadow-md dark:shadow-dark dark:active:shadow-lg active:translate-y-1'
              )}
            >
              { value}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
