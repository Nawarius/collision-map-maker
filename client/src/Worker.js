// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    // eslint-disable-next-line no-restricted-globals
    self.onmessage = (message) => {
        const canvas_str = message.data[0], sec_canvas_str = message.data[1]
        const div1 = document.createElement('div')
        div1.innerHTML = canvas_str
        const div2 = document.createElement('div')
        div2.innerHTML = sec_canvas_str

        console.log(div1.innerHTML)

        // const ctx = canvas.getContext('2d')
        // const sec_ctx = sec_canvas.getContext('2d')
    
        // ctx.fillStyle = "white"
        // ctx.fillRect(0, 0, canvas.width, canvas.height)
        // ctx.fillStyle = '#000000'
    
        // function drawPixel(x, y) {
        //     const data = sec_ctx.getImageData(x, y, 1, 1).data
        //     if (!data[0] && !data[1] && !data[2]) ctx.fillRect(x, y, 1, 1);
        // }
    
        // var t1 = new Date()
    
        // for (let x = 0; x < canvas.width; x++) for (let y = 0; y < canvas.height; y++) drawPixel(x, y)
    
        // var t2 = new Date()
        // var dt = t2 - t1
    
        // console.log('elapsed time = ' + dt / 1000 + ' s')

        postMessage('canvas')
    }
};
export async function hello (canvas, sec_canvas) {

   
    
}