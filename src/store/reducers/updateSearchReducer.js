

const searchDialog = (state=false, action) => {

    if(action.type === "UPDATE_DIALOG_SEARCH"){
        return action.payload
    }
    return state
}

export default searchDialog