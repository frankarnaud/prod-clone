import React from 'react'
import { Avatar } from '@material-ui/core'



const CustomAvatar = ({imageUrl, avatarType, classStyle}) => {

    if(imageUrl){
        return (
            <Avatar variant="square" src={imageUrl} className={classStyle} />
        )
    }
    else if(avatarType === 'mini') {
        return <Avatar variant="square" className={classStyle} >{''}</Avatar>
    }
    else {
        return null
    }
}


export default CustomAvatar