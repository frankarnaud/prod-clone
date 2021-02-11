import React from 'react'
import { List, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItem, Paper } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    paper: {
        boxShadow: 'none', 
        marginTop: '10px',
         height: '60px', 
         display: 'flex', 
         alignItems:'center'
    }
})

export default function LearnMore({message, siteUrl}) {
    const classes = useStyles()
    const history = useHistory()
    const handleClick = () => {
        history.push('/')
    }
    return (
        <Paper className={classes.paper}>
            <List component="nav" style={{flexGrow: 1, cursor: 'pointer'}} onClick={handleClick}>
                <ListItem>
                <ListItemAvatar>
                    <Avatar><MoreHorizIcon style={{color: 'white', fontSize: '25px'}}/></Avatar>
                </ListItemAvatar>
                <ListItemText primary={message} secondary={siteUrl || 'test.kola.com'} />
                <ListItemSecondaryAction>
                    <ArrowForwardIosIcon  style={{color: 'grey'}}/>
                </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Paper>
    )
}