import React from 'react'

const Modal = ({modalSettings}) => {

    const {opened, pixelsCount} = modalSettings

    return <>
        <div id = "modal_wrapper"
            style = {{
                position: 'fixed', backgroundColor: 'black', color: 'white', top: 0, bottom: 0, left: 0, right: 0,
                justifyContent: 'center', alignItems: 'center', display: opened ? 'flex' : 'none', zIndex: 1000
            }}
        >
        <div id = "modal" 
            style={{ width: 800, height: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
        >
            <h2 id = "modal_text">The process may take some time. Need to draw {pixelsCount} pixels</h2>
            <h3>For example:</h3>
            <p>1200 x 1080 takes 3 sec</p>
            <p>5000 x 5000 may take 90 seconds</p>
        </div>
        </div>
    </>
}

export default Modal