
class ImageLoader {

    uploadImage (e) {
        return new Promise((res, rej) => {
            const input = e.target
            if (!input.files.length) rej('No file')
        
            const reader = new FileReader()
        
            reader.onload = () => {
                const image = new Image()
                image.onload = () => res(image)
                image.src = reader.result
            }
            reader.readAsDataURL(input.files[0])
        })
    }

    downloadImage(uri, name) {
        const link = document.createElement('a')
        link.download = name
        link.href = uri
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        link.remove()
    }
}

export default new ImageLoader()
