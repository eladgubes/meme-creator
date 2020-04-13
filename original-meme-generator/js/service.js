'use strict'


// Model

var gImg = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['trump', 'speech'] },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['puppis', 'tow'] },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['baby', 'success', 'sleep'] },
    { id: 4, url: 'meme-imgs/4.jpg', keywords: ['cat', 'keyboard'] },
    { id: 5, url: 'meme-imgs/5.jpg', keywords: ['boy', 'success'] },
    { id: 6, url: 'meme-imgs/6.jpg', keywords: ['boy', 'success'] },
    { id: 7, url: 'meme-imgs/7.jpg', keywords: ['baby', 'eyes'] },
    { id: 8, url: 'meme-imgs/8.jpg', keywords: ['listen', 'suit'] },
    { id: 9, url: 'meme-imgs/9.jpg', keywords: ['boy', 'laugh'] },
    { id: 10, url: 'meme-imgs/10.jpg', keywords: ['laugh', 'obama'] },
    { id: 11, url: 'meme-imgs/11.jpg', keywords: ['boxers', 'fight'] },
    { id: 12, url: 'meme-imgs/12.jpg', keywords: ['boy', 'success'] },
    { id: 13, url: 'meme-imgs/13.jpg', keywords: ['boy', 'success'] },
    { id: 14, url: 'meme-imgs/14.jpg', keywords: ['boy', 'success'] },
    { id: 15, url: 'meme-imgs/15.jpg', keywords: ['boy', 'success'] },
    { id: 16, url: 'meme-imgs/16.jpg', keywords: ['boy', 'success'] },
    { id: 17, url: 'meme-imgs/17.jpg', keywords: ['boy', 'success'] },
    { id: 18, url: 'meme-imgs/18.jpg', keywords: ['boy', 'success'] },


]

var gStickers = [
    { id: 1, url: 'stickers/sticker_1.png' },
    { id: 2, url: 'stickers/sticker_2.png' },
    { id: 3, url: 'stickers/sticker_3.png' },
    { id: 4, url: 'stickers/sticker_4.png' },
    { id: 5, url: 'stickers/sticker_5.png' },
    { id: 6, url: 'stickers/sticker_6.png' },
    { id: 7, url: 'stickers/sticker_7.png' },
    { id: 8, url: 'stickers/sticker_8.png' },
    { id: 9, url: 'stickers/sticker_9.png' },
    { id: 10, url: 'stickers/sticker_10.png' },
    { id: 11, url: 'stickers/sticker_11.png' },
    { id: 12, url: 'stickers/sticker_12.png' },
    { id: 13, url: 'stickers/sticker_13.png' },
    { id: 14, url: 'stickers/sticker_14.png' },
    { id: 15, url: 'stickers/sticker_15.png' },
    { id: 16, url: 'stickers/sticker_16.png' },
    { id: 17, url: 'stickers/sticker_17.png' },
    { id: 19, url: 'stickers/sticker_19.png' },
    { id: 20, url: 'stickers/sticker_20.png' }
]

var gKeywords = { 'boy': 1, 'success': 4, 'laugh': 0, 'obama': 2 }

var gMeme = {
    selectedImgId: 5,
    selectedImgUrl: '',
    selectedLineIdx: 0,
    lines: [
        { txt: '', size: 30, align: 'center', stroke: 'black', font: 'impact', color: 'white', x: 150, y: 50 }
    ],
    selectedStickerIdx: 0,
    stickers: [
        {}
    ]
}

var gDisplaySticker = 0;


// Gallery

function getMemesImgs() {
    return gImg
}

// Meme generator

function _getImgForCanvas(id) {
    return gImg.find(img => {
        return (img.id === id)
    })
}

function updateMemeId(id) {
    gMeme.selectedImgId = id
    gMeme.selectedImgUrl = _getImgForCanvas(id).url
}

function getMemeForDisplay() {
    return gMeme
}

function updateMemeText(txt) {
    if (gMeme.selectedLineIdx < 0) addLine()
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += (diff < 0) ? -1 : 1
}

function moveText(diff) {
    gMeme.lines[gMeme.selectedLineIdx].y += (diff < 0) ? 1 : -1
}

