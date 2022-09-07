import Konva from 'konva'

class StageCreator {

    constructor () { 
        this.stage = null
        this.layer = null
        this.front = null
        this.back = {canvas: null, ctx: null }
    }

    initStage () {
        this.stage = new Konva.Stage({ container: 'container' })
        this.layer = new Konva.Layer()
        this.stage.add(this.layer)    
    }

    setFrontImage (image) {
        this.front = new Konva.Image({ image })
        this.layer.add(this.front)
        this.stage.setAttrs({width: image.width, height: image.height})
    }

    setBackImage () {
        this.back.canvas = document.createElement('canvas')
        this.back.canvas.width = this.stage.width()
        this.back.canvas.height = this.stage.height()
        this.back.canvas.style.position = 'absolute'
        this.back.canvas.style.top = '0px'
        this.back.canvas.style.zIndex = -1
        document.getElementById('container').appendChild(this.back.canvas)

        this.back.ctx = this.back.canvas.getContext("2d")
        this.back.ctx.fillStyle = "white"
        this.back.ctx.fillRect(0, 0, this.back.canvas.width, this.back.canvas.height)
        this.back.ctx.strokeStyle = '#000000'
        this.back.ctx.lineJoin = 'round'
        this.back.ctx.lineWidth = 10
    }

    getAll () {
        const {stage, layer, front, back} = this
        return {stage, layer, front, back}
    }
}

export default StageCreator