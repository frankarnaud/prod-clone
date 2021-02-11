import React from 'react'
import { Box, Typography, Paper, List, ListItem, Button, Divider, Avatar } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import useStyles from './leftContentStyle'
import clsx from 'clsx'
import img from '../../../images/img.jpeg'
import images from '../../../images/images.jpeg'
import image10 from '../../../images/10.jpeg'



const UpcomingProduct = () => {
    const classes = useStyles()

    return (
        <Box>
            <Box display="flex" py={1.6}>
                <Box><Typography className={classes.typoTitle}>Upcoming Products </Typography></Box>
                <Box pt={0.5} pl={1}><Typography color="textSecondary" style={{fontSize: '12px'}}>Powered by Ship</Typography></Box> 
            </Box>
            <Paper>
                <List>
                    <ListItem className={classes.item}>
                        <Box display="flex" m={0}>
                            <Box flexGrow={1} pt={1}>
                                <Box><Typography className={clsx(classes.typoSize, classes.typoWeight)}>Airwalk</Typography></Box>
                                <Box><Typography className={classes.typoSize} color="textSecondary">Stay in touch with your team, without call overload</Typography></Box>
                            </Box>
                            <Avatar variant="square" src={img} />
                        </Box>
                        <Box>
                            <Button variant="text" className={clsx(classes.btnSize,classes.btnHover)} startIcon={<AddIcon style={{fontSize: '12px'}}/>}><span className={classes.spanHover}>follow (83)</span></Button>
                        </Box>
                    </ListItem>
                    <Divider />
                    <ListItem className={classes.item}>
                        <Box display="flex" pt={1}>
                            <Box flexGrow={1}>
                                <Box><Typography className={clsx(classes.typoSize, classes.typoWeight)}>Jira Integration Plus for Strive</Typography></Box>
                                <Box><Typography color="textSecondary" className={classes.typoSize}>Connect Jira to Stride - for Jira Server and Cloud</Typography></Box>
                            </Box>
                            <Avatar variant="square" src={image10} />
                        </Box>
                        <Box>
                            <Button variant="text" className={clsx(classes.btnSize,classes.btnHover)} startIcon={<AddIcon style={{fontSize: '12px'}}/>}><span className={classes.spanHover}>follow (87)</span></Button>
                        </Box>
                    </ListItem>
                    <Divider />
                    <ListItem className={classes.item}>
                        <Box display="flex" pt={1}>
                            <Box flexGrow={1}>
                                <Box><Typography className={clsx(classes.typoSize, classes.typoWeight)}>Yought</Typography></Box>
                                <Box><Typography color="textSecondary" className={classes.typoSize}>Survey Tools To Get Feedback On Media and Visuals</Typography></Box>
                            </Box>
                            <Avatar variant="square" src={images} />
                        </Box>
                        <Box>
                            <Button variant="text" className={clsx(classes.btnSize, classes.btnHover)} startIcon={<AddIcon style={{fontSize: '12px'}}/>}><span className={classes.spanHover}>follow (321)</span></Button>
                        </Box>
                    </ListItem>
                    <ListItem className={classes.item}>
                        <Box>
                            <Button fullWidth className={clsx(classes.btnSize, classes.orange, classes.viewall)} variant="outlined">view all</Button>
                        </Box>
                    </ListItem>
                </List>
            </Paper>
        </Box>
    )
}


export default UpcomingProduct