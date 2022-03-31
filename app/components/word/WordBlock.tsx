import classNames from 'classnames';

type CharacterType = '' | '0' | '1' | '2';
interface Props {
  characters: string[];
  boardStatus?: CharacterType[];
}

export function WordBlock({ characters = [], boardStatus = ['', '', '', '', ''] }: Props) {
  return (
    <ul className="max-w-[300px] h-[50px] grid grid-cols-5 gap-2 mx-auto">
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
          )}
        >
          {characters[idx]}
        </li>
      ))}
    </ul>
  );
}
