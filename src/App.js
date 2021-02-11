import React from 'react';

import { Box } from '@material-ui/core'
import Header from './components/headers/Header'
import Login from './components/headers/Login';
import DialogSearch from './components/headers/DialogSearch'
import Content from './components/contents/Content'
import { Route, Switch } from 'react-router-dom';
import RootErrorBoundary from './components/contents/projets/RootErrorBoundary';
import RootProjectDetails from './components/contents/projets/RootProjectDetails';
import Post from './components/contents/projets/Post'
import { auth } from './firebase/firebase.utils'
import { useDispatch } from 'react-redux'
import { createUser, updateOnlineState } from './store/actions'
import Profile from './components/contents/users/Profile';
import { getUserProjectsInfos, synchronizeWithServer } from './store/asycActions'
import { projectsStore } from './storage'
import { SnackbarProvider } from 'notistack';


function App() {
  const dispatch = useDispatch()
  const [visible, setVisible] = React.useState(true)

  const preLogin = () => {
    if (localStorage.getItem('user')) {
      setVisible(false)
      auth.onAuthStateChanged((userAuth) => {
        if (userAuth) {
          dispatch(createUser(userAuth))
          if (navigator.onLine) {
            dispatch(getUserProjectsInfos(userAuth.uid))
          }
          setVisible(true)
        }
        setVisible(true)
      })
    }
  }

  const synchronize = () => {
    projectsStore.length().then((length) => {
      if (length) {
        projectsStore.iterate((value, key) => {
          dispatch(synchronizeWithServer(value))
        }).then(() => console.log('completed'))
      }
    })
  }

  React.useEffect(() => {
    preLogin()
    window.addEventListener('offline', (ev) => {
      dispatch(updateOnlineState(false))
    })
    window.addEventListener('online', (ev) => {
      dispatch(updateOnlineState(true))
      synchronize()
    })
    if (navigator.onLine) {
      dispatch(updateOnlineState(true))
      synchronize()
    }
  }, [])

  if (visible) {
    return (
      <SnackbarProvider maxSnack={3} preventDuplicate
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <Box>
          <Header />
          <Login />
          <DialogSearch />
          <Switch>
            <Route exact path="/">
              <Content />
            </Route>
            <Route path="/posts/new">
              <Post />
            </Route>
            <Route exact path="/posts/:projectName">
              <RootErrorBoundary>
                <RootProjectDetails />
              </RootErrorBoundary>
            </Route>
            <Route path="/@:username">
              <Profile />
            </Route>
          </Switch>
        </Box>
      </SnackbarProvider>
    )
  }
  else {
    return false
  }
}

export default App;
