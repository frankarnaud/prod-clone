import React from 'react'
import { Box, Link, Typography } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import SettingMenu from './SettingMenu'

const linkStyles = {
    '& :hover':{
      color: '#505050'
    }
}

const useStyles = makeStyles({
    linkStyles
})

function OptionMenu(){
    const classes = useStyles()

    return (
        <Box display="flex" pt={1}>
            <Box mr={1} mt={1}>
                <Typography color="textSecondary" className={classes.linkStyles}>
                    <Link to="/posts/new" color="textSecondary" underline="none" component={RouterLink}>Post</Link>
                </Typography>
            </Box>
            <Box mx={1} mt={1}>
                <Typography  className={classes.linkStyles}>
                    <Link to="/notifications" color="textSecondary" component={RouterLink}><NotificationsIcon /></Link>
                </Typography>
            </Box>
            <Box ml={1} mb={1}>
                <SettingMenu />
            </Box>
        </Box>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(OptionMenu)