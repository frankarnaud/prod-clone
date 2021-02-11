import React from 'react'
import { Box, FormControlLabel, Checkbox, Typography } from '@material-ui/core'


const CustomCheckbox = ({classStyle, messageTitle, messageBody, checked, handleChange, index}) => {
    const handleCheckboxChange = ev => {
        handleChange(ev.target.checked, index)
    }
    
    return (
        <Box pt={2}>
            <Typography className={classStyle[0]}>{messageTitle}</Typography>
            <Box>
                <FormControlLabel control={
                    <Checkbox checked={checked} onChange={handleCheckboxChange.bind(this)} id='checked'/>
                    } label={<span className={classStyle[1]}>{messageBody}</span>}/>
            </Box>
        </Box>
    )
}

export default CustomCheckbox