const cropper=document.querySelector('#cropper');
const innerImg=document.querySelector('#inner-img');
const innerImg2=document.querySelector('#inner-img2');
const seDot=document.querySelector('#se-dot');
const innerCropper=document.querySelector('#inner-cropper');


let startPositionX;
let startPositionY;

let endPositionX;
let endPositionY;
let x=0;
let y=0;

let cropperBorderX=200;
let cropperBorderY=160;

let currentCropperWidth=100;

function handleMouseMove(evt){
    endPositionX=evt.clientX;
    endPositionY=evt.clientY;
    x+=(endPositionX-startPositionX);
    y+=(endPositionY-startPositionY);
    if(x<0){
        x=0;
    } else if(x>cropperBorderX){
        x=cropperBorderX;
    }

    if(y<0){
        y=0;
    } else if(y>cropperBorderY){
        y=cropperBorderY;
    }

    cropper.style.transform=`translate(${x}px, ${y}px)`;
    innerImg.style.transform=`translate(${-x}px, ${-y}px)`;
    innerImg2.style.transform=`translate(${-x*(100/currentCropperWidth)}px, ${-y*(100/currentCropperWidth)}px)`;
    startPositionX=endPositionX;
    startPositionY=endPositionY;
}

function handleMouseDown(evt){
    startPositionX=evt.clientX;
    startPositionY=evt.clientY
    document.addEventListener('mousemove', handleMouseMove);
}

function handleMouseUp(evt){
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mousemove', mouseMoveSeDot);
}

function mouseDownSeDot(evt){
    evt.stopPropagation();
    startPositionX=evt.clientX;
    startPositionY=evt.clientY;
    document.addEventListener('mousemove', mouseMoveSeDot);
}

function mouseMoveSeDot(evt){
    endPositionX=evt.clientX;
    currentCropperWidth=(Number)(cropper.style.width.slice(0,-2));

    
    currentCropperWidth+=(endPositionX-startPositionX);
    // width값이 변하는 범위에 제한 필요
    if((x+currentCropperWidth)<=300&&(y+currentCropperWidth*1.4)<=300){
        cropper.style.width=`${currentCropperWidth}px`;
        innerCropper.style.width=`${currentCropperWidth}px`;
        // width값이 변하면 height값은 비례하여 변함. x1.4
        cropper.style.height=`${currentCropperWidth*1.4}px`;
        innerCropper.style.height=`${currentCropperWidth*1.4}px`;
        // 결과이미지 너비값도 변경
        innerImg2.style.width=`${30000/currentCropperWidth}px`;
        innerImg2.style.height=`${30000/currentCropperWidth}px`;
        // 결과이미지 이동값도 변경
        innerImg2.style.transform=`translate(${-x*(100/currentCropperWidth)}px, ${-y*(100/currentCropperWidth)}px)`;
    }
    // cropper 이동값 제한 설정
    cropperBorderX=300-currentCropperWidth;
    cropperBorderY=300-(currentCropperWidth*1.4);
    startPositionX=endPositionX;
}

cropper.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);
seDot.addEventListener('mousedown' ,mouseDownSeDot)



// Mobile의 경우 터치

function handleTouchMove(evt){
    endPositionX=evt.touches[0].clientX;
    endPositionY=evt.touches[0].clientY;
    x+=(endPositionX-startPositionX);
    y+=(endPositionY-startPositionY);
    if(x<0){
        x=0;
    } else if(x>200){
        x=200;
    }

    if(y<0){
        y=0;
    } else if(y>160){
        y=160;
    }
    cropper.style.transform=`translate(${x}px, ${y}px)`;
    innerImg.style.transform=`translate(${-x}px, ${-y}px)`;
    innerImg2.style.transform=`translate(${-x}px, ${-y}px)`;
    startPositionX=endPositionX;
    startPositionY=endPositionY;
}

function handleTouchStart(evt){
    startPositionX=evt.touches[0].clientX;
    startPositionY=evt.touches[0].clientY;
    document.addEventListener('touchmove', handleTouchMove);
}

function handleTouchEnd(evt){
    document.removeEventListener('touchmove', handleTouchMove);
}


cropper.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleTouchEnd);