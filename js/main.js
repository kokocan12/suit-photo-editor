const cropper=document.querySelector('#cropper');
const innerImg=document.querySelector('#inner-img');


let positionX;
let positionY;

let movePositionX;
let movePositionY;

function handleMouseMove(evt){
    movePositionX=evt.clientX;
    movePositionY=evt.clientY;
    let x=movePositionX-positionX;
    let y=movePositionY-positionY;
    if(x>=0&&x<=200&&y>=0&&y<=260){
        cropper.style.transform=`translate(${x}px, ${y}px)`;
        innerImg.style.transform=`translate(${-x}px, ${-y}px)`;
    }
}

function handleMouseDown(evt){
    positionX=evt.clientX;
    positionY=evt.clientY
    document.addEventListener('mousemove', handleMouseMove);
}

function handleMouseUp(evt){
    document.removeEventListener('mousemove', handleMouseMove);
}

cropper.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);