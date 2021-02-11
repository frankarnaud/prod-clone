

const openDialog = (state=false, action) => {
    if(action.type === 'UPDATE_DIALOG'){
        return action.payload
    }
    else{
        return state
    }
}

export default openDialog