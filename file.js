
if (typeof window === 'object') {
    // Check if document is finally loaded
    document.addEventListener('DOMContentLoaded', function () {
      alert('Finished loading');
    });
let chessBody = document.getElementById('chessBody')
//first row
for( let i = 1; i<9; i++){

    let square1 = document.createElement('div')
    if(i % 2 == 0 ){
        square1.style.backgroundColor= "black";
    }
    else{
        square1.style.backgroundColor= "white";
        
    }
    chessBody.appendChild(square1)
}
//second row
for( let i = 1; i<9; i++){

    let square2 = document.createElement('div')
    if(i % 2 == 0 ){
        square2.style.backgroundColor= "white";
    }
    else{
        square2.style.backgroundColor= "black";
        
    }
    chessBody.appendChild(square2)
}
//third row
for( let i = 1; i<9; i++){

    let square3 = document.createElement('div')
    if(i % 2 == 0 ){
        square3.style.backgroundColor= "black";
    }
    else{
        square3.style.backgroundColor= "white";
        
    }
    chessBody.appendChild(square3)
}
//forth row
for( let i = 1; i<9; i++){

    let square4 = document.createElement('div')
    if(i % 2 == 0 ){
        square4.style.backgroundColor= "white";
    }
    else{
        square4.style.backgroundColor= "black";
        
    }
    chessBody.appendChild(square4)
}
//fifth row
for( let i = 1; i<9; i++){

    let square5 = document.createElement('div')
    if(i % 2 == 0 ){
        square5.style.backgroundColor= "black";
    }
    else{
        square5.style.backgroundColor= "white";
        
    }
    chessBody.appendChild(square5)
}
//sixth row
for( let i = 1; i<9; i++){

    let square6 = document.createElement('div')
    if(i % 2 == 0 ){
        square6.style.backgroundColor= "white";
    }
    else{
        square6.style.backgroundColor= "black";
        
    }
    chessBody.appendChild(square6)
}
//seventh row
for( let i = 1; i<9; i++){

    let square7 = document.createElement('div')
    if(i % 2 == 0 ){
        square7.style.backgroundColor= "black";
    }
    else{
        square7.style.backgroundColor= "white";
        
    }
    chessBody.appendChild(square7)
}
//eighth row
for( let i = 1; i<9; i++){

    let square8 = document.createElement('div')
    if(i % 2 == 0 ){
        square8.style.backgroundColor= "white";
    }
    else{
        square8.style.backgroundColor= "black";
        
    }
    chessBody.appendChild(square8)
}


} 
