
export const updateDialog = open => ({
    type: 'UPDATE_DIALOG',
    payload: open
}) 

export const createUser = user => ({
    type: 'CREATE_USER',
    payload: user
})

export const updateSearchDialog = open => ({
    type: 'UPDATE_DIALOG_SEARCH',
    payload: open
})

export const updateProjectInfo = projectInfo => ({
    type: 'UPDATE_PROJECT_INFO',
    payload: projectInfo
})

export const setUrl = url => ({
    type: 'SET_URL',
    payload: url
})

export const addProject = projects => ({
    type: 'ADD_PROJECT',
    payload: projects
})

export const addProjectListInstance = infos => ({
    type: 'SET_INSTANCE_INFOS',
    payload: infos
})

export const updateProjectVote = voteInfos => ({
    type: 'UPDATE_VOTE',
    payload: voteInfos
})

export const addProjectDetails = (project, key) => ({
    type: 'ADD_PROJECT_DETAILS',
    payload: {key, project}
})


export const updateCommentCounter = comment => ({
    type: 'UPDATE_COMMENT_COUNTER',
    payload: comment
})


export const updateUserProjectsInfos = (type, infos) => ({
    type: 'UPDATE_USER_PROJECTS_INFOS',
    payload: {
        type,
        infos
    }
})

export const updateShowProfile = value => ({
    type: 'DISPLAY_PROFILE',
    payload: value
})

export const updateOnlineState = value => ({
    type: 'IS_ONLINE',
    payload: value
})

export const leaveSubmit = value => ({
    type: 'LEAVE_SUBMIT',
    payload: value
})

