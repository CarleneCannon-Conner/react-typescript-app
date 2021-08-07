import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../store/user/UserTypes'
import { getFriendsList as getFriendsListAction } from '../../store/user/UserActions'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { AppState } from '../../store/RouteReducer'
import styled from 'styled-components'

const CenterContent = styled.div`
  text-align: center;
`

interface UserListOwnProps {}

interface UserListStateToProps {
  user: User
}

interface UserListDispatchToProps {
  getFriendsList: (url: string) => void
}

type UserListAllProps = UserListStateToProps & UserListDispatchToProps & UserListOwnProps


const UserList: React.FC<UserListAllProps> = ({
  user,
  getFriendsList,
}): JSX.Element => {
  const [fetchFriends, setFetchFriends] = useState<boolean>(true)

  useEffect(() => {
    if (fetchFriends) {
      getFriendsList('https://jsonplaceholder.typicode.com/users')
      setFetchFriends(false)
    }
  }, [fetchFriends, getFriendsList])

  return (
    <CenterContent>
      <p>
       Retreived User Name: {user.userName ? user.userName : 'No user name found'}
      </p>
      <p>
       Retreived User Message: {user.userMessage ? user.userMessage : 'No message found'}
      </p>
      <p>
       UserList
      </p>
      <Link to='/'>Home</Link>
      <h3>
        Friend List
      </h3>
      {user.friendsList ?  user.friendsList.map((friend, i) => <li key={i}>{friend}</li>) : <p>You have no friends</p>}
    </CenterContent>
  )
}

const mapStateToProps: MapStateToProps<
  UserListStateToProps,
  UserListOwnProps,
  AppState
> = (state: AppState, ownProps: UserListOwnProps): UserListStateToProps => ({
  user: state.user,
  ...ownProps
})

const mapDispatchToProps: MapDispatchToProps<
  UserListDispatchToProps,
  UserListOwnProps
  > = (dispatch: ThunkDispatch<{}, {}, AnyAction>, ownProps: UserListOwnProps) => ({
    getFriendsList: async (url: string) => {
      dispatch(getFriendsListAction(url))
    }
  })

export default connect<
  UserListStateToProps,
  UserListDispatchToProps,
  UserListOwnProps,
  AppState
  >(mapStateToProps, mapDispatchToProps)(UserList)