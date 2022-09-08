
class Drawer {

    drawing (stage, back, drawingSettingsRef) {

        let lastPointerPosition = null

        stage.on('mousedown touchstart', function () {
            drawingSettingsRef.current.isPaint = true
            lastPointerPosition = stage.getPointerPosition()
        })

        stage.on('mouseup touchend', function () {
            drawingSettingsRef.current.isPaint = false
        })

        stage.on('mousemove touchmove', function () {
            if (!drawingSettingsRef.current.isPaint) return

            if (drawingSettingsRef.current.mode === 'brush') back.ctx.globalCompositeOperation = 'source-over'

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
}

export default new Drawer()