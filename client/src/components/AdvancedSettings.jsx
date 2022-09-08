import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { MainContext } from '../App'
import CollisionGenerator from '../helpers/CollisionGenerator'
import ImageLoader from '../helpers/ImageLoader'

const AdvancedSettings = () => {

    const {konvaSettings} = useContext(MainContext)
    const {back, stage, front} = konvaSettings

    const [showAdv, setShowAdv] = useState(false)

    useEffect(() => konvaSettings.stage ? setShowAdv(true) : setShowAdv(false), [konvaSettings])

    const changeBack = async (e) => {
        const image = await ImageLoader.uploadImage(e)

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
            style = {{position: 'fixed', right: 0, bottom: 20, zIndex: 1000, 
                flexDirection: 'column', border: '2px solid red', display: showAdv ? 'flex' : 'none'
            }}

        >
            <p>Advanced: </p>
            <label htmlFor="back_map">Upload collision map</label>
            <input type="file" onChange = {changeBack} id = "back_map" name = "back_map" />

            <button onClick = {generate}>Auto generate</button>
        </div>
    </>
}

export default AdvancedSettings