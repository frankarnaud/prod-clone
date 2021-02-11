import React from 'react'
import { Box, Link, List, ListItem, Avatar, Typography, Paper, Button } from '@material-ui/core'
import useStyles from './leftContentStyle'
import clsx from 'clsx'
import horloge from '../../../images/horloge.png'



const HiringNow = () => {
    const classes = useStyles()

    return (
        <Box>
            <Box py={2}>
                <Typography className={classes.typoTitle}>Hiring now </Typography>
            </Box>
            <Paper className={classes.Paper}>
                <List>
                    <ListItem className={classes.item}>
                        <Box display="flex">
                            <Box flexGrow={1}>
                                <Box><Typography className={clsx(classes.typoSize, classes.typoWeight)}>Instantish</Typography></Box>
                                <Box><Typography className={classes.typoSize} color="textSecondary">Product Designer</Typography></Box>
                                <Box><Typography className={classes.typoSize} color="textSecondary">San Francisco</Typography></Box>
                            </Box>
                            <Avatar variant="square" src={horloge} />
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box display="flex">
                            <Box flexGrow={1}>
                                <Box><Typography className={clsx(classes.typoSize, classes.typoWeight)}>Reaktor</Typography></Box>
                                <Box><Typography className={classes.typoSize} color="textSecondary">Senior Software Engineer</Typography></Box>
                                <Box><Typography className={classes.typoSize} color="textSecondary">New York</Typography></Box>
                            </Box>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box display="flex">
                            <Box flexGrow={1}>
                                <Box><Typography className={clsx(classes.typoSize, classes.typoWeight)}>Wcmt</Typography></Box>
                                <Box><Typography className={classes.typoSize} color="textSecondary">Need writer</Typography></Box>
                                <Box><Typography className={classes.typoSize} color="textSecondary">Delhi</Typography></Box>
                            </Box>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box display="flex">
                            <Box flexGrow={1}>
                                <Box><Typography className={clsx(classes.typoSize, classes.typoWeight)}>Triplebyte</Typography></Box>
                                <Box><Typography className={classes.typoSize} color="textSecondary">Machine Learning Engineer</Typography></Box>
                                <Box><Typography className={classes.typoSize} color="textSecondary">San Francisco or Remote</Typography></Box>
                            </Box>
                        </Box>
                    </ListItem>
                   <ListItem className={classes.item}>
                        <Box>
                            <Button fullWidth variant="outlined" className={clsx(classes.btnSize, classes.orange, classes.viewall)}>view all jobs</Button>
                        </Box>
                   </ListItem>
                    <ListItem className={classes.item}>
                        <Box>
                            <Typography className={classes.typoSize} color="textSecondary">Hiring? <Link to="/jobs/new" className={classes.orange}>Post a job</Link></Typography>
                        </Box>
                    </ListItem>
                </List>
            </Paper>
        </Box>
    )
}


export default HiringNow