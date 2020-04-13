'use strict'

var gCanvas;
var gCtx;
var gDrag = false

function onInit() {
    renderSearchKeywords()
    renderGallery()
}



// Header

function onOpenGallery() {
    document.querySelector('.meme-gallery').classList.remove('hidden')
    document.querySelector('.meme-generator').classList.add('hidden')
    document.querySelector('.meme-generator').classList.remove('flex')
}


function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}



// Gallery

// Gallery - Html "on" functions

function onKeywordSearch(keyword) {
    document.querySelector('.search').value = keyword
    onSearch()
}

function onSearch() {
    var searchWord = document.querySelector('.search').value
    var imgForDisplay = getFilterMemes(searchWord)
    renderGallery(imgForDisplay);
}

// Gallery - render

function renderSearchKeywords() {
    var strHtml = ''
    var keywords = getKeywords()
    var keysCounter = 0

    for (var i = keywords.length; i > 0 || keysCounter === keywords.length - 15; i--) {
        if (!keywords[i]) continue
        strHtml += `<h2 onclick="onKeywordSearch('${keywords[i]}')" style="font-size:${i * 5}px">${keywords[i]}</h2>`
        keysCounter++
    }
    document.querySelector('.keywords').innerHTML = strHtml
}


function renderGallery(memsForDisplay = getMemesImgs()) {
    var strImgHtml = '';
    memsForDisplay.forEach(img => {
        strImgHtml += `<image onclick="onStartMeme(${img.id})" src="${img.url}">`
    })
    document.querySelector('.gallery').innerHTML = strImgHtml
}

// Meme generator

// Meme generator - render

function renderMeme() {
    var displayMeme = getMemeForDisplay()
    drawImg(displayMeme)
}

// Meme generator - Html "on" functions

function onStartMeme(id) {

    gCanvas = document.querySelector('.canvas')
    gCtx = gCanvas.getContext('2d')

    updateMemeId(id)
    document.querySelector('.meme-gallery').classList.add('hidden')
    document.querySelector('.meme-generator').classList.remove('hidden')
    document.querySelector('.meme-generator').classList.add('flex')

    resizeCanvas()
    renderMeme()
    renderStickers()
}


function onInput() {
    var memeText = document.querySelector('.text').value
    updateMemeText(memeText)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onChangeLine() {
    ChangeLine()
    renderMeme()
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}

function onMoveText(diff) {
    moveText(diff)
    renderMeme()
}

function onChangeAlign(direction) {
    changeAlign(direction)
    renderMeme()
}

function onChangeFont(textFont) {
    changeFont(textFont)
    renderMeme()
}

function onChangeTextColor() {
    var color = document.querySelector('.text-color').value
    changeTextColor(color)
    renderMeme()
}


function onChangeStrokeColor() {
    var color = document.querySelector('.stroke-color').value
    changeStrokeColor(color)
    renderMeme()
}

function onDeleteLine() {
    DeleteLine()
    ChangeLine(1)
    renderMeme()
}


// Meme generator - Resize canvas

function resizeCanvas() {
    var elContainer = document.querySelector('.my-canvas');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetWidth
    setCanvasSize(gCanvas.width,gCanvas.height)
}

// Meme generator - Draw canvas


function drawImg(displayMeme) {
    var img = new Image()
    img.src = displayMeme.selectedImgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        displayMeme.lines.forEach(line => drawText(line))   
        displayMeme.stickers.forEach(sticker => drawSticker(sticker)) 
    }
}


function drawText(currMeme) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = currMeme.stroke
    gCtx.fillStyle = currMeme.color
    gCtx.font = currMeme.size + 'px ' + currMeme.font
    gCtx.textAlign = currMeme.align
    gCtx.fillText(currMeme.txt, currMeme.x, currMeme.y)
    gCtx.strokeText(currMeme.txt, currMeme.x, currMeme.y)
    setFocus()
}

function drawSticker(sticker) {
    if (!sticker) return
    var img = new Image()
    img.src = sticker.url
    img.onload = () => {
        gCtx.drawImage(img, sticker.x, sticker.y, sticker.size, sticker.size)
    }

}

function setFocus() {

    var currMeme = getCurrMeme()
    var textSize = gCtx.measureText(currMeme.txt)
    gCtx.beginPath();
    gCtx.rect(currMeme.x - textSize.width, currMeme.y - currMeme.size, textSize.width * 2, currMeme.size + 8);
    updateLineFocus(currMeme.x - textSize.width, currMeme.y - currMeme.size, textSize.width * 2, currMeme.size + 8)
    gCtx.closePath()
    gCtx.strokeStyle = 'white'
    gCtx.stroke();

    var elTextInput = document.querySelector('.text')
    elTextInput.value = currMeme.txt
    elTextInput.focus()


}


function onElementPress(ev) {
    ev.preventDefault
    if (ev.type === 'mousedown' && getLineByPress(ev.offsetX, ev.offsetY)) gDrag = true
    if (ev.type === 'mouseup') gDrag = false
}

function onDrag(ev) {
    if (!gDrag) return
    setCords(ev.offsetX, ev.offsetY)
    renderMeme()
}

function onCanvasClicked(ev) {
    var pressX = ev.offsetX
    var pressY = ev.offsetY
    getLineByPress(pressX, pressY)
    renderMeme()
}


function renderStickers() {
    var strHtml = ''
    var stickers = getStickersToDisplay()
    stickers.forEach(sticker => {
        strHtml += `<image onclick="onAddSticker(${sticker.id})" src="${sticker.url}">`
        document.querySelector('.stickers').innerHTML = strHtml
    })
}

function onAddSticker(stickerId) {
    createSticker(stickerId)
    renderMeme()
}

function onStickerChangeDisplay(diff) {
    StickerChangeDisplay(diff)
    renderStickers()
}

// SHARE FUNCTIONS

function onOpenShareMenu(){
    document.querySelector('.share').classList.toggle('hidden')
}

function onDownload(el) {
    downloadImg(el)   
}

function onSaveMeme() {
    console.log('save image');
}

function onFacebookShare() {
    console.log('facebook share');
}

function onWhatsAppShare() {
    console.log('WhatsApp Share');
}

function onUploadImg(ev){
    onImgInput(ev)
}
