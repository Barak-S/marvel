import { SuperHero } from '../core/types'

export interface CounterState {
  superheroes: SuperHero[],
  myList: SuperHero[],
  selectedHero: Record<string, SuperHero>,
  loading: boolean,
  isMyListOpen: boolean;
}

const initialState: CounterState = {
  superheroes: [],
  myList: [],
  selectedHero: {},
  loading: true,
  isMyListOpen: false,
};

export const heroReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_ALL_SUPERHEROES':
      return { ...state, superheroes: action.data }
    case 'SET_SELECTED_SUPERHEROES':
      return { ...state, selectedHero: action.data }
    case 'SET_LIST':
      return { ...state, myList: action.data }
    case 'SET_LOADING':
      return { ...state, loading: action.data }
    case 'TOGGLE_MY_LIST':
      return { ...state, isMyListOpen: action.data }
    default:
      return state
  }
}