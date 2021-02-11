import React from 'react'


const showProfile = (state=false, action) => {
    if(action.type === 'DISPLAY_PROFILE'){
        return action.payload
    }
    return state
}

export default showProfile