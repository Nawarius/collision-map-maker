
class ImageLoader {

    uploadImage (file) {
        return new Promise(res => {
            const reader = new FileReader()
        
            reader.onload = () => {
                const image = new Image()
                image.onload = () => res(image)
                image.src = reader.result
            }
            reader.readAsDataURL(file)
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
