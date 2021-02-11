import { fade, makeStyles } from '@material-ui/core/styles'  


const useStyles = makeStyles((theme) => ({
    appBar:{
        background: "white",
        color: 'grey',
        boxShadow: "none",
        borderBottom: "2px solid #eeeeee",
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.2),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.3),
        },
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
          paddingTop: '7px',
        },
        marginTop: '4px',
      },
      searchIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        marginTop: "5px",
        color: "#cccccc"
      },
      inputRoot: {
        color: '#202020',
        fontSize: "12px",
        border: "1px solid #eeeeef",
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      },
      linkStyles,
      avatar: {
        background: "#d44b11",
        marginRight: "2px",
        textAlign: "center",
        marginTop: '5px',
        paddingLeft: "2px",
      },
      container: {
        paddingLeft: "6%",
        paddingRight: "4%",
        paddingTop: 12
      },
      typo:{
        fontWeight: 500
      }
}))

const linkStyles = {
  '& :hover':{
    color: '#505050'
  }

}

export default useStyles
      