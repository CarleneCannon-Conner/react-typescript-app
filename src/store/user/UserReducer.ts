import { User, UserActions, UserActionTypes } from './UserTypes'

const INITIAL_STATE: User = {
  userName: undefined,
  userMessage: undefined,
  friendsList: undefined
}

export function userReducer(prevState: User = INITIAL_STATE, action: UserActionTypes) {
  switch(action.type) {
    case UserActions.SAVE_USER_NAME:
      return {
        ...prevState,
        userName: (action.payload as User).userName
      }
      case UserActions.SAVE_USER_MESSAGE:
        return {
          ...prevState,
          userMessage: (action.payload as User).userMessage
        }
        case UserActions.SAVE_FRIENDS:
          return {
            ...prevState,
            friendsList: action.payload as string[]
          }
      default:
        return prevState
  }
}