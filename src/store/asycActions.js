import firebase, { firestore, storage } from '../firebase/firebase.utils'
import { addProject, addProjectListInstance, updateProjectVote, addProjectDetails, updateUserProjectsInfos, leaveSubmit } from './actions'
import { PAGE_LENGTH } from '../utils/appUtils'
import { projectsStore } from '../storage'


// get list of product on firebase by date

export const getDataByDate = (date, prodNumber) => dispatch => {
    let projects = []
    firestore.collection('projects').where('date', '==', date).get().then((docs) => {
        docs.forEach((doc) => {
            projects.push({id: doc.id, ...doc.data()})
        })

        dispatch(addProject(projects))
        let index = 0
        if(projects.length > PAGE_LENGTH) {
            index = PAGE_LENGTH
        }
        else {
            index = projects.length
        }

        dispatch(addProjectListInstance({prodNumber, pageIndex: index, isData: true}))
    })
}


// update user vote on firebase

export const updateUserProjectVote = (voted, user_id, prodId) => dispatch => {
    const prodRefVote = firestore.collection('users').doc(user_id).collection('projects_votes').doc(prodId)
    if(!voted) {
        prodRefVote.set({voted: !voted}).then(() => {
            dispatch(updateProjectVote({id: prodId, voted: !voted}))
        })
    }
    else {
        prodRefVote.delete().then(() => {
            dispatch(updateProjectVote({id: prodId, voted: false}))
        })
    }
}

// get complete project details

export const getProjectDetails = (info, name, key) => dispatch => {
    let project = {}
    let relatedProjects = []
    if(info.topic !== ''){
        const prodRef = firestore.collection('projects').where('topic', '==', info.topic)
        prodRef.get().then((docs) => {
            docs.forEach((doc) => {
                if(doc.id === info.id){
                    project = doc.data()
                    project.id = doc.id
                }
                else {
                    relatedProjects.push({id: doc.id, ...doc.data()})
                }
            })
            project.relatedProjects = relatedProjects
            dispatch(addProjectDetails(project, key))
        })
    }
    else {
        const prodRef = firestore.collection('projects').where('name', '==', name)
        prodRef.get().then((docs) => {
            docs.forEach((doc) => {
                project = doc.data()
                project.id = doc.id
                firestore.collection('projects').where('topic', '==', project.topic).get().then((docs) => {
                    docs.forEach((docR) => {
                        if(docR.id !== project.id){
                            relatedProjects.push({id: docR.id, ...docR.data()})
                        }
                    })
                    project.relatedProjects = relatedProjects
                    dispatch(addProjectDetails(project, key))
                })
            })
        })
    }
}


// some infos about user

export const getUserProjectsInfos = user_id => dispatch => {
    let infos = {}
    let votedProjects = []
   
    const refInfos = firestore.collection('users').doc(user_id)
    refInfos.onSnapshot((doc) => {
        if(doc.exists) {
            infos = doc.data()
            infos.id = doc.id
            refInfos.collection('projects_votes').get().then((projectsRef) => {
                projectsRef.forEach((docRef) => {
                    votedProjects.push(docRef.id)
                })

                infos.upvoted = projectsRef.docs.length
                infos.votedProjects = votedProjects
                dispatch(updateUserProjectsInfos('projectsInfos', infos))
            })
        }
    })
}


// User's voted projects

export const getVotedProjects = tabsRefs => dispatch => {

    let projects = []

    for( let prodRef of tabsRefs) {
        firestore.collection('projects').doc(prodRef).get().then((doc) => {
            projects.push({id: doc.id, ...doc.data()})
        })
        dispatch(updateUserProjectsInfos('upvotes', projects))   
    }
}


// User owning projects

export const getUserProjects = user_id => dispatch => {
    let projects = []

    const refProjects = firestore.collection('projects').where('userId', '==', user_id)
    refProjects.get().then((docs) => {
        docs.forEach((doc) => {
            projects.push({id: doc.id, ...doc.data()})
        })

        dispatch(updateUserProjectsInfos('submitted', projects))
    })
}

// submit project on firebase

