import { combineReducers, Reducer } from 'redux'

import { User } from './user/UserTypes'
import { userReducer } from './user/UserReducer'

export interface AppState {
  user: User,
  friendsList: string[],
}

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  user: userReducer
} as any)