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
    if(x>=0&&x<=200&&y>=0&&y<=160){
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



// Mobile의 경우 터치

function handleTouchMove(evt){
    movePositionX=evt.touches[0].clientX
    movePositionY=evt.touches[0].clientY
    let x=movePositionX-positionX;
    let y=movePositionY-positionY;
    if(x>=0&&x<=200&&y>=0&&y<=160){
        cropper.style.transform=`translate(${x}px, ${y}px)`;
        innerImg.style.transform=`translate(${-x}px, ${-y}px)`;
    }
}

function handleTouchStart(evt){
    positionX=evt.touches[0].clientX;
    positionY=evt.touches[0].clientY;
    document.addEventListener('touchmove', handleTouchMove);
}

function handleTouchEnd(evt){
    document.removeEventListener('touchmove', handleTouchMove);
}


cropper.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleTouchEnd);