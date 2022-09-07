import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { MainContext } from '../App'
import ImageLoader from '../helpers/ImageLoader'
import WorkerBuilder from '../worker-builder'
import Worker from '../Worker'

const instance = new WorkerBuilder(Worker)

const AdvancedSettings = () => {

    const {konvaSettings, displayModal} = useContext(MainContext)
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

    const generate = async () => {
        //displayModal(true, stage.width() * stage.height())

        instance.onmessage = (canvas) => {
            console.log(canvas)
            //if (message) console.log("Message from worker", message.data)
            displayModal()
        }

        let obj = JSON.stringify(front.toCanvas().outerHTML)
        //parent.postMessage(obj, 'whatever')
        //console.dir(front.toCanvas().outerHTML)
        const div = document.createElement('div')
        div.innerHTML = front.toCanvas().outerHTML
        // div.style.position = 'absolute'
        // div.style.zIndex = 2000
        // div.style.top = '0px'
        // div.style.width = '100%'
        // div.style.height = '100%'
        // document.body.appendChild(div)
        //console.log(canvas)
        instance.postMessage([front.toCanvas().outerHTML, front.toCanvas().outerHTML])

        //const worker = new Worker("../Worker.js")

        //worker.postMessage([first.value, second.value])
        //const res_canvas = worker.hello(front.toCanvas(), front.toCanvas())
        //console.log(res_canvas)
        //back.ctx.drawImage(res_canvas, 0, 0)

        //displayModal()
        //setTimeout(() => generateCollisionMap(), 0)
    }

    async function generateCollisionMap () {
            
        stage.setAttr('opacity', 1)
        
        const canvas = front.toCanvas()
        const ctx = canvas.getContext('2d')
        const sec_canvas = front.toCanvas()
        const sec_ctx = sec_canvas.getContext('2d')

        //stage.setAttr('opacity', opacity_range.value / 100)

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#000000'

        function drawPixel(x, y) {
            const data = sec_ctx.getImageData(x, y, 1, 1).data
            if (!data[0] && !data[1] && !data[2]) ctx.fillRect(x, y, 1, 1);
        }

        var t1 = new Date()

        function process_draw () {
            return new Promise(res => {
                for (let x = 0; x < canvas.width; x++) for (let y = 0; y < canvas.height; y++) drawPixel(x, y)
                res()
            })
        }

        await process_draw()

        var t2 = new Date()
        var dt = t2 - t1

        console.log('elapsed time = ' + dt / 1000 + ' s')

        back.ctx.drawImage(canvas, 0, 0)
        
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