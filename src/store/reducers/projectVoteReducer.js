
const projectsVotes = (state={}, action) => {
    let project = action.payload
    if(action.type === 'UPDATE_VOTE') {
        return {...state, [project.id]: {voted: project.voted}}
    }
    return state
}

export default projectsVotes