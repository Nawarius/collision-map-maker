
const mouseCircle = document.getElementById('mouse-circle')

class MouseCircle {
    init () {
        let mousePosX = 0, mousePosY = 0

        document.onmousemove = (e) => {
            mousePosX = e.pageX
            mousePosY = e.pageY
        }

        let delay = 1, revisedMousePosX = 0, revisedMousePosY = 0;

        function delayMouseFollow() {
            requestAnimationFrame(delayMouseFollow)

            revisedMousePosX += (mousePosX - revisedMousePosX) / delay
            revisedMousePosY += (mousePosY - revisedMousePosY) / delay;

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