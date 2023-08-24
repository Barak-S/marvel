import { createStore, combineReducers } from 'redux'
import { heroReducer } from './reducers/heroReducer'

const rootReducer = combineReducers({
  heroReducer
})

const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>;

export default store
