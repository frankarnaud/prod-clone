import React from 'react'
import { Container, Grid, Typography, Paper, Box, TextField, IconButton, Button, Avatar, Divider, MenuItem, InputAdornment } from '@material-ui/core'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'
import firebase from '../../../firebase/firebase.utils'
import AddIcon from '@material-ui/icons/Add'
import LensIcon from '@material-ui/icons/Lens'
import CustomCheckbox from './CustomCheckbox'
import Preview from './Preview'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import clap from '../../../images/clap.png'
import smile from '../../../images/smile.png'
import moon from '../../../images/moon.png'
import { connect, useSelector, useDispatch } from 'react-redux'
import { generateKeywordsByNames, fromDateToString } from '../../../utils/appUtils'
import { useHistory, Redirect } from 'react-router-dom'
import { updateProjectInfo, updateUserProjectsInfos } from '../../../store/actions'
import  { projectsStore } from '../../../storage'
import uid from 'uid'
import { leaveSubmit } from '../../../store/actions'
import { submitProject } from '../../../store/asycActions'



const boxProps = {
    my: 2
}

const useStyles = makeStyles({
    btn: {
        background: '#d44b11',
        boxShadow: 'none',
        fontSize: '12px',
        fontWeight: 'bold',
        color: 'white',
        '&:hover': {
            background: '#d44b11',
        }
    },
    root: {
        flexGrow: 1,
        background: 'inherit'
    },
    label: {
        fontSize: '15px', 
        color: '#d44b11',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    link: {
        fontSize: '15px',
        color: '#d44b11',
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    },
    typoLabel: {
        fontSize: 'inherit',
        fontWeight: 'bold'
    },
    typoHeader: {
        fontSize: '30px',
        fontWeight: 'bold', 
        marginTop: '3%',
        marginBottom: '3%'
    },
    typoRequired: {
        fontSize: 'inherit'
    },

    paperStyle: {
        boxShadow: 'none',
        zIndex: 1, 
        paddingTop: '1%',
        fontSize: '13px'
    },
    avatar: {
        border: '1px dashed #cccccc',
        background:'none',
        width: '50px',
        height: '50px',
        marginRight: '1%'
    },
    container: {
        paddingLeft: "6%",
        paddingRight: "9%",
        paddingTop: 12
    },
    typoSize: {
        fontSize: '13px'
    },
    textField: {
        fontSize: '15px'
    },
    iconBtn: {
        fontSize: '10px',
        padding: 'none',
        color: 'rgb(215,215,215)',
        '&:hover': {
            background: 'none'
        },
    },
    iconBtnDisabled: {
        color: 'rgb(240,240,240)',
        '&:disabled': {
            color: 'rgb(240,240,240)'
        }
    },
    btnDisabled: {
        '&:disabled': {
            background: 'rgba(212, 75, 17, 0.4)',
            color: 'white'
        }
    },
    
    iconSize: {
        fontSize: 'inherit'
    },
    endAdornmentStyle: {
        fontSize: '12px'
    },
    inputFile: {
        display: 'none'
    }
})

const inputStyles = makeStyles({
    root: {
        overflow: 'hidden',
        borderRadius: 4,
        '&:hover': {
          backgroundColor: '#fff',
          borderColor: 'red'
        },
    },
})


const style = {
    height: '0.2px',
    fontSize: '14px'
}


const icons = [clap, smile, moon]
const messages = ['Tell us about this product', "Let's make this product look nice", 'Who made this product?']
const statusMessages = [
    {
        title: 'status',
        body: 'This product isn’t available yet'
        },
        {
            title: 'Are you a Maker of this product?',
            body: 'Yes, I worked on this product'
        }
]

const options = [
    {
        label: 'Productivity ',
        value: 'productivity'
    },
    {
        label: 'Developper Tools',
        value: 'developper tools'
    },
    {
        label: 'Tech',
        value: 'tech'
    },
    {
        label: 'Artificial Intelligence',
        value: 'Artificial intelligence'
    },
    {
        label:'Marketing',
        value:'marketing'
    },
    {
        label:'User Experience',
        value: 'User experience'
    }

]

const MAX_LENGTH = 40
const MAIN_FILE_IMAGE_SIZE = 1024*1024

const MAKERS = []


const Submission = ({user, url, updateProjectInfo}) => {
    const classes = useStyles()
    const inputClasses = inputStyles()
    const [activeStep, setActiveStep] = React.useState(0)
    const [checkedStatus, setCheckedStatus] = React.useState(false)
    const [checkedOwner, setCheckedOwner] = React.useState(false)
    const [icon, setIcon] = React.useState(icons[activeStep])
    const [pad, setPad] = React.useState(40)
    const [name, setName] = React.useState('')
    const [summary, setSummary] = React.useState('')
    const [topic, setTopic] = React.useState('')
    const [urls, setUrls] = React.useState([url])
    const [imageUrls, setImageUrls] = React.useState([])
    const [urlVideo, setUrlVideo] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [productTwitterAccount, setProductTwitterAccount] = React.useState('')
    const [marker, setMarker] = React.useState('')
    const [comment, setComment] = React.useState('')
    const [message, setMessage] = React.useState(messages[activeStep])
    const history = useHistory()
    const dispatch = useDispatch()
    const isOnline = useSelector(state => state.isOnline)
    const leave = useSelector(state => state.leaveSubmit)
    const projectsInfos = useSelector(state => state.userProjectsInfos.projectsInfos)


  const uploadFileImage = (fileImage, targetField) => {
        let reader = new FileReader()
        reader.onload = (ev) => {
            
            if(targetField === 'main'){
                if(imageUrls.length !== 0) {
                    setImageUrls([{file: fileImage, fileBlod: ev.target.result},...imageUrls.slice(1)])
                }
                else {
                    setImageUrls([{file: fileImage, fileBlod: ev.target.result},...imageUrls])
                }
            }
            else {
                setImageUrls([...imageUrls, {file:fileImage, fileBlod: ev.target.result}])
            }
        }

        reader.readAsDataURL(fileImage)
    }

  const handleChangeMainImage = (pageNumber, ev) => {
      let files = ev.target.files
      if(files.length !== 0 && files[0].size <= MAIN_FILE_IMAGE_SIZE){
          if(pageNumber === 1){
              uploadFileImage(files[0], 'main')
          }
          else {
              uploadFileImage(files[0], 'secondary')
          }
      }
  }

  const handleAccountChange = ev => {
      setProductTwitterAccount(ev.target.value)
  }
 
    const handleMakerChange = ev => {
        setMarker(ev.target.value)
    }

    const handleChangeName = ev => {
        setName(ev.target.value)
    }

    const handleChangeSummary = ev => {
        setSummary(ev.target.value)
    }

    const handleChangeTopic = ev => {
        setTopic(ev.target.value)
    }

    const handleChangeArea = ev => {
        setDescription(ev.target.value)
    }

    const handleCheckboxChange = (status, checkbox_index) => {
        if(checkbox_index === 1){
            setCheckedStatus(status)
        }
        else {
            setCheckedOwner(status)
        }
    }
  
    const setNext = (step, pad) => {
        handleButtonClick(step + 1)
        setPad(pad)
    }

    const enablePageImageButton = () => {
        if(name && summary && topic && imageUrls[0]){
            return false
        }
        return true
    }

    const handleVideoChange = ev => {
        setUrlVideo(ev.target.value)
    }

    const handlePageImage = () => {
        setNext(activeStep, 5)
    }

    const handlePageMarker = () => {
        setNext(activeStep, 5)
    }

    const handleCommentChange = ev => {
        setComment(ev.target.value)
    }

    const handleNextLaunch = () => {
        
        let project = {name: name.toLowerCase(), summary, topic, urls, description, urlVideo, mainImageUrl: imageUrls[0], topicCounter: 0, 
            author: user.displayName, authorPhotoUrl: user.photoURL || '', imagesTabs: [...imageUrls.slice(1)],
            isHunter: checkedStatus, isMaker: checkedOwner, userId: user.uid, userRole: user.role || 'Developper'}

        let firstComment = {
                message: comment,
                author: user.displayName || '',
                authorPhotoUrl: user.photoUrl || '',
                upVote: 0,
                replyCounter: 0,
                timestamp: firebase.firestore.Timestamp.fromDate(new Date())
            }

        project.keywords = generateKeywordsByNames(name.toLowerCase())
        project.date = fromDateToString(new Date())

        if(isOnline){
            if(comment){
                dispatch(submitProject(project, firstComment))
            }
            else {
                dispatch(submitProject(project, null))
            }
        }
        else {
            project.id = uid()
            project.counter = 0
            project.relatedProjects = []
            project.offline = true
            firstComment.local = true
            firstComment.timestamp = new Date()
            firstComment.id = uid()

            if(comment){
                project.comment = [firstComment]
            }
            else {
                project.comment = []
            }
            let made = project.isMaker?1:0
            projectsStore.setItem(name, project).then((storeValue) => {
                if(projectsInfos) {
                    dispatch(updateUserProjectsInfos('projectsInfos', {...projectsInfos, submitted: projectsInfos.submitted + 1,
                        made: projectsInfos.made + made}))
                }
                else {
                    dispatch(updateUserProjectsInfos('projectsInfos', {...projectsInfos, submitted: 1,
                        made}))
                }
                
                dispatch(updateUserProjectsInfos('submitted', [storeValue]))
                dispatch(leaveSubmit({leave: true, id: storeValue.id}))
            })
        }        
    }

    const handleButtonClick = (step) => {
        setActiveStep(step)
        setMessage(messages[step])
        setIcon(icons[step])
        if(step === 0){
            setPad(40)
        }
    }

    React.useEffect(() => {
        if(leave && leave.leave){
            updateProjectInfo({id: leave.id, topic, online: isOnline})
            dispatch(leaveSubmit({leave: false, id: ''}))
            history.push(`/posts/${name}`)
        }
    }, [leave])

    if(url){
        return (
            <Container className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                       <Box display="flex"><Box pt={3} mr={2}><img style={{height: '27px'}} src={icon} alt="icon"/></Box> <Typography variant="h5" className={classes.typoHeader}>{message}</Typography></Box>
                        <Paper className={classes.paperStyle}>
                            {activeStep === 0 ?(
                                <Box m={2}>
                                <Box display="flex" my={2}>
                                    <Typography className={classes.typoLabel}>Name of the product - </Typography><Typography style={{fontSize: 'inherit'}} color="textSecondary"> Required</Typography>
                                </Box>
                                <Box><TextField placeholder="Simply the name of the product" required variant="outlined" fullWidth value={name}
                                   InputProps={{endAdornment: <InputAdornment classes={{root: classes.endAdornmentStyle}} position="end">{`${name.length}/${MAX_LENGTH}`}</InputAdornment>}} inputProps={{style}} onChange={handleChangeName.bind(this)} /></Box>
                                <Box display="flex" my={2}>
                                    <Typography className={classes.typoLabel}>Tagline - </Typography><Typography color="textSecondary" style={{fontSize: 'inherit'}}> Required</Typography>
                                </Box>
                                <Box><TextField inputProps={{style}} placeholder="Concise and descriptive tagline of the product"
                                    InputProps={{endAdornment: <InputAdornment classes={{root: classes.endAdornmentStyle}} position="end">{`${summary.length}/${MAX_LENGTH + 20}`}</InputAdornment>}} 
                                    onChange={handleChangeSummary.bind(this)} required variant="outlined" fullWidth value={summary}/></Box>
                                <Box display="flex" my={2}>
                                    <Typography className={classes.typoLabel}>Topics</Typography>
                                </Box>
                                <Box><TextField  placeholder="Add a topic" select variant="outlined" fullWidth  value={topic} 
                                   onChange={handleChangeTopic.bind(this)} inputProps={{style: {height: '0.1px'}}}> 
                                        {options.map((option) => (
                                            <MenuItem style={{fontSize: '14px'}} key={option.value} value={option.value}>{option.label}</MenuItem>
                                        ))}
                                    </TextField> 
                                </Box>
                                <Box display="flex" my={2}>
                                    <Typography className={classes.typoLabel}>Download link - </Typography><Typography color="textSecondary" style={{fontSize: 'inherit'}}> App Store, Google Play…</Typography>
                                </Box>
                                <Box mb={2}><TextField disabled variant="outlined" fullWidth value={urls[0]}
                                inputProps={{style}}/></Box>
                                <span className={classes.link}>+ add another download link</span>
                                <Box mt={2}>
                                    <Box display="flex" > 
                                        <Typography className={classes.typoLabel}>Thumbnail - </Typography><Typography style={{fontSize: 'inherit'}} color="textSecondary"> Required</Typography>
                                    </Box>
                                    <Box><Typography style={{fontSize: 'inherit'}} color="textSecondary">Keep it simple. Please no flashy GIFs.</Typography></Box>
                                    <Box mt={2} display="flex">
                                        <Avatar variant="square" src={imageUrls[0] && imageUrls[0].fileBlod} style={{width: '75px', height: '75px'}} className={classes.avatar}>
                                            <input required accept="image/*" className={classes.inputFile} id="icon-button-page-1" 
                                                type="file"  onChange={handleChangeMainImage.bind(this, 1)}/>
                                            <label htmlFor="icon-button-page-1">
                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <InsertPhotoIcon />
                                                </IconButton>
                                            </label>
                                        </Avatar>
                                        <Box>
                                            <Box>
                                                <Box mx={2}>
                                                    <input type="file" accept="image/*" id="upload-file-page-1" className={classes.inputFile}
                                                        onChange={handleChangeMainImage.bind(this, 1)}/>
                                                    <label htmlFor="upload-file-page-1"  className={classes.label}>
                                                        Upload image
                                                    </label>
                                                    <label> or </label>
                                                    <label className={classes.label}>paste URL</label>
                                                </Box>
                                                <Box mt={2} mx={1}>
                                                    <Typography className={classes.typoSize} color="textSecondary">Recommended size: 240x240</Typography>
                                                    <Typography className={classes.typoSize} color="textSecondary">JPG, PNG, GIF. Max size: 2MB</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <CustomCheckbox classStyle={[classes.typoLabel, classes.typoSize]} checked={checkedStatus} handleChange={handleCheckboxChange}
                                    messageTitle={`${statusMessages[0].title}`} messageBody={`${statusMessages[0].body}`} index={1} />
                            </Box>
                            ):null}
                            {activeStep === 1?(
                                <Box mx={2}>
                                <Box>
                                    <Typography style={{fontSize: '13px', fontWeight: 'bold'}}>Gallery</Typography>
                                    <Typography className={classes.typoSize} color="textSecondary">Recommended size: 240x240</Typography>
                                    <Box>
                                        <Avatar variant="square" className={classes.avatar} style={{width: '100%',
                                        height:'85px', display:"block", paddingBottom: '3%'}}>
                                             <Box textAlign="center">
                                             <input accept="image/*" className={classes.inputFile} id="icon-button-image" type="file" onChange={handleChangeMainImage.bind(this, 2)} />
                                                <label htmlFor="icon-button-image">
                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <InsertPhotoIcon style={{fontSize: '45px'}}/>
                                                </IconButton>
                                            </label>
                                             </Box>
                                            <Box mx={2} textAlign="center">
                                                <input type="file" accept="image/*" id="upload-file" className={classes.inputFile} onChange={handleChangeMainImage.bind(this, 2)} />
                                                <label htmlFor="upload-file"  className={classes.label}>
                                                    Upload image
                                                    </label>
                                                    <label style={{color: 'grey', fontSize: '15px'}}> or </label>
                                                    <label className={classes.label}>paste URL</label>
                                            </Box>
                                        </Avatar>
                                        <Box display="flex" mt={1} mb={1} flexWrap="wrap">
                                            <Avatar variant="square" className={classes.avatar} src={imageUrls[1] && imageUrls[1].fileBlod}/>
                                            <Avatar variant="square" className={classes.avatar} src={imageUrls[2] && imageUrls[2].fileBlod}/>
                                            <Avatar variant="square" className={classes.avatar} src={imageUrls[3] && imageUrls[3].fileBlod}/>
                                            {imageUrls.slice(4).map((image) => (
                                                <Avatar variant="square" className={classes.avatar} src={image.fileBlod} />
                                            ))}
                                        </Box>
                                    </Box>
                                    <Box display="flex" {...boxProps}>
                                        <Typography className={classes.typoLabel}>YouTube video - </Typography>
                                        <Typography style={{fontSize: 'inherit'}} color="textSecondary">Optional</Typography>
                                    </Box>
                                    <Box>
                                        <TextField inputProps={{style}} variant="outlined" fullWidth onChange={handleVideoChange.bind(this)}
                                        value={urlVideo} placeholder="Video of the product"/>
                                    </Box>
                                    <Box display="flex" {...boxProps}>
                                        <Typography className={classes.typoLabel}>Description - </Typography>
                                        <Typography style={{fontSize: 'inherit'}} color="textSecondary">Required</Typography>
                                    </Box>
                                    <Box>
                                        <TextField placeholder="Short description of the product" required fullWidth  multiline 
                                        value={description} onChange={handleChangeArea.bind(this)} variant="outlined"  inputProps={{style: {fontSize: '12px'}}} rows={4}/>
                                    </Box>
                                </Box>
                                <CustomCheckbox classStyle={[classes.typoLabel, classes.typoSize]} checked={checkedOwner} handleChange={handleCheckboxChange}
                                    messageTitle={`${statusMessages[1].title}`} messageBody={`${statusMessages[1].body}`} index={2} />
                            </Box>
                            ):null}
                           {activeStep === 2?(
                                <Box>
                                    <Box m={2}>
                                        <Box my={2}>
                                            <Typography className={classes.typoLabel}>Product's Twitter account</Typography>
                                        </Box>
                                        <Box><TextField variant='outlined' fullWidth value={productTwitterAccount}
                                            placeholder="https://twitter.com/productname" onChange={handleAccountChange.bind(this)} inputProps={{style}}/>
                                        </Box>
                                        <Box my={2}>
                                            <Typography className={classes.typoLabel}>Makers</Typography>
                                        </Box>
                                        <Box display="flex">
                                            <Box flexGrow={1}><TextField InputProps={{classes: inputClasses}} variant="outlined" fullWidth 
                                                value={marker} inputProps={{style}} onChange={handleMakerChange.bind(this)}/>
                                            </Box>
                                            <Box ml={1}>
                                                <Button variant="outlined">
                                                    <AddIcon />
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Divider />
                                    <Box m={2} mt={2}>
                                        <Box mt={2} mb={1}>
                                            <Typography className={classes.typoLabel}>Write the first comment</Typography>
                                        </Box>
                                        <Box><TextField inputProps={{style: {fontSize: '14px'}}} fullWidth variant="outlined" multiline onChange={handleCommentChange.bind(this)}
                                            placeholder="Explain how you discovered this product... invite people to join the conversation, ask questions to the Makers."
                                             value={comment} rows={2}/></Box>
                                    </Box>
                                </Box>
                           ):null}
    
                            <Box display="flex" pb={2}>
                                <Box flexGrow={1}>
                                    <IconButton onClick={handleButtonClick.bind(this,0)} className={clsx(classes.iconBtn, classes.iconBtnDisabled)} disabled={activeStep === 0}><LensIcon className={classes.iconSize}/></IconButton>
                                    <IconButton onClick={handleButtonClick.bind(this,1)} className={clsx(classes.iconBtn)} disabled={activeStep <= 1}><LensIcon className={classes.iconSize}/></IconButton>
                                    <IconButton className={clsx(classes.iconBtn, classes.iconBtnDisabled)} disabled={activeStep <= 2}><LensIcon className={classes.iconSize}/></IconButton>
                                </Box>
                                <Box mx={2}>
                                    {activeStep === 0?<Button disableRipple className={clsx(classes.btn, classes.btnDisabled)} onClick={handlePageImage}
                                        disabled={enablePageImageButton()}>next: images</Button>:null}
                                    {activeStep === 1?<Button disableRipple className={clsx(classes.btn, classes.btnDisabled)} onClick={handlePageMarker} disabled={description.length <= 5}>next: markers</Button>:null}
                                    {activeStep === 2?<Button variant="outlined" style={{fontSize: '12spx',marginRight: '5px'}}>schedule launch</Button>:null}
                                    {activeStep === 2?<Button disableRipple className={classes.btn} onClick={handleNextLaunch}>launch now</Button>:null}
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Preview activeStep={activeStep} pad={pad} name={name} topic={topic} imageUrl={imageUrls}
                            summary={summary} description={description} comment={comment}/>
                    </Grid>
                </Grid>
            </Container>
        )
    }
    else {
        return <Redirect to="/posts/new" />
    }
   
}


const mapStateToProps = state => ({
    user: state.user,
    url: state.url
})

export default connect(mapStateToProps, {updateProjectInfo})(Submission)