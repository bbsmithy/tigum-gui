export const createTitleInputElement = ({title, bg, onEdit, width, autoFocus}) => {
    const titleInput = document.createElement('input')
    titleInput.value = title
    titleInput.placeholder = "Insert title here"
    titleInput.autofocus = autoFocus
    titleInput.style.margin = "8px 0px 8px 5px"
    titleInput.style.background = bg
    titleInput.style.border = "none"
    titleInput.style.color = "white"
    titleInput.style.fontSize = "17px"
    titleInput.style.fontWeight = "bold"
    titleInput.style.fontFamily = "open sans,helvetica neue,Helvetica,Arial,sans-serif"
    titleInput.style.width = width
    titleInput.addEventListener("change", (evt) => {
        onEdit(evt.target.value)
    })
    return titleInput
}

export const createTitleElement = (title) => {
    const titleElement = document.createElement('h4')
    titleElement.innerText = title
    titleElement.style.margin = "8px 0px 8px 5px" 
    titleElement.style.display = "inline-block"
    return titleElement
}