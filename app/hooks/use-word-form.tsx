import { Reducer, useReducer } from 'react';

interface Action {
  type: 'typeCharacter' | 'deleteCharacter' | 'showHelperText' | 'clearHelperText' | 'clearWord';
  payload?: string;
}
interface State {
  word: string;
  helperText?: string;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'typeCharacter':
      return { ...state, word: state.word + action.payload };
    case 'deleteCharacter':
      return { ...state, word: state.word.slice(0, -1) };
    case 'showHelperText':
      return { ...state, helperText: action.payload };
    case 'clearHelperText':
      return { ...state, helperText: '' };
    case 'clearWord':
      return { ...state, helperText: '', word: '' };
    default:
      throw new Error(`action.type is invalid: ${action.type}`);
  }
}

export function useWordForm() {
  const [{ word, helperText }, dispatch] = useReducer<Reducer<State, Action>>(reducer, { word: '' });

  const typeCharacter = (character: string) => {
    if (word.length < 5) dispatch({ type: 'typeCharacter', payload: character });
  };
  const deleteCharacter = () => {
    if (word.length > 0) dispatch({ type: 'deleteCharacter' });
  };
  const clearWord = () => dispatch({ type: 'clearWord' });

  const clearHelperText = () => dispatch({ type: 'clearHelperText' });
  const showHelperText = (text: string) => dispatch({ type: 'showHelperText', payload: text });


  return {
    word,
    helperText,
    typeCharacter,
    deleteCharacter,
    clearWord,
    clearHelperText,
    showHelperText,
  };
}
