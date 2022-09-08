import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { getMainRefs, MainContext } from '../App'
import Drawer from '../helpers/Drawer'
import ImageLoader from '../helpers/ImageLoader'
import { Button, Grid, IconButton, Paper, Slider, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import OpacityIcon from '@mui/icons-material/Opacity'
import LineWeightIcon from '@mui/icons-material/LineWeight'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ImageIcon from '@mui/icons-material/Image'
import { FileUploader } from "react-drag-drop-files"
import ColorLensIcon from '@mui/icons-material/ColorLens'

const Settings = () => {
    const {konvaSettings, setKonvaSettings, drawingSettingsRef} = useContext(MainContext)
    const {stage, back} = konvaSettings
    
    const [appInit, setAppInit] = useState(false)

    const [drawOptions, setDrawOptions] = useState({
        opacity: 0,
        brushWidth: 10,
        brushColor: 'black'
    })

    const download = () => {
        if (!back.canvas) return
        const dataURL = back.canvas.toDataURL()

        ImageLoader.downloadImage(dataURL, 'collision_map.png')
    }

    const init = async (file) => {
        const {Creator} = getMainRefs()

        const front_image = await ImageLoader.uploadImage(file)
        Creator.initStage()
        Creator.setFrontImage(front_image)
        Creator.setBackImage()

        const {stage, back} = Creator.getAll()
        setKonvaSettings(Creator.getAll())

        Drawer.drawing(stage, back, drawingSettingsRef)

        setDrawOptions(prev => ({...prev, opacity: 0.5}))

        setAppInit(true)
    }

    //console.log(konvaSettings)

    // Opcity, Brush Width, Brush Color
    const changeHandle = (e, newVal) => {
        switch (e.target.name) {
            case 'opacity': {
                setDrawOptions(prev => ({...prev, opacity: newVal}))
                break
            }
            case 'brush_width': {
                setDrawOptions(prev => ({...prev, brushWidth: newVal}))
                break
            }
            case 'brush_color': {
                setDrawOptions(prev => ({...prev, brushColor: newVal}))
                break
            }
            default:
                break
        }
    }

    useEffect(() => {
        if (stage) stage.setAttr('opacity', drawOptions.opacity)
        if (back.ctx) back.ctx.lineWidth = drawOptions.brushWidth
        if (back.ctx) back.ctx.strokeStyle = drawOptions.brushColor
    }, [drawOptions])

    const drag_zone = <div style = {{ 
            border: 'dashed 2px #0658c2', borderRadius: 5, width: '100%', height: '100%', cursor: 'pointer',
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
        }}>
        <Typography>Upload or Drag front image</Typography>
        <IconButton color="primary" component="label">
            <ImageIcon style = {{fontSize: 100}}/> 
        </IconButton>
    </div>
    
    return <>
    {/* Upload file */}
    {!appInit && <div style = {{
            position: 'fixed', top: 0, bottom: 0, right: 0, left: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
        <FileUploader handleChange = {init} name="file" multiple = {false} classes = "drop_zone" children = {drag_zone} />
    </div>}
    
    {/* Menu Settings */}
    {appInit && <div 
        style = {{
            position: 'fixed', top: 10, right: 10, zIndex: 1000,
            display: 'flex', flexDirection: 'column', border: '2px solid black',
            width: 265
        }}
    >
        <Paper>
            <Box display = 'flex' justifyContent = 'center'><Typography>Image options</Typography></Box>

            <Box sx = {{p: 1, width: 250}}>
                <Typography>Opacity: </Typography>
                <Grid container spacing={1}>
                    <Grid item>
                        <Tooltip title = 'Image Opacity'>
                            <OpacityIcon />
                        </Tooltip>
                    </Grid>
                    <Grid item xs>
                        <Slider name = 'opacity' valueLabelDisplay="auto" step={0.1} min={0} max={1} marks
                            value = {drawOptions.opacity} onChange = {changeHandle} 
                        />
                    </Grid>
                </Grid>
            </Box>
            
            <Box display = 'flex' justifyContent = 'center'><Typography>Brush options</Typography></Box>

            <Box sx = {{p: 1, width: 250}}>
                <Typography>Weight: </Typography>
                <Grid container spacing={1}>
                    <Grid item>
                        <Tooltip title = 'Brush Weight'>
                            <LineWeightIcon />
                        </Tooltip>
                    </Grid>
                    <Grid item xs>
                        <Slider name = 'brush_width' valueLabelDisplay="auto" step={10} min={0} max={200} marks
                            value = {drawOptions.brushWidth} onChange = {changeHandle} 
                        />
                    </Grid>
                </Grid>
            </Box>
            
            <Box sx = {{p: 1, width: 250}}>
                <Grid container spacing={1}>
                    <Grid item>
                        <Tooltip title = 'Brust Color'>
                            <ColorLensIcon />
                        </Tooltip>
                    </Grid>
                    <Grid item xs>
                        <Typography >Color: </Typography>
                    </Grid>
                </Grid>
                
                <ToggleButtonGroup color="primary" value = {drawOptions.brushColor} exclusive onChange = {changeHandle} fullWidth>
                    <ToggleButton value = 'black' name = 'brush_color'>Black</ToggleButton>
                    <ToggleButton value = 'white' name = 'brush_color'>White</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Tooltip title = 'Download Collision Map'>
                <Button onClick = {download} fullWidth>Download</Button>
            </Tooltip>
            
        </Paper>
    </div>}
    </>
    
}

export default Settings