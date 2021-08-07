import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { User, UserActions, UserActionTypes } from './UserTypes'

export function saveUserName(user: User): UserActionTypes {
  return {
    type: UserActions.SAVE_USER_NAME,
    payload: user
  }
}

export function saveUserMessage(user: User): UserActionTypes {
  return {
    type: UserActions.SAVE_USER_MESSAGE,
    payload: user
  }
}

export function saveFriends(users: string[]): UserActionTypes {
  return {
    type: UserActions.SAVE_FRIENDS,
    payload: users
  }
}

  export function getFriendsList(url: string) {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      return new Promise<void>(async (resolve) => {
        try {
          const response = await fetch(url, {
            method: 'GET',
          })

          const friends = await response.json()
          if (!friends) {
            throw new Error('Could not fetch friends')
          }

          const friendsList = friends.map((f: any) => f.name)
          dispatch(saveFriends(friendsList))
        }
        catch (error) {
          console.error(error)
        }
      })
    }
  }