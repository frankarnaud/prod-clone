

const leaveSubmit = (state=null, action) => {
    if(action.type === 'LEAVE_SUBMIT') {
        return {...action.payload}
    }

    return state
}


export default leaveSubmit