const grid = document.getElementById("grid");
let lockGame = false;
// Set test mode to true if you want see mines location
const testMode = true;
generateGrid();

// Generare una griglia 10 *10
function generateGrid(){
    lockGame = false;
    grid.innerHTML = "";
    for (var i = 0; i < 10; i++){
        row = grid.insertRow(i);
        for(var j = 0; j < 10; j++){
            cell = row.insertCell(j);
            cell.onclick = function (){ init(this); };
            var mine = document.createAttribute("mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
        }
    }
    generateMines();
}

// generate mine randomly
function generateMines(){
    // create 20 mine to game
    for(var i = 0; i < 20; i++){
        var row = Math.floor(Math.random() * 10);
        var col = Math.floor(Math.random() * 10);
        var cell = grid.rows[row].cells[col];
        cell.setAttribute("mine", "true");
        if(testMode){
            cell.innerHTML = "X";
        }
    }
}


function revealMines() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var cell = grid.rows[i].cells[j];
            if (cell.getAttribute("mine") == "true") {
                cell.className = "mine";
            }
        }
    }
}

function checkGameComplete(){
    var gameComplete = true;
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            if((grid.rows[i].cells[j].getAttribute("mine") == "false") && (grid.rows[i].cells[j].innerHTML == "")){
                gameComplete = false;
            }
        }
    }
    if(gameComplete){
        alert("You Found All Mines!");
        revealMines();
    }
}

function init(cell) {
    // check game complete or no
    if(lockGame) {
        return;
    }else{
        // check user click on mine
        if(cell.getAttribute("mine") == "true"){
            revealMines();
            lockGame = true;
        }else{
            cell.className = "active";
            // display number of mine around the cell
            var mineCount = 0;
            var cellRow = cell.parentNode.rowIndex;
            var cellCol = cell.cellIndex;
            for(var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++){
                for(var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++){
                    if(grid.rows[i].cells[j].getAttribute("mine") == "true"){
                        mineCount++;
                    }
                }
            }
            cell.innerHTML = mineCount;
            if(mineCount == 0){
                // if cell don't have mine
                for(var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++){
                    for(var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++){
                        if(grid.rows[i].cells[j].innerHTML == ""){
                            init(grid.rows[i].cells[j]);
                        }
                    }
                }
            }
            checkGameComplete();
        }
    }
}