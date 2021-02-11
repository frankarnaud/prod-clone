import React from 'react';
import { Dialog, Box, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import PropTypes from 'prop-types'
import {updateDialog} from '../../store/actions'
import LoginWith from './LoginWith';


const classes = makeStyles({
    paper: {
        '&:hover': {
            color: "#d44b11"
        }
    }
})


function Login({open, updateDialog}){

    const close = () => {
        updateDialog(false)
    }

    return (
        <Dialog open={open} onClose={close}  PaperProps={{
            style: {
              backgroundColor: 'transparent',
              position: 'relative',
              paddingTop: "70px",
              paddingLeft: "60px"
            },
          }} fullScreen onClick={close} >
            <Box>
                <Paper style={{width: '40px', height: '40px', display:'flex', 
                justifyContent: 'center', alignItems: 'center', borderRadius: '50%',
                cursor: 'pointer'  }} onClick={close} className={classes.paper}>
                    <CloseIcon />
                </Paper>
            </Box>
            <Box display="flex" alignItems="enter" justifyContent="center">
                <LoginWith />
            </Box>
        </Dialog>
    )
}

Login.propTypes = {
    open: PropTypes.bool.isRequired,
    updateDialog: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        open: state.openDialog
    }
}

export default connect(mapStateToProps, {updateDialog})(Login)