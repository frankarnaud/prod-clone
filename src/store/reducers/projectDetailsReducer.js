
const projectDetails = (state={}, action) => {
    const infos = action.payload
    if(action.type === 'ADD_PROJECT_DETAILS'){
       return {...state, [infos.key]: {...infos.project }}
    }
    return state
}

export default projectDetails