const cropper=document.querySelector('#cropper');
const croppedImg=document.querySelector('#inner-img');
const resultImg=document.querySelector('#inner-img2');
const seDot=document.querySelector('#se-dot');
//cropper 크기를 키우는 경우 내부 div도 따라서 커져야함
const cropperInnerDiv=document.querySelector('#inner-cropper');


let startPositionX;
let startPositionY;

let endPositionX;
let endPositionY;

// 원본 이미지가 움직이는 x, y 값
let oriX=0;
let oriY=0;
// 결과 이미지가 움직이는 x, y 값
let resultX=0;
let resultY=0;


// cropper 이동제한 초기값
let cropMoveLimitX=200;
let cropMoveLimitY=160;
// cropper 초기 너비
let currentCropperWidth=100;

function handleMouseMove(evt){
    endPositionX=evt.clientX;
    endPositionY=evt.clientY;
    oriX+=(endPositionX-startPositionX);
    oriY+=(endPositionY-startPositionY);
    if(oriX<0){
        oriX=0;
    } else if(oriX>cropMoveLimitX){
        oriX=cropMoveLimitX;
    }

    if(oriY<0){
        oriY=0;
    } else if(oriY>cropMoveLimitY){
        oriY=cropMoveLimitY;
    }

    resultX=oriX*(100/currentCropperWidth);
    resultY=oriY*(100/currentCropperWidth);

    cropper.style.transform=`translate(${oriX}px, ${oriY}px)`;
    croppedImg.style.transform=`translate(${-oriX}px, ${-oriY}px)`;
    resultImg.style.transform=`translate(${-resultX}px, ${-resultY}px)`;
    startPositionX=endPositionX;
    startPositionY=endPositionY;
}

function handleMouseDown(evt){
    startPositionX=evt.clientX;
    startPositionY=evt.clientY;
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
    if((oriX+currentCropperWidth)>=300){
       currentCropperWidth=300-oriX; 
    }
    if(oriY+currentCropperWidth*1.4>=300){
        currentCropperWidth=(300-oriY)/1.4;
    }

    cropper.style.width=`${currentCropperWidth}px`;
    cropperInnerDiv.style.width=`${currentCropperWidth}px`;
    // width값이 변하면 height값은 비례하여 변함. x1.4
    cropper.style.height=`${currentCropperWidth*1.4}px`;
    cropperInnerDiv.style.height=`${currentCropperWidth*1.4}px`;
    // 결과이미지 너비값도 변경
    resultImg.style.width=`${30000/currentCropperWidth}px`;
    resultImg.style.height=`${30000/currentCropperWidth}px`;
    // 결과이미지 이동값도 변경
    resultX=oriX*(100/currentCropperWidth);
    resultY=oriY*(100/currentCropperWidth);
    resultImg.style.transform=`translate(${-resultX}px, ${-resultY}px)`;

    // cropper 이동값 제한 설정
    cropMoveLimitX=300-currentCropperWidth;
    cropMoveLimitY=300-(currentCropperWidth*1.4);
    startPositionX=endPositionX;
}

cropper.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);
seDot.addEventListener('mousedown' ,mouseDownSeDot)



// Mobile의 경우 터치
/*
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
    croppedImg.style.transform=`translate(${-x}px, ${-y}px)`;
    resultImg.style.transform=`translate(${-x}px, ${-y}px)`;
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
document.addEventListener('touchend', handleTouchEnd); */