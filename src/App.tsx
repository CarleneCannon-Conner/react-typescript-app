import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import { connect, MapDispatchToProps } from 'react-redux'
import {
  saveUserName as saveUserNameAction,
  saveUserMessage as saveUserMessageAction,
} from './store/user/UserActions'
import { User } from './store/user/UserTypes'
import './App.css';
import { AppState } from './store/RouteReducer';

interface AppOwnProps {
  userName: string | undefined
  userType: 'admin' | 'moderator' | 'user' |'guest'
}

interface AppDispatchToProps {
  saveUserName: (user: User) => void
  saveUserMessage: (user: User) => void
}

const App: React.FC<AppDispatchToProps & AppOwnProps> = ({
  userType,
  userName,
  saveUserName,
  saveUserMessage,
}):JSX.Element => {
  const [time, setTime] = useState<Date>(() => new Date(Date.now()))
  const [message, setMessage] = useState<string>('')

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date(Date.now()))
    }, 1000)

    if (userName) {
     saveUserName({ userName, userMessage: undefined })
    }

    return () => {
      clearInterval(timer)
    }
  }, [userName, saveUserName])

  useEffect(() => {
    saveUserMessage({ userName: undefined, userMessage: message })
  }, [message, saveUserMessage])


  return (
    <div className="App">
     <p>
       Hi, {userName ? userName : 'Mysterious Entity'}, your user type is {userName ? userType : 'irrelevent because I do not know you'}.
     </p>
     <p>{time.toUTCString()}</p>
     <input
      type='text'
      placeholder='Enteryour message here'
      value={message}
      onChange={handleTextChange}
     />
    <p>
      your message: {message || ''}
    </p>
    <Link to='/userlist'>User List</Link>
    </div>
  );
}

const mapDispatchToProps: MapDispatchToProps<
  AppDispatchToProps,
  AppOwnProps
  > = (dispatch: Dispatch, ownProps: AppOwnProps): AppDispatchToProps => ({
    saveUserName: (user: User) => {
      dispatch(saveUserNameAction(user))
    },
    saveUserMessage: (user: User) => {
      dispatch(saveUserMessageAction(user))
    },
  })

export default connect<
  {}, // AppStateToProps
  AppDispatchToProps,
  AppOwnProps,
  AppState
  >(null, mapDispatchToProps)(App)
