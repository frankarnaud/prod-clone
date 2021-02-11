
const state = {
    openDialog: false,
    searchDialog: false,
    user: null,
    projectInfo: {
        id: '',
        topic: '',
        prevId: ''
    },
    url: '',
    projects: [],
    projectListInstance: {},
    projectsVotes: {},
    projectDetails: {},
    commentCounter: {},
    userProjectsInfos: {},
    showProfile: false,
    isOnline: false,
    leaveSubmit: null,
}

export default state