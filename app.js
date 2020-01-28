const canvas = document.getElementById('__canvas');
const colors = document.getElementsByClassName('__color');
const range = document.getElementById('__range');
const mode = document.getElementById('__mode');
const saveButton = document.getElementById('__save');

const ctx = canvas.getContext("2d");

const INIT_COLOR = '#2c2c2c';
const INIT_BACKGROUND_COLOR = 'white';
const INIT_CANVASE_SIZE = 700;

ctx.fillStyle = INIT_BACKGROUND_COLOR;
ctx.fillRect(0, 0, INIT_CANVASE_SIZE, INIT_CANVASE_SIZE);


let isPainting = false;
let isFilling = false;


canvas.width = INIT_CANVASE_SIZE;
canvas.height = INIT_CANVASE_SIZE;

ctx.strokeStyle = INIT_COLOR;
ctx.lineWidth = 2.5;

if (mode) {
    mode.addEventListener('click', modeClickHandler);    
}
function modeClickHandler(event) {
    
    if (isFilling === true) {
        isFilling = false;
        mode.innerText = 'Fill';
    } else {
        isFilling = true;
        mode.innerText = 'Paint';
    }
}
Array.from(colors).forEach(color => color.addEventListener('click',changeColor));


if (range) {
    range.addEventListener('input', rangeChageHandle);
}

if (saveButton) {
    saveButton.addEventListener('click', clickSaveBtnHandler);
}

function clickSaveBtnHandler(event) {
    const img = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = img;
    link.download = "Mini_IMAGE";
    link.click();
}

function rangeChageHandle(event) {
    const value = event.target.value;
    ctx.lineWidth = value;
}


function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function startPainting() {
    isPainting = true;
}

function stopPainting() {
    isPainting = false;
}

function onMouseMove (event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!isPainting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        console.log('creact Line in ', x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function clickCanvasHandler(event) {
    if (isFilling) {
        ctx.fillRect(0, 0, INIT_CANVASE_SIZE, INIT_CANVASE_SIZE);
    }
}

function clickMenuHandler (evnet) {
    event.preventDefault();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', clickCanvasHandler);
    canvas.addEventListener('contextmenu', clickMenuHandler);
}