export const submitProject = (project, comment) => dispatch => {
    let localProject = {...project}
    localProject.mainImageUrl = ''
    localProject.imagesTabs = []
    const image = project.mainImageUrl
    const imagesTabs = project.imagesTabs
    const storageRef = storage.ref('images')
    let counter = project.imagesTabs.length + 1

    firestore.collection('projects').add(localProject).then((prodRef) => {
        if(comment){
            prodRef.collection('comments').add(comment).then(() => console.log('comment submitted'))
        }
        const maded = project.isMaker?1:0
        firestore.collection('users').doc(project.userId).update({
            submitted: firebase.firestore.FieldValue.increment(1),
            made: firebase.firestore.FieldValue.increment(maded)
        }).then(() => console.log('user_infos updated'))
        
        const uploadMainImage = storageRef.child(image.file.name).put(image.file)
        uploadMainImage.on('state_changed', () => {}, () => {}, () => {
            uploadMainImage.snapshot.ref.getDownloadURL().then((mainImageRef) => {
                prodRef.update({mainImageUrl: mainImageRef}).then(() => {
                    counter--
                    if(!counter) {
                        dispatch(leaveSubmit({leave: true, id: prodRef.id}))                    }
                })
            })
        })

        for(let image of imagesTabs){
            const uploadImagesTabs = storageRef.child(image.file.name).put(image.file)
            uploadImagesTabs.on('state_changed', () => {}, () => {}, () => {
                uploadImagesTabs.snapshot.ref.getDownloadURL().then((imgRef) => {
                    prodRef.update({imagesTabs: firebase.firestore.FieldValue.arrayUnion(imgRef)}).then(() => {
                        counter--
                        if(!counter) {
                            dispatch(leaveSubmit({leave: true, id: prodRef.id}))
                        }
                    })
                })
            })
        }
    })
}


//synchronization with firebase backend

export const synchronizeWithServer = project => dispatch => {
    let localProject = {}
    let comment = [...project.comment]
    const image = {...project.mainImageUrl}
    const imagesTabs = [...project.imagesTabs]
    localProject.topicCounter = 0
    localProject.author = project.author
    localProject.description = project.description
    localProject.name = project.name
    localProject.summary = project.summary
    localProject.topic = project.topic
    localProject.urlVideo = project.urlVideo
    localProject.urls = project.urls
    localProject.userId = project.userId
    localProject.date = project.date
    localProject.keywords = project.keywords



    const storageRef = storage.ref('images')
    let counter = imagesTabs.length + 1


    firestore.collection('projects').add(localProject).then((prodRef) => {
        if(comment.length !== 0) {
            for(let cmnt of comment) {
                cmnt.timestamp = firebase.firestore.Timestamp.fromDate(cmnt.timestamp)
                cmnt.local = false
                firestore.collection('projects').doc(prodRef.id).collection('comments').add(cmnt).then((cmntRef) => {
                    console.log('comment updated', cmntRef.id)
                })
            }
        }

        const made = project.isMaker?1:0
        firestore.collection('users').doc(project.userId).update({
            submitted: firebase.firestore.FieldValue.increment(1),
            made: firebase.firestore.FieldValue.increment(made)
        }).then(() => console.log("user's infos updated"))

        for(let image of imagesTabs){
            const uploadImagesTabs = storageRef.child(image.file.name).put(image.file)
            uploadImagesTabs.on('state_changed', () => {}, () => {}, () => {
                uploadImagesTabs.snapshot.ref.getDownloadURL().then((imgRef) => {
                    prodRef.update({imagesTabs: firebase.firestore.FieldValue.arrayUnion(imgRef)}).then(() => {
                        console.log(`main image ${counter++}uploaded`)
                        if(--counter) {
                            projectsStore.removeItem(project.name).then(() => console.log('deleted'))
                        }
                    })
                })
            })
        }

        const uploadMainImage = storageRef.child(image.file.name).put(image.file)
        uploadMainImage.on('state_changed', () => {}, () => {}, () => {
            uploadMainImage.snapshot.ref.getDownloadURL().then((mainImageRef) => {
                prodRef.update({mainImageUrl: mainImageRef}).then(() => {
                    if(--counter) {
                        projectsStore.removeItem(project.name).then(() => console.log('deleted'))
                    }
                    console.log(`image ${counter++}uploaded`)
                })
            })
        })
    })
}