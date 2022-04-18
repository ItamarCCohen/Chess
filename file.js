const boardSize = 8;
const WHITE_TYPE = 'white';
const DARK_TYPE = 'dark';

//addressing the image file individually
function addImage(cell, type, name) {
    const image = document.createElement('img');
    image.src = 'images/' + type + '/' + name + '.png';
    cell.appendChild(image);
}
// places pieces according to their right chess placement
function addImageByIndex(cell, type, index) {
    if (index === 0 || index === 7) {
        addImage(cell, type, 'rook');
    } else if (index === 1 || index === 6) {
        addImage(cell, type, 'knight');
    } else if (index === 2 || index === 5) {
        addImage(cell, type, 'bishop');
    } else if (index === 3) {
        addImage(cell, type, 'king');
    } else if (index === 4) {
        addImage(cell, type, 'queen');
    }
}

//function that creates the Chess Board 

function createChessBoard() {
    const table1 = document.createElement('table')
    document.body.appendChild(table1);
    let selectedCell = null;

    for (let i = 0; i < boardSize; i++) {
        const row = table1.insertRow();

        for (let j = 0; j < boardSize; j++) {
            const cell = row.insertCell();

            //function to declare each cell's id 1-8 a-h
            function nextChar(c) {
                return String.fromCharCode(c.charCodeAt(0) + j);
            }

            let idshow = cell.id = (8 - i) + nextChar('a');

            //var that shows the id of a cell inside it as text
            const idInnerText = document.getElementById(idshow).innerText = idshow;

            //coloring each cell -light/dark
            if ((i + j) % 2 == 0) {
                cell.className = "light-cell"
            } else {
                cell.className = "dark-cell"

            }
            if (i === 0) {
                addImageByIndex(cell, WHITE_TYPE, j);
            } else if (i === 1) {
                addImage(cell, WHITE_TYPE, 'pawn');
            } else if (i === 6) {
                addImage(cell, DARK_TYPE, 'pawn');
            } else if (i === 7) {
                addImageByIndex(cell, DARK_TYPE, j);
            }

            // function on click that changes background to yellow
            cell.addEventListener("click", () => {
                if (selectedCell) selectedCell.classList.remove("selected");
                selectedCell = cell;
                cell.classList.add("selected");
            });
        }
    }
}




//DOM and load - Chess Board
window.addEventListener("load", createChessBoard);