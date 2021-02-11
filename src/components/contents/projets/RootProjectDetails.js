import React from 'react'
import { Dialog, Container, Grid, Box, Divider, Typography, Avatar, Paper } from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import ProjectDetails from './ProjectDetails'
import useStyles from '../../headers/HeaderStyle'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { projectsStore } from '../../../storage'
import RelatedProduct from './RelatedProduct'
import ProductDetailsHeader from './ProjectDetailsHeader'
import VoteCounter from './VoteCounter'
import LearnMore from './LearnMore'
import TwitterIcon from '@material-ui/icons/Twitter'
import { makeStyles } from '@material-ui/core/styles'
import idea from '../../../images/idea.jpg'
import prodhunt from '../../../images/prodhunt_image.png'
import Discussion from './Discussion'
import CloseIcon from '@material-ui/icons/Close'
import { getProjectDetails } from '../../../store/asycActions'
import HunterMaker from './HunterMaker'
import hack_1 from '../../../images/hack_1.jpeg'
import hack_2 from '../../../images/hack_2.jpeg'



const useLStyles = makeStyles({
  typo: {
    cursor: 'pointer',
    '&:hover': {
      color: 'black'
    }
  },
  size: {
    width: '15px'
  },
  paper: {
    width: '40px',
    height: '40px',
    display:'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    cursor: 'pointer'  
  },
})


const RootProjectDetails = ({projectInfo}) => {
    const classes = useStyles()
    const lClasses = useLStyles()
    const location = useLocation()
    const history = useHistory()
    const { projectName } = useParams()

    const dispatch = useDispatch()
    const projectDetails = useSelector(state => state.projectDetails[location.key])
    const [counter, setCounter] = React.useState(0)
    const [relatedProjects, setRelatedProjects] = React.useState([])
    
    const [local, setLocal] = React.useState(null)

    const close = () => {
      if(projectInfo.from){
        history.replace(projectInfo.from)
      }
      else {
        history.goBack()
      }
    }

    const handleClick = ev => {
      ev.stopPropagation()
    }

    const loadRelatedProducts = (projectInfo, projectName, key) => {
      if(!projectDetails){
        dispatch(getProjectDetails(projectInfo, projectName, key))
      }
      else {
          setCounter(projectDetails.voteCounter)
          setRelatedProjects(projectDetails.relatedProjects)
      }
    }

    React.useEffect(() => {
      projectsStore.getItem(projectName).then((storeValue) => {
        if(storeValue) {
          setLocal(storeValue)
          setCounter(storeValue.counter)
          setRelatedProjects(storeValue.relatedProjects)
        }
        else {
          loadRelatedProducts(projectInfo, projectName, location.key)
        }   
      })  
    }, [projectInfo, location])


    return (
     <Dialog open={true} fullScreen PaperProps={{style: {
       background: 'transparent', paddingLeft: '50px', paddingRight: '40px', paddingTop: '4%'
     }}} onClick={close}>

        <Box mb={3}>
          <Paper onClick={close} className={lClasses.paper}>
              <CloseIcon />
          </Paper>
        </Box>
        <Container className={classes.container} maxWidth="lg" style={{background: 'inherit'}} onClick={handleClick.bind(this)}>
        <Paper style={{background: 'rgb(240, 240, 240)', padding: '25px'}}>
        <ProductDetailsHeader  project={local || projectDetails}/>
        {(local || projectDetails)?(
            <Grid container>
              <Grid item xs={12} md={8}>
                <ProjectDetails details={local || projectDetails}/>
                <Discussion projectId={(local && local.id) || projectDetails.id} />
              </Grid>
              <Grid item md={4} xs={false}>
                <Box display="flex" flexDirection="column" paddingLeft={2}>
                  <Box height={470} display="flex" flexDirection="column">
                    <Box display="flex">
                    <VoteCounter details={true} counter={counter} projectId={(local && local.id) || projectDetails.id} />
                      <Box>
                      <AvatarGroup max={3}>
                        <Avatar className={classes.size} src={idea} />
                        <Avatar className={classes.size}>R</Avatar>
                        <Avatar className={classes.size} src={prodhunt}/>
                      </AvatarGroup>
                      </Box>
                    </Box>
                    {projectDetails && projectDetails.urls.map((url, index) => (
                        <LearnMore message="Website" siteUrl={url} key={index} />
                    ))}
                    {local && local.urls.map((url, index) => (
                        <LearnMore message="Website" siteUrl={url} key={index} />
                    ))}
                    <Box mt={3}><Typography color="textSecondary"><TwitterIcon className={lClasses.typo}/> </Typography></Box>
                    <Divider />
                    <Box className={lClasses.paperMaker} mt={3}>
                      <Paper style={{boxShadow: 'none'}}>
                          <HunterMaker author={(local && local.author) || projectDetails.author} authorPhoto={(local && local.authorPhotoUrl) || projectDetails.authorPhotoUrl || hack_1} role="Developper" message="Hunter"/>
                         {((local && local.isMaker) || projectDetails.isMaker)?<HunterMaker author={(local && local.author) || projectDetails.author} authorPhoto={(local && local.authorPhotoUrl) || projectDetails.authorPhotoUrl || hack_2} role="Developper" message="Maker"/>:null}
                      </Paper>
                  </Box>
                  </Box>
                 
                  <Divider />
                    <Box mt={1}>
                      <RelatedProduct relatedProducts={relatedProjects} />
                    </Box>
                </Box>
              </Grid>
          </Grid>
          ): <div></div>}
        </Paper>
      </Container>
     </Dialog>
  )
}

const mapStateToProps = (state) => ({
  projectInfo: state.projectInfo
})

export default connect(mapStateToProps)(RootProjectDetails)