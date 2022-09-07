import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { getMainRefs, MainContext } from '../App'
import Drawer from '../helpers/Drawer'
import ImageLoader from '../helpers/ImageLoader'

const Settings = () => {
    const {konvaSettings, setKonvaSettings, drawingSettingsRef} = useContext(MainContext)
    const {stage, back} = konvaSettings
    
    const [drawOptions, setDrawOptions] = useState({
        opacity: 0,
        brushWidth: 10
    })

    const download = () => {
        if (!back.canvas) return
        const dataURL = back.canvas.toDataURL()

        ImageLoader.downloadImage(dataURL, 'collision_map.png')
    }

    const init = async (e) => {
        const {Creator} = getMainRefs()

        const front_image = await ImageLoader.uploadImage(e)
        Creator.initStage()
        Creator.setFrontImage(front_image)
        Creator.setBackImage()

        const {stage, back} = Creator.getAll()
        setKonvaSettings(Creator.getAll())

        Drawer.drawing(stage, back, drawingSettingsRef)

        setDrawOptions(prev => ({...prev, opacity: 50}))
    }

    console.log(konvaSettings)

    // Opcity, Brush Width
    const changeHandle = (e) => {
        switch (e.target.name) {
            case 'opacity_range': {
                setDrawOptions(prev => ({...prev, opacity: e.target.value}))
                break
            }
            case 'brush_width': {
                setDrawOptions(prev => ({...prev, brushWidth: e.target.value}))
                break
            }
            default:
                break
        }
    }

    useEffect(() => {
        if (stage) stage.setAttr('opacity', drawOptions.opacity / 100)
        if (back.ctx) back.ctx.lineWidth = drawOptions.brushWidth
    }, [drawOptions])

    return <>
    <div id = "control_buttons" 
        style = {{position: 'fixed', right: 0, top: 20, right: 0, zIndex: 1000,
                display: 'flex', flexDirection: 'column', border: '2px solid red'
        }}
    >
        <label htmlFor="front_map">Upload front map</label>
        <input type="file" onChange={init} id = "front_map" name = "front_map" />

        <label htmlFor='opacity_range'>Opacity:</label>
        <input type="range" min={0} max={100} value={drawOptions.opacity} onChange={changeHandle} step={10}
            name = 'opacity_range' id = 'opacity_range' style = {{maxWidth: 150}}
        />

        <label htmlFor="brush_width">Brush width:</label>
        <input type="range" min={0} max={200} value={drawOptions.brushWidth} onChange={changeHandle} step={10}
            name = 'brush_width' id = 'brush_width' style = {{maxWidth: 150}}
        />

        <button id = 'download_btn' onClick = {download}>Download</button>
    </div>
    </>
    
}

export default Settings