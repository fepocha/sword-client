import Title from '~/components/Text/Title';
import { WordBlock, CharacterType } from '~/components/Word/WordBlock';
import { NavLink } from 'remix';
import { FloatingContainer } from '~/components/FloadingContainer';
import { useNavigate } from '@remix-run/react';
import { ReactNode } from 'react';

const EXAMPLES: {
  characters: string[];
  boardStatus: CharacterType[];
  description: ReactNode;
}[] = [
  {
    characters: ['T', 'A', 'B', 'L', 'E'],
    boardStatus: ['2', '', '', '', ''],
    description: (
      <>
        The letter <strong className="text-lg">T</strong> is in the word and in the correct spot.
      </>
    )
  },
  {
    characters: ['T', 'A', 'B', 'L', 'E'],
    boardStatus: ['', '1', '', '', ''],
    description: (
      <>
        The letter <strong className="text-lg">A</strong> is in the word but in the wrong spot.
      </>
    )
  },
  {
    characters: ['T', 'A', 'B', 'L', 'E'],
    boardStatus: ['', '', '0', '', ''],
    description: (
      <>
        The letter <strong className="text-lg">B</strong> is not in the word in any spot.
      </>
    )
  },
];

export default function TutorialPage() {
  const navigate = useNavigate();

  return (
    <section className="main-section">
      <section>
        <Title>Game Tutorial</Title>
        <div className="grid gap-4">
          <p>
            Guess the word in 5 tries.
          </p>
          <p>
            Each guess must be a valid 5-letter word. Hit the enter button to submit.
          </p>
          <p>
            After each guess, the color of the tiles will change to show how close your guess was to the word.
          </p>
        </div>
      </section>

      <hr className="my-8 border-gray-mid border-dashed"/>

      <section>
        <Title type="h2">Examples</Title>
        <ul className="grid gap-10 grid-flow-row">
          {EXAMPLES.map(({ characters, boardStatus, description }) => (
            <li key={JSON.stringify(description)}>
              <WordBlock
                characters={characters}
                boardStatus={boardStatus}
                containerClassName="ml-0"
              />
              <p className="mt-4 text-sm">
                {description}
              </p>
            </li>
        ))}
        </ul>
      </section>

      <hr className="my-8 border-gray-mid border-dashed"/>

      <section>
        <p>
          You can also
          <NavLink
            to="/word/new"
            prefetch="intent"
            className="link-text text-orange-mid mx-[6px]"
          >
            add a new word
          </NavLink>
          for others too.
        </p>
      </section>

      <FloatingContainer>
        <button
          type="button"
          role="link"
          className="button-lg"
          onClick={() => {
              navigate('/play');
          }}
          >
          Start Play!
        </button>
      </FloatingContainer>
    </section>
  );
}
