let span=document.querySelector('span');

function handleMouseMove(evt){
    let x=evt.clientX;
    let y=evt.clientY;
    span.style.transform=`translate(${x-50}px, ${y-50}px)`;
}

function handleMouseDown(evt){
    document.addEventListener('mousemove', handleMouseMove);
}

function handleMouseUp(evt){
    document.removeEventListener('mousemove', handleMouseMove);
}

span.addEventListener('mousedown', handleMouseDown);
span.addEventListener('mouseup', handleMouseUp);