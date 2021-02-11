
const projectInfo = (state={}, action) => {

    if(action.type === 'UPDATE_PROJECT_INFO'){
        return action.payload
    }

    return state
}

export default projectInfo