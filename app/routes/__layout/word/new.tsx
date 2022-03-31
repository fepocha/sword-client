import { Reducer, useReducer } from 'react';
import type { Key } from '~/components/word/Keyboard';
import { Keyboard } from '~/components/word/Keyboard';
import { WordBlock } from '~/components/word/WordBlock';

const HELPER_TEXT = {
  INVALID_LENGTH: 'A word should be 5 characters long',
};

interface Action {
  type: 'type' | 'backspace' | 'showHelperText' | 'clearHelperText';
  payload?: string;
}
interface State {
  word: string;
  helperText?: string;
}


function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'type':
      return { ...state, word: state.word + action.payload };
    case 'backspace':
      return { ...state, word: state.word.slice(0, -1) };
    case 'showHelperText':
      return { ...state, helperText: action.payload };
    case 'clearHelperText':
      return { ...state, helperText: '' };
    default:
      throw new Error();
  }
}
export default function NewWordFormPage() {
  const [{ word, helperText }, dispatch] = useReducer<Reducer<State, Action>>(reducer, { word: '' });

  const handleKeyClick = ({ type, value }: Key) => {
    dispatch({ type: 'clearHelperText' });
    if (type === 'character') {
      if (word.length < 5) dispatch({ type: 'type', payload: value });
      return;
    }
    if (type === 'backspace') {
      dispatch({ type: 'backspace' });
      return;
    }
    if (word.length < 5) {
      dispatch({ type: 'showHelperText', payload: HELPER_TEXT.INVALID_LENGTH });
    }
    // submit event
  };

  return (
    <section className="main-section">
      <h2 className="main-title">Add a new word.</h2>
      <WordBlock characters={word.split('')} />
      {helperText && (
        <p className="mt-6 text-center text-orange-light text-sm">{helperText}</p>
      )}
      <Keyboard onKeyClick={handleKeyClick} />
    </section>
  );
}
