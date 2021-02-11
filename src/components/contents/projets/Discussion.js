import React from 'react'
import { Typography, List, Box, ListItem, ListItemAvatar, Divider, TextField, Avatar, Paper, Button } from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { connect, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import CommentList from './CommentList'
import firebase, { firestore } from '../../../firebase/firebase.utils'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MoodBadIcon from '@material-ui/icons/MoodBad'
import { updateCommentCounter, updateDialog } from '../../../store/actions'
import localStore from 'localforage'
import { useParams } from 'react-router-dom'


const fielStyles = makeStyles({
    root: {
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#1DA1F2'
        },
        '&:focused': {
            borderColor: '#1DA1F2'
        }
    }
})

const useStyles = makeStyles({
    btn: {
        background: '#d44b11',
        color: 'white',
        boxShadow: 'none',
        '&:hover': {
            background: '#d44b11',
            padding: 'none'
        }
    },
    yes: {
        color: 'green',
        background: 'rgba(0,240,0,0.2)',
        fontSize: '10px',
        '&:hover': {
            border: '1px solid green',
        }
    },
    no: {
        color: 'red',
        fontSize: '10px',
        background: 'rgba(240,0,0,0.2)',
        '&:hover': {
            border: '1px solid red',
        }
    },
    user: {
        background: '#FF5722'
    }
})

const Discussion = ({ user, projectId}) => {
    const lClasses = useStyles()
    const classes = fielStyles()
    const [value, setValue] = React.useState('')
    const [comments, setComments] = React.useState([])
    const dispatch = useDispatch()
    const { projectName } = useParams('projectName')

    const getComments = (projectId) => {
        let localComments = []
        const refComments = firestore.collection('projects').doc(projectId).collection('comments')
        refComments.onSnapshot((productComments) => {
            productComments.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    let comment = change.doc.data()
                    comment.id = change.doc.id
                    localComments.push(comment)
                    setComments(comments.concat(localComments))
                }
                else if (change.type === 'modified') {
                    let comment = change.doc.data()
                    comment.id = change.doc.id
                    dispatch(updateCommentCounter(comment))
                }
            })
        })
    }

    const handleSearch = (ev) => {
        setValue(ev.target.value)
    }


    const handleClick = ev => {
        if (user) {
            const comment = {
                message: value,
                author: user.displayName || 'hacker',
                authorPhotoUrl: user.photoUrl || '',
                upVote: 0,
                replyCounter: 0,
                timestamp: firebase.firestore.Timestamp.fromDate(new Date())
            }
            firestore.collection('projects').doc(projectId).collection('comments').add(comment).catch((err) => {
                console.log(err)
            })

            setValue('')
        }
        else {
            dispatch(updateDialog(true))
        }
    }

    React.useEffect(() => {
        localStore.getItem(projectName).then((storeValue) => {
            if (storeValue) {
                setComments(comments.concat(storeValue.comment))
            }
            else {
                getComments(projectId)
            }
        })
    }, [projectId])

    return (
        <React.Fragment>
            <Typography variant="h6" color="textSecondary" style={{ textTransform: 'uppercase', fontSize: '12px', marginTop: '5%', marginBottom: '2%' }}>Discussion</Typography>
            <Paper style={{ boxShadow: 'none' }}>
                <List dense>
                    <ListItem style={{ display: 'block' }}>
                        <Box mb={3} display="flex">
                            <Typography variant="h6" style={{ fontSize: '14px' }}>Would you recommend this product ? </Typography>
                            <Box display="flex">
                                <Box mx={1}><Button size="small" disableElevation className={lClasses.yes} variant="text" startIcon={<InsertEmoticonIcon />}>Yes</Button></Box>
                                <Box><Button disableElevation size="small" className={lClasses.no} variant="text" startIcon={<MoodBadIcon />}>No</Button></Box>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="flex-start" mb={2}>
                            <ListItemAvatar>
                                <Avatar className={user ? classes.user : ''} src={(user && user.photoURL) || ''}>{(user && user.displayName && user.displayName.charAt(0)) || <AccountBoxIcon />}</Avatar>
                            </ListItemAvatar>
                            <Box flexGrow={1} mr={1}>
                                <TextField variant="outlined" fullWidth inputProps={{ style: { height: '1px' } }} InputProps={{ classes }}
                                    value={value} placeholder="What do you think of this product?"
                                    onChange={handleSearch.bind(this)} />
                            </Box>
                            <Box>
                                <Button onClick={handleClick.bind(this)} disableElevation variant="contained" className={lClasses.btn}>send</Button>
                            </Box>
                        </Box>
                    </ListItem>
                    <Divider />
                    <Box mt={2}>
                        <CommentList comments={comments} projectId={projectId}/>
                    </Box>
                </List>
            </Paper>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

Discussion.propTypes = {
    user: PropTypes.object,
    projectId: PropTypes.string,
}

export default connect(mapStateToProps)(Discussion)