import React from 'react'
import { Dialog, Box, Paper, InputBase, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import SearchIcon from '@material-ui/icons/SearchOutlined'
import CloseIcon from '@material-ui/icons/Close'
import { updateSearchDialog } from '../../store/actions'
import useStyles from './HeaderStyle'
import { firestore } from '../../firebase/firebase.utils'
import ShowSearchResult from './ShowSearchResult'
import { makeStyles } from '@material-ui/core/styles'

const useLStyles = makeStyles({
    paper: {
        marginLeft: "8%", 
        marginRight: '10.5%',
        marginTop: '1%',
        display: "flex", 
        flexDirection: 'column'
    }
})


const DialogSearch = ({open, updateSearchDialog}) => {
    const lClasses = useLStyles()
    let previousValue =  ''
    let [searchResults, setSearchResults] = React.useState([])
    
    const close = () => {
        updateSearchDialog(false)
    }

    const getData = (value) => {
        let results = []
        const docsRef = firestore.collection('projects')
        docsRef.where('keywords', 'array-contains', value).get().then((docs) => {
            docs.forEach((doc) => {
                let project = doc.data()
                project.id = doc.id
                results.push(project)
            })
            setSearchResults(results)
        })
    }
    
    const handleSearch = (ev) => {
        const value = ev.target.value
        
        if(value.length !== 0 && previousValue === ''){
            previousValue = value.charAt(0)
            console.log(previousValue)
            getData(value)    
        }
        else if(value.length !== 0){
            if(value.charAt(0) === previousValue){
                setSearchResults(searchResults.filter((product) => {
                    let obj = product.keywords.find((elt) => elt === value)
                    if(obj){
                        return true
                    }
                    else {
                        return false
                    }
                }))
                setSearchResults(searchResults)
            }
            else {
                getData(value)
            }
        }
    }

    const classes = useStyles()
    return (
        <Dialog PaperProps={{ 
            style: {
                backgroundColor: 'transparent'
            },
        }}fullScreen open={open}>
        
            <Paper className={lClasses.paper}>
                <Box display="flex">
                    <Box className={classes.search} flexGrow={1} style={{marginBottom: '1%', 
                paddingTop: '-2%' }}>
                        <Box className={classes.searchIcon}>
                            <SearchIcon />
                        </Box>
                        <InputBase style={{display: 'block', border: 'none'}} autoFocus={true}
                            placeholder="Discover your next favorite thing..." onChange={handleSearch.bind(this)}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Box>
                    <IconButton style={{paddingBottom: '1%', height: '5px', width: '5px', background: 'none'}}
                        onClick={close} disableRipple>
                        <CloseIcon style={{fontSize: '18px', color: 'grey'}}/>
                    </IconButton>
                </Box>
                <ShowSearchResult close={close} results={searchResults} />
            </Paper>
        </Dialog>
    )
}

const mapStateToProps = (state) => ({
    open: state.searchDialog
})

export default connect(mapStateToProps, {updateSearchDialog})(DialogSearch)