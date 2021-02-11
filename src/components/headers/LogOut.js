import React from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'
import { useDispatch } from 'react-redux'
import { createUser } from '../../store/actions'

export default function LogOut(){
    const history = useHistory()
    const dispatch = useDispatch()
    const signOut = () => {
        auth.signOut().then(() => {
            history.replace('/')
            dispatch(createUser(null))
            localStorage.clear()
        })
    }

    React.useEffect(() => {
        signOut()
    })
    return null
}