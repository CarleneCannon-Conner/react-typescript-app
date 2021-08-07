export interface User {
  userName: string | undefined
  userMessage: string | undefined
  friendsList?: string[] | undefined
}

export const UserActions = {
  SAVE_USER_NAME: 'SAVE_USER_NAME',
  SAVE_USER_MESSAGE: 'SAVE_USER_MESSAGE',
  SAVE_FRIENDS: 'SAVE_FRIENDS'
}

interface SaveUserNameAction {
  type: typeof UserActions.SAVE_USER_NAME,
  payload: User | string[]
}

interface SaveUserMessageAction {
  type: typeof UserActions.SAVE_USER_MESSAGE,
  payload: User | string[]
}


interface SaveFriendsAction {
  type: typeof UserActions.SAVE_FRIENDS,
  payload: User | string[]
}

export type UserActionTypes = 
SaveUserNameAction |
SaveUserMessageAction |
SaveFriendsAction