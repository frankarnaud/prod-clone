import React from 'react'
import { Box, Typography, List, Divider, Paper } from '@material-ui/core'
import ProjectSummary from './ProjectSummary'
import PropTypes from 'prop-types'
import EXpandMoreIcon from '@material-ui/icons/ExpandMore'
import { fromDateToString, getMessage } from '../../../utils/appUtils'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { getDataByDate } from '../../../store/asycActions'
import { addProjectListInstance } from '../../../store/actions'
import { PAGE_LENGTH } from '../../../utils/appUtils'


const useStyles = makeStyles({
    typo: {
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    typoTitle: {
        fontSize: '21px',
        fontWeight: 'bold',
        marginBottom: '2.5%',
        marginTop: '4%'
    },
    paper: {
        boxShadow: 'none',
        zIndex: 1,
    }
})

const defaultProps = {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    height: '40px'
}

export default function ProjectList({date, connected, prodNumber}){
    const dispatch = useDispatch()
    const classes = useStyles()
    let localDate = new Date()
    let day;


    const projectsData = useSelector(state => {
        return state.projects.filter(project => project.date === fromDateToString(date))
    })

    const infos = useSelector(state => state.projectListInstance[prodNumber])

    const handleClick = () => {
        const index = infos.pageIndex
        const len = projectsData.slice(index).length
        let newIndex = 0
        if(len > PAGE_LENGTH) {
            newIndex = index + PAGE_LENGTH
        }
       else {
           newIndex = index + len 
       }

       dispatch(addProjectListInstance({prodNumber, pageIndex: newIndex, isData: infos.isData}))
    }

    const loadData = (localDate) => {
        if(!infos) {
          dispatch(addProjectListInstance({prodNumber, pageIndex: 0, isData: false}))
          dispatch(getDataByDate(localDate, prodNumber))
        }
    }

    React.useEffect(() => {
        loadData(fromDateToString(date))
    },[date, infos])

    day = getMessage(connected, date, localDate)

    return (
       <React.Fragment>
           {infos && infos.isData && infos.pageIndex !== 0?(
                <Box mt={0} pt={0}>
                <Typography variant="h5" className={classes.typoTitle}>{day}</Typography>
                <Paper className={classes.paper}>
                    <List component="nav"> 
                        {projectsData.slice(0, infos.pageIndex).map((project, index) => (
                            <React.Fragment key={index}>
                                <ProjectSummary project={project}/>
                                {index+1 !== projectsData.length? <Divider />:null}
                            </React.Fragment>
                        )) }
                    </List>
                    {infos.pageIndex !== projectsData.length ?<><Box {...defaultProps} style={{cursor: 'pointer'}} onClick={handleClick}>
                        <EXpandMoreIcon style={{fontSize: '20px', color:'#bbbbbb'}} /><Typography className={classes.typo} style={{fontSize: '11px',
                    textTransform: 'uppercase' }} color="textPrimary">Show {projectsData.length - infos.pageIndex} more</Typography>
                    </Box>
                    <Divider /></>: null}
                </Paper>
            </Box>
           ): null}
       </React.Fragment>
    )
}

ProjectList.propTypes = {
    connected: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    prodNumber: PropTypes.number.isRequired
}

