import React from 'react'
import { Paper, Card, CardMedia, CardActions, CardContent, Typography, Button, Box, Avatar, Divider } from '@material-ui/core'
import CodeIcon from '@material-ui/icons/Code'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import TWitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import { makeStyles } from '@material-ui/core/styles'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { imagesStore } from '../../../storage'

const useStyles = makeStyles({
    root: {
        width: '100%',
        boxShadow: 'none'
    },
    media: {
        width: 750,
        height: 375
    },
    tw: {
        borderColor: "#1DA1F2",
        color: "#1DA1F2",
        boxShadow: 'none',
        fontSize: '12px',
        '&:hover': {
            background: "#1DA1F2",
            color: 'white'
        }
    },
    fb: {
        borderColor: "#4267B2",
        color: "#4267B2",
        boxShadow: 'none',
        fontSize: '12px',
        '&:hover': {
            backgroundColor: '#4267B2',
            color: 'white'
        },
    },
    embed: {
        fontSize: '12px'
    },
    avatar: {
        cursor: 'pointer',
        width: '55px',
        height: '55px',
        border: '1px solid #eeeeee',
        marginRight: '5px'
    }
})

const ProjectDetails = ({ details }) => {
    const [currentIndexImage, setCurrentIndexImage] = React.useState(0)
    const classes = useStyles()
    const [imagesTabs, setImagesTabs] = React.useState([])

    const handleClick = (index) => {
        setCurrentIndexImage(index)
    }

    React.useEffect(() => {
        if (navigator.onLine) {
            for (const image of details.imagesTabs) {
                imagesStore.getItem(image).then((imageValue) => {
                    if (!imageValue) {
                        fetch(image).then((response) => {
                            return response.blob()
                        }).then((blod) => {
                            let localImageUrl = URL.createObjectURL(blod)
                            setImagesTabs([...imagesTabs, localImageUrl])
                            imagesStore.setItem(image, blod).then(() => console.log('image are stored'))
                        })
                    }
                    else {
                        setImagesTabs([...imagesTabs, URL.createObjectURL(imageValue)])
                    }
                })
            }
        }
        else {
            if (!details.offline) {
                for(let image of details.imagesTabs) {
                    imagesStore.getItem(image).then((imageBlod) => {
                        if (imageBlod) {
                            console.log('imageBlod', imageBlod)
                            setImagesTabs([...imagesTabs, URL.createObjectURL(imageBlod)])
                        }
                    })
                }
            }
        }

    },[])

    console.log('imagesTabs length', imagesTabs.length)

    return (
        <Paper style={{ boxShadow: 'none' }}>
            <Card className={classes.root}>
                <Box display="flex" flexDirection="column" p={2}>
                    <Box mb={1} display="flex" justifyContent="center"><CardMedia component="img" image={details.offline ? details.imagesTabs[currentIndexImage].fileBlod : imagesTabs[currentIndexImage]} alt={details.name} className={classes.media} /></Box>
                    <Box display="flex" justifyContent="flex-start" mb={3}>{details.imagesTabs.map((_, index) => (
                        <Avatar src={details.offline ? details.imagesTabs[index].fileBlod : imagesTabs[index]} variant="square" key={index}
                            onClick={handleClick.bind(this, index)} className={classes.avatar} />
                    ))}
                    </Box>
                    <Divider />
                </Box>

                <CardContent>
                    <Typography color="textPrimary" style={{ fontSize: '12px' }}>{details.description}</Typography>
                </CardContent>
                <CardActions>
                    <TwitterShareButton url="producthunt.com">
                        <Box>
                            <Button variant="outlined" className={classes.tw} startIcon={<TWitterIcon />}>TWEET</Button>
                        </Box>
                    </TwitterShareButton>
                    <FacebookShareButton url="producthunt.com">
                        <Box>
                            <Button variant="outlined" className={classes.fb} startIcon={<FacebookIcon />}>SHARE</Button>
                        </Box>
                    </FacebookShareButton>
                    <Box>
                        <Button variant="outlined" className={classes.embed} startIcon={<CodeIcon />}>EMBED</Button>
                    </Box>
                    <Box>
                        <Button variant="outlined"><PlaylistAddIcon /></Button>
                    </Box>
                </CardActions>
            </Card>
        </Paper>
    )
}

export default ProjectDetails