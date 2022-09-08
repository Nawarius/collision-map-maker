import { height } from "@mui/system"

class Drawer {

    clearActions (stage) {
        stage.off('mousedown touchstart')
        stage.off('mouseup touchend')
        stage.off('mousemove touchmove')
        stage.off('click tap')
    }

    removeTempCanvas () {
        const temp_canvas = document.getElementById('temp_canvas')
        if (temp_canvas) temp_canvas.remove()
    }

    drawing (stage, back) {

        this.clearActions(stage)
        this.removeTempCanvas()
        
        back.ctx.lineJoin = 'round'

        let isPaint = false
        let lastPointerPosition = null

        stage.on('mousedown touchstart', function () {
            isPaint = true
            lastPointerPosition = stage.getPointerPosition()
        })

        stage.on('mouseup touchend', function () {
            isPaint = false
        })

        stage.on('mousemove touchmove', function () {
            if (!isPaint) return

            back.ctx.globalCompositeOperation = 'source-over'

            back.ctx.beginPath()

            let localPos = { x: lastPointerPosition.x - stage.x(), y: lastPointerPosition.y - stage.y() }
            back.ctx.moveTo(localPos.x, localPos.y)

            let pos = stage.getPointerPosition()
            localPos = { x: pos.x - stage.x(), y: pos.y - stage.y() }

            back.ctx.lineTo(localPos.x, localPos.y)
            back.ctx.closePath()
            back.ctx.stroke()

            lastPointerPosition = pos
        })
    }

    drawRect (stage, back) {
        this.clearActions(stage)
        this.removeTempCanvas()
        
        const temp_canvas = document.createElement('canvas')
        temp_canvas.id = 'temp_canvas'
        temp_canvas.width = stage.width()
        temp_canvas.height = stage.height()
        temp_canvas.style.position = 'absolute'
        temp_canvas.style.top = '0px'
        temp_canvas.style.zIndex = -1
        document.getElementById('container').appendChild(temp_canvas)

        const temp_ctx = temp_canvas.getContext('2d')
        temp_ctx.fillStyle = '#000000'

        let startX, startY, mouseX, mouseY, prevStartX, prevStartY, prevWidth, prevHeight
        let isDown = false

        stage.on('mousedown touchstart', (e) => {
            startX = stage.getPointerPosition().x
            startY = stage.getPointerPosition().y

            isDown = true
        })

        stage.on('mousemove touchmove', () => {
            if (!isDown) return

            mouseX = stage.getPointerPosition().x
            mouseY = stage.getPointerPosition().y

            const width = mouseX - startX
            const height = mouseY - startY

            temp_ctx.clearRect(0, 0, stage.width(), stage.height())
            temp_ctx.fillRect(startX, startY, width, height)

            prevStartX = startX
            prevStartY = startY

            prevWidth  = width
            prevHeight = height
        })

        stage.on('mouseup touchend', () => {
            isDown = false
            
            temp_ctx.clearRect(0, 0, stage.width(), stage.height())
            back.ctx.fillRect(prevStartX, prevStartY, prevWidth, prevHeight)

            prevStartX = 0; prevStartY = 0; prevWidth = 0; prevHeight = 0
        })
    }
}

export default new Drawer()