import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { MainContext } from '../App'
import CollisionGenerator from '../helpers/CollisionGenerator'
import ImageLoader from '../helpers/ImageLoader'
import { FileUploader } from "react-drag-drop-files"
import { Box, Button, Paper, Typography } from '@mui/material'

const AdvancedSettings = () => {

    const {konvaSettings} = useContext(MainContext)
    const {back, stage, front} = konvaSettings

    const [showAdv, setShowAdv] = useState(false)

    useEffect(() => konvaSettings.stage ? setShowAdv(true) : setShowAdv(false), [konvaSettings])

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
        <div id = 'advanced_controls'
            style = {{position: 'fixed', right: 10, bottom: 10, zIndex: 1000, 
                width: 265,
                flexDirection: 'column', border: '2px solid black', display: showAdv ? 'flex' : 'none'
            }}

        >
            <Paper>
                <Box display = 'flex' justifyContent = 'center'><Typography>Advanced</Typography></Box>
                <FileUploader handleChange = {changeBack} name="file" multiple = {false} 
                    label = 'Upload collision map' classes = 'drop_zone2' 
                />

                <Button onClick = {generate} fullWidth>Auto Generate</Button>
            </Paper>
        </div>
    </>
}

export default AdvancedSettings