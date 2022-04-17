const boardSize = 8;

function createChessBoard(){
    const table1 = document.createElement('table')
    document.body.appendChild(table1);

    for(let i = 0 ; i < boardSize ; i++){
        const row = table1.insertRow();

        for(let j = 0 ; j < boardSize; j++){
            const cell = row.insertCell();
            //function to declare each cell's id 1-8 a-h
            function nextChar(c) {
                return String.fromCharCode(c.charCodeAt(0) + j);
            }
            
            let idshow = cell.id = (8-i)+ nextChar('a');
            //
            const wtf= document.getElementById(idshow).innerText=idshow;
           
           

           
        
            if((i+j)%2==0){
                cell.className="light-cell"
            }else{
                cell.className="dark-cell"
                
            }
        }
    }
}

window.addEventListener("load", createChessBoard)

