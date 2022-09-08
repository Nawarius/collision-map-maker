import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { getMainRefs, MainContext } from '../App'
import Drawer from '../helpers/Drawer'
import ImageLoader from '../helpers/ImageLoader'
import { Button, Collapse, Grid, IconButton, Paper, Slider, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import OpacityIcon from '@mui/icons-material/Opacity'
import LineWeightIcon from '@mui/icons-material/LineWeight'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ImageIcon from '@mui/icons-material/Image'
import { FileUploader } from "react-drag-drop-files"
import ColorLensIcon from '@mui/icons-material/ColorLens'
import MouseCircle from '../helpers/MouseCircle'
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined'
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'
import ButtonGroup from '@mui/material/ButtonGroup'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import AdvancedSettings from './AdvancedSettings'

const Settings = () => {
    const {konvaSettings, setKonvaSettings} = useContext(MainContext)
    const {stage, back} = konvaSettings
    
    const [appInit, setAppInit] = useState(false)
    useEffect(() => { if (appInit) MouseCircle.init() }, [appInit])

    const [drawOptions, setDrawOptions] = useState({
        opacity: 0.5,
        brushWidth: 32,
        brushColor: 'black'
    })

    const [drawMode, setDrawMode] = useState('brush')

    const [advOpen, setAdvOpen] = useState(false)

    const download = () => {
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

        Drawer.drawing(stage, back)

        setDrawOptions(prev => ({...prev, opacity: 0.5}))

        setAppInit(true)
    }

    const clear = () => back.ctx.clearRect(0, 0, stage.width(), stage.height())

    // Opacity, Brush Width, Brush Color
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
            case 'draw_mode': {
                setDrawMode(newVal)
                break
            }
            default:
                break
        }
    }

    // Options change when react state was changed
    useEffect(() => {
        if (appInit) {
            stage.setAttr('opacity', drawOptions.opacity)
            
            back.ctx.lineWidth = drawOptions.brushWidth
            back.ctx.strokeStyle = drawOptions.brushColor
            back.ctx.fillStyle = drawOptions.brushColor

            MouseCircle.changeParams(drawOptions.brushWidth)
        }
    }, [drawOptions])

    useEffect(() => {
        if (appInit) drawMode === 'brush' ? Drawer.drawing(stage, back) : Drawer.drawRect(stage, back)
    }, [drawMode])

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
                        <Tooltip title = 'Brush Color'>
                            <ColorLensIcon />
                        </Tooltip>
                    </Grid>
                    <Grid item xs>
                        <Typography>Color: </Typography>
                    </Grid>
                </Grid>
                
                <ToggleButtonGroup color="primary" value = {drawOptions.brushColor} exclusive onChange = {changeHandle} fullWidth>
                    <ToggleButton value = 'black' name = 'brush_color'>Black</ToggleButton>
                    <ToggleButton value = 'white' name = 'brush_color'>White</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Box sx = {{p: 1, width: 250}}>
                <Grid container spacing={1}>
                    <Grid item>
                        <Tooltip title = {drawMode === 'brush' ? 'Brush' : 'Rectangle'}>
                            {drawMode === 'brush' ? <BrushOutlinedIcon /> : <RectangleOutlinedIcon />}
                        </Tooltip>
                    </Grid>
                    <Grid item xs>
                    <Typography>Draw mode: </Typography>
                    </Grid>
                </Grid>
                
                <ToggleButtonGroup color="primary" value = {drawMode} exclusive onChange = {changeHandle} fullWidth>
                        <ToggleButton value = 'brush' name = 'draw_mode'>Brush</ToggleButton>
                        <ToggleButton value = 'rect' name = 'draw_mode'>Rect</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Box display = 'flex' justifyContent = 'center'><Typography>Controls</Typography></Box>

            <ButtonGroup variant="outlined" fullWidth>
                <Tooltip title = 'Clear canvas'>
                    <Button onClick = {clear}>Clear</Button>
                </Tooltip>
                <Tooltip title = 'Download Collision Map'>
                    <Button onClick = {download}>Download</Button>
                </Tooltip>
            </ButtonGroup>

            <Grid container spacing={1} justifyContent = 'center' alignItems='center'>
                <Grid item>
                    <IconButton color="primary" onClick={() => setAdvOpen(prev => !prev)}>
                        {advOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <Typography>Advanced options</Typography>
                </Grid>
            </Grid>

            <Collapse in = {advOpen}>
                <AdvancedSettings />
            </Collapse>
            
        </Paper>
    </div>}
    </>
    
}

export default Settings