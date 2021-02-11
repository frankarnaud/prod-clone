import React from 'react'
import { List, ListItem, ListSubheader, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'


const HunterMaker = ({author, authorPhoto, role, message}) => {

    return (
        <List subheader={<ListSubheader>{message}</ListSubheader>} dense>
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={authorPhoto} />
                </ListItemAvatar>
                <ListItemText primary={`${author}`} secondary={`${role}`} />
            </ListItem>
        </List>
    )
}


export default HunterMaker