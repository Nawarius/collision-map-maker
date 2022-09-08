import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../App'
import CollisionGenerator from '../helpers/CollisionGenerator'
import ImageLoader from '../helpers/ImageLoader'
import { FileUploader } from "react-drag-drop-files"
import { Box, Button, Typography } from '@mui/material'

const AdvancedSettings = () => {

    const {konvaSettings} = useContext(MainContext)
    const {back, stage, front} = konvaSettings

    const changeBack = async (file) => {
        const image = await ImageLoader.uploadImage(file)

        if (image.width !== back.canvas.width || image.height !== back.canvas.height) {
            alert('Wrong collision map size')
            return
        }

        back.ctx.drawImage(image, 0, 0)
    } 

    const generate = () => {
        const opacity = stage.getAttr('opacity')
        stage.setAttr('opacity', 1)

        CollisionGenerator.generateCollisionMap(front.toCanvas(), back)

        stage.setAttr('opacity', opacity)
    }

    return <>
        <Box sx = {{p: 1,  width: 250}}>
            <Typography style = {{marginBottom: 5}}>Load an existing collision map</Typography>
            <FileUploader handleChange = {changeBack} name="file" multiple = {false} 
                label = 'Upload collision map' classes = 'drop_zone2' 
            />

            <Typography style = {{marginBottom: 5, marginTop: 5}}>Auto generation of collision map</Typography>
            <Button onClick = {generate} fullWidth>Generate map</Button>
        </Box>
    </>
}

export default AdvancedSettings