import { combineReducers } from 'redux'
import openDialog from './reducers/updateLoginReducer'
import user from './reducers/userCreateReducer'
import searchDialog from './reducers/updateSearchReducer'
import projectInfo from './reducers/updateProjectInfoReducer'
import url from './reducers/setUrlReducer'
import projects from './reducers/addProjectReducer'
import projectListInstance from './reducers/prodListReducer'
import projectsVotes from './reducers/projectVoteReducer'
import projectDetails from './reducers/projectDetailsReducer'
import commentCounter from './reducers/CommentReducer'
import userProjectsInfos from './reducers/userProjectsInfos'
import showProfile from './reducers/showProfileReducer'
import isOnline from './reducers/isOnlineReducer'
import leaveSubmit from './reducers/leaveSubReducer'

const reducer = combineReducers({
    openDialog,
    searchDialog,
    user,
    projectInfo,
    url,
    projects,
    projectListInstance,
    projectsVotes,
    projectDetails,
    commentCounter,
    userProjectsInfos,
    showProfile,
    isOnline,
    leaveSubmit
})

export default reducer