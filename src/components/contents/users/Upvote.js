import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVotedProjects } from '../../../store/asycActions'
import ProjetSummary from '../projets/ProjectSummary'
import { Divider } from '@material-ui/core'


const Upvote = () => {

    const dispatch = useDispatch()
    const infos = useSelector(state => state.userProjectsInfos.projectsInfos)
    const upvotes = useSelector(state => state.userProjectsInfos.upvotes)
    const [projects, setProjects] = React.useState([])
    const getUpVotedProjects = () => {
        if (!infos && !upvotes && infos.votedProjects.length !== 0) {
            dispatch(getVotedProjects(infos.votedProjects))
        }
        else {
            setProjects(upvotes)
        }
    }

    React.useEffect(() => {
        getUpVotedProjects()
    }, [upvotes])

    if (projects && projects.length !== 0) {
        return (
            projects.map((project, index) => (
                <React.Fragment key={index}>
                    <ProjetSummary project={project}/>
                    <Divider />
                </React.Fragment>
            ))
        )
    }
    else {
        return null
    }
}


export default Upvote