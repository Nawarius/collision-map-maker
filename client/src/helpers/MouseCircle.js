
const mouseCircle = document.getElementById('mouse-circle')

class MouseCircle {
    init () {
        let mousePosX = 0, mousePosY = 0

        document.onwheel = () => mouseCircle.style.display = 'none'
        document.onmouseleave = () => mouseCircle.style.display = 'none'

        document.onmousemove = (e) => {
            mousePosX = e.pageX
            mousePosY = e.pageY

            if (mouseCircle.style.display === 'none' || !mouseCircle.style.display) mouseCircle.style.display = 'block'
        }

        let delay = 1, revisedMousePosX = 0, revisedMousePosY = 0;

        function delayMouseFollow() {
            requestAnimationFrame(delayMouseFollow)

            revisedMousePosX += (mousePosX - revisedMousePosX) / delay
            revisedMousePosY += (mousePosY - revisedMousePosY) / delay

            mouseCircle.style.top = revisedMousePosY + 'px'
            mouseCircle.style.left = revisedMousePosX + 'px'
        }

        delayMouseFollow()
    }
    
    changeParams (val) {
        mouseCircle.style.width = `${val}px`
        mouseCircle.style.height = `${val}px`
        mouseCircle.style.margin = `-${val / 2}px 0 0 -${val / 2}px`
    }
}

export default new MouseCircle()