

const isOnline = (state=false, action) => {
    const isOnline = action.payload
    if(action.type === 'IS_ONLINE'){
        return isOnline
    }
    return state
}

export default isOnline