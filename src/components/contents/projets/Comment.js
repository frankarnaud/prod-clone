import React from 'react'
import { List, ListItem, ListItemAvatar, Avatar, Box, Button, Typography, ListItemText, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import firebase, { firestore } from '../../../firebase/firebase.utils'
import { connect } from 'react-redux'
import { showFormat } from '../../../utils/appUtils'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import localStore from 'localforage'


const useStyles = makeStyles({
    box: {
        textAlign: 'center',
        cursor: 'pointer',
        textTransform: 'capitalize'
    },
    btn: {
        background: '#d44b11',
        color: 'white',
        '&:hover': {
            background: '#d44b11'
        }
    },
    listItemAvatar: {
        paddingBottom: '10px'
    },
    typoMenuComment: {
        fontSize :'13px'
    },
    typoComment: {
        fontSize: '12px',
        marginBottom: '10px'
    },
    avatar: {
        background: '#FF5722'
    }
})


const Comment = ({comment, projectId, user}) => {

    const classes = useStyles()
    const [reply, setReply] = React.useState(false)
    const [replies, setReplies] = React.useState([])
    const [repComment, setRepComment] = React.useState('')
    const { projectName } = useParams('projectName')

    const counter = useSelector(state => state.commentCounter[comment.id])

    const getReplies = (projectId) => {
        let localReplies = []
        const refReplies = firestore.collection('projects').doc(projectId).collection('comments').doc(comment.id).collection('replies')
        refReplies.onSnapshot((rep) => {
            rep.docChanges().forEach((change) => {
                if(change.type === 'added'){
                    let reply = change.doc.data()
                    reply.id = change.doc.id
                    localReplies.push(reply)
                }
            })
            setReplies(replies.concat(localReplies))
        })
       
    }

    const handleUpVoteClick = (args, ev) => {
        console.log('click')
    }

    const handleReplyClick = ev => {
        setReply(true)
    }
    const handleShareClick = (args, ev) => {
        console.log('click')
    }

    const handleChange = ev => {
        setRepComment(ev.target.value)
    }

    const replyComment = ev => {
        ev.stopPropagation()
        if(repComment.trim().length !== 0){
            const refComment = firestore.collection('projects').doc(projectId).collection('comments').doc(comment.id)
            
            if(user){
                const localComment = {
                    message: repComment,
                    author: user.displayName || 'hacker',
                    authorPhotoUrl: user.photoUrl || '',
                    upVote: 0,
                    replyCounter: 0,
                    timestamp: firebase.firestore.Timestamp.fromDate(new Date())
                }
                refComment.collection('replies').add(localComment).then(() => {
                    refComment.update({
                        replyCounter: firebase.firestore.FieldValue.increment(1)
                    }).catch((err) => console.log(err))
                }).catch((err) => {
                    console.log('error', err)
                })
        
                setRepComment('')
                setReply(false)
            }
            else {
                setReply(false)
            }
        }
        else {
            setRepComment('')
            setReply(false)
        }
    }
       
    React.useEffect(() => {
        localStore.getItem(projectName).then((storeValue) => {
            if(!storeValue) {
                getReplies(projectId)
            }
        })
    }, [projectId])
   
    if(comment){
        return (
            <ListItem style={{display: 'block'}}>
                <Box display="flex" flexGrow={1}>
                    <ListItemAvatar className={classes.listItemAvatar}><Avatar className={classes.avatar} src={(comment && comment.photoUrl) ||''}>{comment.author.charAt(0).toUpperCase()}</Avatar></ListItemAvatar>
                    <ListItemText primary={
                        <Typography variant="h6" style={{fontSize: '17px'}}>{comment.author || 'Author'}</Typography>
                    } />
                </Box>
                <Box ml={3} pl={3}>
                    <Box>{comment.message.split('\n').map((cmnt, index) =>(
                        <Typography className={classes.typoComment} key={index}>{cmnt}</Typography>
                    ) )}</Box>
                    <Box display="flex" mt={1}>
                        <Box mx={1} onClick={handleUpVoteClick.bind(this, null)} className={classes.box}><Typography variant="h6" color="textSecondary" className={classes.typoMenuComment}>Upvote ({comment.upVote})</Typography></Box>
                        <Box mx={1} onClick={handleReplyClick.bind(this)} className={classes.box}>
                            <Typography variant="h6" color="textSecondary" className={classes.typoMenuComment}>{counter || comment.replyCounter} reply</Typography>
                        </Box>
                        <Box mx={1} onClick={handleShareClick.bind(this, null)} className={classes.box}><Typography variant="h6" color="textSecondary" className={classes.typoMenuComment}>share</Typography></Box>
                        <Box mx={1} className={classes.box}><Typography variant="h6" color="textSecondary" className={classes.typoMenuComment}>{showFormat(comment)}</Typography></Box>
                    </Box>
                    {reply?(
                            <Box display="flex">
                                <Box flexGrow={1}><TextField fullWidth variant="outlined" 
                                    onChange={handleChange.bind(this)} inputProps={{style: {height: '0.2px'}}} value={repComment}/></Box>
                                <Box ml={1}><Button className={classes.btn} onClick={replyComment.bind(this)}>reply</Button></Box>
                            </Box>
                        ):null}
                </Box>
                {replies.length !== 0 ?(
                    <List dense component="nav">
                        {replies.map((reply, index) => (
                            <ListItem  style={{display: 'block', paddingLeft: '5.5%'}} key={index}>
                                <Box display="flex" flexGrow={1}>
                                    <ListItemAvatar style={{paddingBottom: '10px'}}><Avatar className={classes.avatar} src={reply.authorPhotoUrl || ''}>{reply.author.charAt(0).toUpperCase()}</Avatar></ListItemAvatar>
                                    <ListItemText primary={
                                        <Typography variant="h6" style={{fontSize: '17px'}}>{reply.author || 'Author'}</Typography>
                                    } />
                                </Box>
                                <Box ml={3} pl={3}>
                                         <Box>{reply.message.split('\n').map((cmnt, index) =>(
                                            <Typography className={classes.typoComment} key={index}>{cmnt}</Typography>
                                    ))}
                                    </Box>
                                    <Box display="flex" mt={1}>
                                        <Box mx={1} className={classes.box}><Typography variant="h6" color="textSecondary" className={classes.typoMenuComment}>Upvote ({reply.upVote})</Typography></Box>
                                        <Box mx={1} className={classes.box}><Typography variant="h6" color="textSecondary" className={classes.typoMenuComment}>{reply.replyCounter} reply</Typography></Box>
                                        <Box mx={1} className={classes.box}><Typography variant="h6" color="textSecondary" className={classes.typoMenuComment}>share</Typography></Box>
                                        <Box mx={1} className={classes.box}><Typography variant="h6" color="textSecondary" className={classes.typoMenuComment}>{showFormat(reply)}</Typography></Box>
                                    </Box>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                ): null}
            </ListItem>
        )
    }
    else {
        return null
    }

}


Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Comment)