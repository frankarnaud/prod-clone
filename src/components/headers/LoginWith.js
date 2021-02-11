import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, Box, Button } from '@material-ui/core'
import { connect, useDispatch } from 'react-redux'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'

import google from '../../images/google.png'
import producthunt from '../../images/prodhunt_image.png'

import { makeStyles } from '@material-ui/core/styles'
import { signUpWithGoogle, signUpWithFacebook, signUpWithTwitter } from '../../firebase/firebase.utils'
import {auth} from '../../firebase/firebase.utils'
import { createUser, updateDialog } from '../../store/actions'
import { getUserProjectsInfos } from '../../store/asycActions'


const useStyles = makeStyles({
    card: {
        width: 900,
        display: "flex",
        justifyContent: "center",
        boxShadow: 0,
        flexDirection: "column",
        alignItems: "center",
        marginTop: '60px'
    },
    cardMedia: {
        width: 150,
        height: 130
    },
    content: {
        textAlign: "center"
    },
    tw: {
        background: "#1DA1F2",
        color: "white",
        fontSize: "12px",
        boxShadow: 'none',
        '&:hover': {
            background: "#1DA1F2"  
        }
    },
    fb: {
        background: "#4267B2",
        color: "white",
        fontSize: "12px",
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: '#0069d9',
        }
    },
    go: {
        background: "#ffffff",
        fontSize: "12px",
        '&:hover': {
            backgroundColor: "#eeeeee",
        }
    }
})

function LoginWith({createUser}){

    const classes = useStyles()
    const dispatch = useDispatch()

    const handleLoginWith = (provider, ev) => {
        ev.stopPropagation()
        if(provider === 'go'){
            signUpWithGoogle()
        }
        else if(provider === 'fb'){
            signUpWithFacebook()
        }
        else {
            signUpWithTwitter()
        }
    }

    React.useEffect(()=>{
        auth.onAuthStateChanged((userAuth)=>{
            if(userAuth){
                createUser(userAuth)
                dispatch(updateDialog(false))
                dispatch(getUserProjectsInfos(userAuth.uid))
                localStorage.setItem('user', 'connected')
            }
       })
    }, [])

    return (
        <Card className={classes.card}>
            <CardMedia image={producthunt} title="react logo" className={classes.cardMedia}/>
            <CardContent className={classes.content}>
                <Typography variant="h6" fontWeight={550}>Sign up on Product Hunt</Typography>
                <Typography color="textSecondary">Join our community of friendly folks discovering and sharing the latest<br /> products in tech</Typography>
            </CardContent>
            <CardActions>
                <Box display="flex" justifyContent="space-around">
                    <Box mx={1}> <Button variant="contained" m={1} className={classes.tw} disableElevation
                    onClick={handleLoginWith.bind(this, 'tw')} startIcon={<TwitterIcon />}>LOG IN WITH TWITTER</Button></Box>
                    <Box mx={1}><Button variant="contained" m={1} className={classes.fb} disableElevation
                    onClick={handleLoginWith.bind(this, 'fb')} startIcon={<FacebookIcon />}>LOG IN WITH FACEBOOK</Button></Box>
                    <Box mx={1}>
                        <Button variant="outlined" disableElevation m={1} className={classes.go} onClick={handleLoginWith.bind(this, 'go')}>
                            <img src={google} alt="Google" style={{width: 20, height: 20, display:"inlineblock", marginRight: "5px", padding: "2px"}}/> 
                                LOG IN WITH GOOGLE
                        </Button>
                    </Box>
                </Box>
            </CardActions>
            <Box pt={2} pb={3}><Typography color="textSecondary" variant="caption">We'll never post to any of your accounts whithout your permission.</Typography></Box>
        </Card>
    )
}


export default connect(null, {createUser,updateDialog})(LoginWith)