import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem, ListItemText, Avatar, Box, Button, Typography, Menu, MenuItem, ListItemAvatar } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CodeIcon from '@material-ui/icons/Code'
import FlagIcon from '@material-ui/icons/Flag'
import { makeStyles } from '@material-ui/core/styles'
import { formatName } from '../../../utils/appUtils'
import { imagesStore } from '../../../storage'

const useStyles = makeStyles({
    typo: {
        cursor: 'pointer'
    },
    btn: {
        boxShadow: 'none',
        fontSize: '10px',
        color: 'grey'
    }
})

const defaultProps = {
    transformOrigin: {
        vertical: 'top',
        horizontal: 'center'
    },
    keepMounted: true,
    getContentAnchorEl: null
}



const ProductDetailsHeader = ({ project }) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [image, setImage] = React.useState(null)
    const openMenu = (ev) => {
        setAnchorEl(ev.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    React.useEffect(() => {
        if (project) {
            if (project.offline) {
                setImage(project.mainImageUrl.fileBlod)
            }
            else {
                imagesStore.getItem(project.id).then((storeValue) => {
                    if (!storeValue) {
                        fetch(project.mainImageUrl).then((response) => {
                            return response.blob()
                        }).then((blod) => {
                            const localImageUrl = URL.createObjectURL(blod)
                            setImage(localImageUrl)
                            imagesStore.setItem(project.id, blod).then(() => console.log('image are stored'))
                        })
                    }
                    else {
                        setImage(URL.createObjectURL(storeValue))
                    }
                })
            }
        }

    }, [project])

    return (
        <List component="nav">
            <ListItem>
                <ListItemAvatar>
                    <Avatar variant="square" src={image || ''} style={{ width: 90, height: 90, marginRight: '15px' }}>P</Avatar>
                </ListItemAvatar>
                {project ? (
                    <Box display="flex" flexDirection="column">
                        <Box display="flex" justifyContent="center" alignItems="flex-start" pb={2}>
                            <ListItemText primary={
                                <Box display="flex" mb={0}>
                                    <Typography>{formatName(project.name)}</Typography>
                                    <Typography className={classes.typo}><ExpandMoreIcon onClick={openMenu.bind(this)} /></Typography>

                                </Box>}
                                secondary={`${project.summary}`} />
                        </Box>
                        <Menu {...defaultProps} onClose={handleClose} open={Boolean(anchorEl)} anchorEl={anchorEl}>
                            <MenuItem>
                                <Button variant="outlined" startIcon={<CodeIcon />} fullWidth>embed</Button>
                            </MenuItem>
                            <MenuItem>
                                <Button variant="outlined" startIcon={<FlagIcon />} fullWidth>flag</Button>
                            </MenuItem>
                        </Menu>
                        <Box display="flex" justifyContent="flex-start" pb={1}>
                            <Box>
                                <Button variant="outlined" size="small" className={classes.btn}>{project.topic}</Button>
                            </Box>
                            {project.other ? <Box>
                                <Button variant="outlined">{project.topic}</Button>
                            </Box> : null}
                        </Box>
                    </Box>
                ) : null}
            </ListItem>
        </List>
    )
}

ProductDetailsHeader.propTypes = {
    project: PropTypes.object
}

export default ProductDetailsHeader