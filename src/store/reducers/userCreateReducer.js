
const user = (user=null, action) => {
    if(action.type === "CREATE_USER"){
        return action.payload
    }
    return user
}

export default user