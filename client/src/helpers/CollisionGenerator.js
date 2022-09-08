
class CollisionGenerator {

    generateCollisionMap (canvas, back) {
        
        const ctx = canvas.getContext('2d')

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const pixels = imageData.data

        const t1 = new Date()

        for (let i = 0; i < pixels.length; i += 1) {
            if (pixels[4 * i] || pixels[4 * i + 1] || pixels[4 * i + 2]) {
                pixels[4 * i] = 255
                pixels[4 * i + 1] = 255
                pixels[4 * i + 2] = 255
            }
        }

        const t2 = new Date()

        console.log('elapsed time = ' + (t2 - t1) / 1000 + ' s')

        back.ctx.putImageData(imageData, 0, 0)
        back.ctx.drawImage(back.canvas, 0, 0) 
    }
}

export default new CollisionGenerator()