import React from 'react';
import {AppBar, Toolbar, Box, Link, Container, Typography, Avatar} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import Search from './Search'
import useStyles from './HeaderStyle'
import ToogleMenu from './ToogleMenu'


const defaultProps = {
    m: 1,
    display: {xs: 'none', md: 'block'}
}

export default function Header(){

    const classes = useStyles()
    const routes = ['Deals', 'Jobs', 'Makers', 'Radio', 'Ship']
    return (
        <Box>
            <AppBar className={classes.appBar} position="static">   
                <Toolbar>
                    <Container className={classes.container}>
                        <Box display="flex">
                            <Avatar className={classes.avatar}>
                                <Typography variant="h4"  className={classes.typo}>
                                    <Link to="/" underline="none" color="inherit" component={RouterLink}>P</Link>
                                </Typography>
                            </Avatar>
                            <Search />
                            <Box display="flex" pt={1} mx={2} flexGrow={1}>
                                {routes.map((value, index)=>(
                                    <Box {...defaultProps} key={index}>
                                        <Typography className={classes.linkStyles}>
                                            <Link underline="none" color="textSecondary" to={`/${value}`} 
                                             component={RouterLink}>{value}</Link>
                                        </Typography>
                                    </Box>
                                ))}
                                 <Box {...defaultProps} display={{xs: 'block'}}>
                                        <Typography className={classes.linkStyles}>
                                            <Link underline="none" color="textSecondary" to="/other" 
                                             component={RouterLink}>...</Link>
                                        </Typography>
                                    </Box>
                            </Box>
                            <ToogleMenu />
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    )
}