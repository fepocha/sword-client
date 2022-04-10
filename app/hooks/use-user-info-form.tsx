import { ChangeEvent, Reducer, useReducer } from 'react';
import { getMinMaxLimitHelperText } from '~/utils/helper-text';

export type InputFieldName = 'nickname' | 'description';

interface Action {
  type: 'changeInput';
  payload?: {
    name: InputFieldName;
    value: string;
  };
}

type State = Record<InputFieldName, {
  value: string;
  helperText?: string;
}>;

const NICKNAME_MIN_LENGTH = 2;
const NICKNAME_MAX_LENGTH = 15;

const DESCRIPTION_MAX_LENGTH = 50;

export const getUserInfoHelperText = (name: InputFieldName, value: string) => {
  if (name === 'nickname') {
    if (value.length < NICKNAME_MIN_LENGTH || value.length > NICKNAME_MAX_LENGTH) {
      return getMinMaxLimitHelperText(name, {
        min: NICKNAME_MIN_LENGTH,
        max: NICKNAME_MAX_LENGTH,
      });
    }
  }
  if (name === 'description') {
    if (value.length > DESCRIPTION_MAX_LENGTH) {
      return getMinMaxLimitHelperText(name, { max: DESCRIPTION_MAX_LENGTH });
    }
  }
  return '';
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'changeInput':
      if (action.payload) {
        const { name, value } = action.payload;

        return {
          ...state,
          [name]: {
            value,
            helperText: getUserInfoHelperText(name, value)
          },
        };
      }
      return { ...state };
    default:
      throw new Error(`action.type is invalid: ${action.type}`);
  }
}

const DEFAULT_STATE: State = {
  nickname: { value: '', helperText: '' },
  description: { value: '', helperText: '' },
};

export function useUserInfoForm() {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, DEFAULT_STATE);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'changeInput',
      payload: {
        name: event.target.name as InputFieldName,
        value: event.target.value,
      },
    });
  };

  return {
    ...state,
    handleInputChange,
  };
}
