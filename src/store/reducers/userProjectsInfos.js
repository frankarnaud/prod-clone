
const userProjectsInfos = (state = {}, action) => {

    let infos = action.payload

    if (action.type === 'UPDATE_USER_PROJECTS_INFOS') {

        if(infos.type === 'submitted') {
            if(state['submitted']) {
                return { ...state, submitted: [...infos.infos, ...state['submitted']]}
            }
            else {
                return { ...state, submitted: infos.infos}
            }
        }
        else {
            return { ...state, [infos.type]: infos.infos}
        }
    }
    return state
}


export default userProjectsInfos