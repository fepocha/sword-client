import classNames from 'classnames';

export type CharacterType = '' | '0' | '1' | '2';
interface Props {
  characters: string[];
  boardStatus?: CharacterType[];
  containerClassName?: string;
}

export function WordBlock({ characters = [], boardStatus = ['', '', '', '', ''], containerClassName = '' }: Props) {
  return (
    <ul
      className={
      classNames(
        'max-w-[300px] h-[50px] grid grid-cols-5 gap-2 mx-auto',
        containerClassName
      )
    }>
      {new Array(5).fill(0).map((_, idx) => (
        <li
          key={`block-${idx}`}
          className={classNames(
            'flex justify-center items-center border-gray-light border-b-2 text-2xl text-black-light',
            {
              'bg-gray-light': boardStatus[idx] === '0',
              'bg-orange-dark': boardStatus[idx] === '1',
              'bg-blue-mid': boardStatus[idx] === '2',
            },
            {
              'transition-colors': !!boardStatus[idx],
              'delay-100': idx === 1,
              'delay-200': idx === 2,
              'delay-300': idx === 3,
              'delay-[400ms]': idx === 4,
            },
          )}
        >
          {characters[idx]}
        </li>
      ))}
    </ul>
  );
}
