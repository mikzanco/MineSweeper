const grid = document.getElementById("grid");
let lockGame = false;
// put testMode true to see the mine
const testMode = false;
generateGrid();

// Generare una griglia 10 *10
function generateGrid(){
    lockGame = false;
    grid.innerHTML = "";
    for (var i = 0; i < 10; i++){
        row = grid.insertRow(i);
        for(var j = 0; j < 10; j++){
            cell = row.insertCell(j);
            cell.onclick = function (){Infinity(this);};
            var mine = document.createAttribute("mine");
            mine.value = false;
            cell.setAttributeNode(mine);
        }
    }
    generateMine();
}

// generate mine randomly
function generateMine(){
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


function revealMine(){
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            var cell = grid.rows[i].cells[j];
            if(cell.getAttribute("mine") == "true"){
                cell.className = "mine";
            }
        }
    }
}

function checkGameComplete(){
    var gameComplete = true;
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            if((grid.rows[i].cells[j].getAttribute("mine") == "false") && (grid.rows[i].cells[j].innerHTML = "")){
                gameComplete = false;
            }
        }
    }
    if(gameComplete)
}