function changeAlign(direction) {
    gMeme.lines[gMeme.selectedLineIdx].align = direction
}

function changeTextColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = color
}

function ChangeLine() {
    gMeme.selectedLineIdx += 1
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function changeFont(textFont) {
    gMeme.lines[gMeme.selectedLineIdx].font = textFont
}

function DeleteLine() {
    console.log(gMeme);

    if (!gMeme.lines.length) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    console.log(gMeme);
}

function addLine() {
    var line;
    if (gMeme.selectedLineIdx < 0) line = createNewLine()
    else if (gMeme.lines.length === 1) line = createExistsLine(250)
    else line = createExistsLine(150)

    gMeme.selectedLineIdx++
    gMeme.lines.push(line)
}

function createExistsLine(yCord) {

    var line = {
        txt: '',
        size: gMeme.lines[gMeme.selectedLineIdx].size,
        align: gMeme.lines[gMeme.selectedLineIdx].align,
        stroke: gMeme.lines[gMeme.selectedLineIdx].stroke,
        font: gMeme.lines[gMeme.selectedLineIdx].font,
        color: gMeme.lines[gMeme.selectedLineIdx].color,
        x: gMeme.imgWidth/2,
        y: yCord
    }
    return line
}

function createNewLine() {

    var line = {
        txt: '',
        size: 30,
        align: 'center',
        stroke: 'black',
        font: 'Impact',
        color: 'white',
        x: gMeme.imgWidth/2,
        y: 50
    }
    return line
}


function getKeywords() {
    var keywordsMap = []
    for (var key in gKeywords) {
        keywordsMap[gKeywords[key]] = key
    }
    return keywordsMap
}

function getFilterMemes(searchWord) {
    var imgToDisplay = gImg.filter(img => {
        for (var i = 0; i < img.keywords.length; i++) {
            if (_checkWord(searchWord, img.keywords[i])) return img
        }
    })
    return imgToDisplay
}

function _checkWord(searchWord, word) {
    for (var i = 0; i < word.length; i++) {
        if (searchWord === word.substring(i, i + searchWord.length)) return true
    }
}

function getCurrMeme() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function updateLineFocus(startX, startY, textWidth, textHeight) {
    gMeme.lines[gMeme.selectedLineIdx].startX = startX
    gMeme.lines[gMeme.selectedLineIdx].startY = startY
    gMeme.lines[gMeme.selectedLineIdx].textWidth = textWidth
    gMeme.lines[gMeme.selectedLineIdx].textHeight = textHeight


}

function getLineByPress(pressX, pressY) {

    for (var i = 0; i < gMeme.lines.length; i++) {
        var line = gMeme.lines[i]
        if (pressX >= line.startX && pressX <= line.startX + line.textWidth &&
            pressY >= line.startY && pressY <= line.startY + line.textHeight) {
            gMeme.selectedLineIdx = i
            return true
        }
    }
}

function setCords(x, y) {
    gMeme.lines[gMeme.selectedLineIdx].x = x
    gMeme.lines[gMeme.selectedLineIdx].y = y
}

function getStickersToDisplay() {
    var stickersToDisplay = []
    for (var i = gDisplaySticker; i < gDisplaySticker + 4; i++) {
        stickersToDisplay.push(gStickers[i])
    }
    return stickersToDisplay
}

function createSticker(stickerId) {

    var findSticker = gStickers.find(sticker => {
        if (sticker.id === stickerId) return sticker.url
    })
    var sticker = {}

    sticker.url = findSticker.url
    sticker.size = 40
    sticker.x = gMeme.imgWidth/2
    sticker.y = gMeme.imgHeight/2

    gMeme.stickers.push(sticker)
    gMeme.selectedStickerIdx++
}

function StickerChangeDisplay(diff) {
    gDisplaySticker += diff
    if (gDisplaySticker < 0) gDisplaySticker = 0
    if (gDisplaySticker >= gStickers.length-4) gDisplaySticker = gStickers.length-4
}

function setCanvasSize(imgWidth,imgHeight){
    gMeme.imgWidth = imgWidth
    gMeme.imgHeight = imgHeight
  
}