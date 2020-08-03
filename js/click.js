function myFunction() {
    document.getElementById("display").innerHTML = "Click done !";
}

function handlePiece(clicked_id) {
    var element = document.getElementById(clicked_id);
    var line = clicked_id[0];
    var column = clicked_id[1];
    if(element.children) {
    	var children = element.children[0];
    	if(children.src) {
    		var src = children.src;
    		if(src.includes("/art/WP.gif") || src.includes("/art/BP.gif")) {
    			if(src.includes("/art/WP.gif")) {
    				if(element.classList.contains("unmoved")) {
    					addRedPion(line, column, 1, true);
		    			addRedPion(line, column, 2, true);
    				} else {
    					addRedPion(line, column, 1, true);
    				}
    			} else {
    				if(element.classList.contains("unmoved")) {
    					addRedPion(line, column, 1, false);
		    			addRedPion(line, column, 2, false);
    				} else {
    					addRedPion(line, column, 1, false);
    				}
    			}
    		} else if (src.includes("/art/WR.gif")) {
    			addRedTour(line, column, true);
    		} else if (src.includes("/art/BR.gif")) {
    			addRedTour(line, column, false);
    		} else if (src.includes("/art/WB.gif")) {
    			addRedFou(line, column, true);
    		} else if (src.includes("/art/BB.gif")) {
    			addRedFou(line, column, false);
    		} else if (src.includes("/art/WN.gif")) {
    			addRedCavalier(line, column, true);
    		} else if (src.includes("/art/BN.gif")) {
				addRedCavalier(line, column, false);
    		} else if (src.includes("/art/WQ.gif")) {
				addRedTour(line, column, true);
				addRedFou(line, column, true);
    		} else if (src.includes("/art/BQ.gif")) {
    			addRedTour(line, column, false);
				addRedFou(line, column, false);
    		} else if (src.includes("/art/WK.gif")) {
    			addRedKing(line, column, true);
    		} else if (src.includes("/art/BK.gif")) {
    			addRedKing(line, column, false);
    		}
    		if(document.getElementsByClassName("red").length !== 0) {
				element.classList.add("moveable");
			}
    	}
    }
}

function removeAllRed() {
	var redList = document.getElementsByClassName("red");
	var length = redList.length;
	for(var i=0; i<length; i++) {
		redList[0].classList.remove("red");
	}
}

function addRedPion(line, column, inc, isWhite) {
	var new_line = 0;
	var newclicked_id = "";
	var new_element = null;
	if(isWhite) {
		new_line = parseInt(line) + inc;
	} else {
		new_line = parseInt(line) - inc;
	}
	newclicked_id = new_line.toString() + column;
	new_element = document.getElementById(newclicked_id);
	if(new_element && new_element.children.length === 0) {
		new_element.classList.add("red");
	}
	if(new_element && inc !== 2) {
		newclicked_id = new_line.toString() + upperLetter(new_element.id[1]);
		var left_element = document.getElementById(newclicked_id);
		if(left_element !== null && left_element.children.length !== 0) {
			if((left_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite) 
				|| (left_element.children[0].src.split("/art/")[1][0] === "B" && isWhite)) {
				left_element.classList.add("red");
			}
		} 
		newclicked_id = new_line.toString() + lowerLetter(new_element.id[1]);
		var right_element = document.getElementById(newclicked_id);
		if(right_element !== null && right_element.children.length !== 0) {
			if((right_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite) 
				|| (right_element.children[0].src.split("/art/")[1][0] === "B" && isWhite)) {
				right_element.classList.add("red");
			}
		}
	}
}

function addRedTour(line, column, isWhite) {
	//First do lines
	checkLines(line, column, true, isWhite);
	checkLines(line, column, false, isWhite);
	
	//Second do columns
	checkColumns(line, column, true, isWhite);
	checkColumns(line, column, false, isWhite);
}

function addRedFou(line, column, isWhite) {
	for(var i=0; i<4; i++) {
		checkDiag(line, column, i, isWhite);
	}
}

function addRedCavalier(line, column, isWhite) {
	var new_line = 0;
	var new_column = "";
	var new_element = null;
	//Left
	if(column !== "a" && column !== "b") {
		new_column = lowerLetter(lowerLetter(column));
		if(line !== "1") {
			new_line = parseInt(line) - 1;
			new_element = document.getElementById(new_line.toString() + new_column);
			if((new_element.children && new_element.children.length === 0)
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
				|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
			{
				new_element.classList.add("red");
			}
		}
		if(line !== "8") {
			new_line = parseInt(line) + 1;
			new_element = document.getElementById(new_line.toString() + new_column);
			if((new_element.children && new_element.children.length === 0)
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
				|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
			{
				new_element.classList.add("red");
			}
		}
	}
	//Right
	if(column !== "g" && column !== "h") {
		new_column = upperLetter(upperLetter(column));
		if(line !== "1") {
			new_line = parseInt(line) - 1;
			new_element = document.getElementById(new_line.toString() + new_column);
			if((new_element.children && new_element.children.length === 0)
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
				|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
			{
				new_element.classList.add("red");
			}
		}
		if(line !== "8") {
			new_line = parseInt(line) + 1;
			new_element = document.getElementById(new_line.toString() + new_column);
			if((new_element.children && new_element.children.length === 0)
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
				|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
			{
				new_element.classList.add("red");
			}
		}
	}
	//Up
	if(line !== "7" && line !== "8") {
		new_line = parseInt(line) + 2;
		if(column !== "a") {
			new_column = lowerLetter(column);
			new_element = document.getElementById(new_line.toString() + new_column);
			if((new_element.children && new_element.children.length === 0)
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
				|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
			{
				new_element.classList.add("red");
			}
		}
		if(column !== "b") {
			new_column = upperLetter(column);
			new_element = document.getElementById(new_line.toString() + new_column);
			if((new_element.children && new_element.children.length === 0)
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
				|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
			{
				new_element.classList.add("red");
			}
		}
	}
	//Down
	if(line !== "1" && line !== "2") {
		new_line = parseInt(line) - 2;
		if(column !== "a") {
			new_column = lowerLetter(column);
			new_element = document.getElementById(new_line.toString() + new_column);
			if((new_element.children && new_element.children.length === 0)
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
				|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
			{
				new_element.classList.add("red");
			}
		}
		if(column !== "b") {
			new_column = upperLetter(column);
			new_element = document.getElementById(new_line.toString() + new_column);
			if((new_element.children && new_element.children.length === 0)
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
				|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
			{
				new_element.classList.add("red");
			}
		}
	}
}

function addRedKing(line, column, isWhite) {
	var new_line = 0;
	var new_column = "";
	var new_element = null;
	if(line !== "8") {
		new_line = parseInt(line) + 1;
		new_element = document.getElementById(new_line.toString() + column);
		if((new_element.children && new_element.children.length === 0)
			|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
			|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
		{
			new_element.classList.add("red");
		}
		if(column !== "a") {
			new_column = lowerLetter(column);
			new_element = document.getElementById(new_line.toString() + new_column);
			if((new_element.children && new_element.children.length === 0)
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
				|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
			{
				new_element.classList.add("red");
			}
		}
		if(column !== "h") {
			new_column = upperLetter(column);
			new_element = document.getElementById(new_line.toString() + new_column);
			if((new_element.children && new_element.children.length === 0)
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
				|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
			{
				new_element.classList.add("red");
			}
		}
	}
	if(line !== "1") {
		new_line = parseInt(line) - 1;
		new_element = document.getElementById(new_line.toString() + column);
		if((new_element.children && new_element.children.length === 0)
			|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
			|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
		{
			new_element.classList.add("red");
		}
		if(column !== "a") {
			new_column = lowerLetter(column);
			new_element = document.getElementById(new_line.toString() + new_column);
			if((new_element.children && new_element.children.length === 0)
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
				|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
			{
				new_element.classList.add("red");
			}
		}
		if(column !== "h") {
			new_column = upperLetter(column);
			new_element = document.getElementById(new_line.toString() + new_column);
			if((new_element.children && new_element.children.length === 0)
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
				|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
			{
				new_element.classList.add("red");
			}
		}
	}
	if(column !== "a") {
		new_column = lowerLetter(column);
		new_element = document.getElementById(line + new_column);
		if((new_element.children && new_element.children.length === 0)
			|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
			|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
		{
			new_element.classList.add("red");
		}
	}
	if(column !== "h") {
		new_column = upperLetter(column);
		new_element = document.getElementById(line + new_column);
		if((new_element.children && new_element.children.length === 0)
			|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)
			|| (new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite))
		{
			new_element.classList.add("red");
		}
	}
}

function removeElementOrNot(element_to_move, element_to_remove) {
	if((element_to_move.children[0].src.split("/art/")[1][0] === "W" && element_to_remove.children[0].src.split("/art/")[1][0] === "B")
				|| (element_to_move.children[0].src.split("/art/")[1][0] === "B" && element_to_remove.children[0].src.split("/art/")[1][0] === "W")) {
		var child = element_to_remove.children[0];
		element_to_remove.removeChild(child);
		if(element_to_remove.classList.contains("blackTeam")) {
			element_to_remove.classList.remove("blackTeam")
		} else {
			element_to_remove.classList.remove("whiteTeam")
		}
	}
}

function handle(clicked_id) {
	var element = document.getElementById(clicked_id);
	if(element.classList.contains("red")) {
		var elements_find = document.getElementsByClassName("moveable");
		if(elements_find.length !== 0) {
			var element_to_move = elements_find[0];
			if(element.children.length !== 0) {
				removeElementOrNot(element_to_move, element);
			}
			var children_to_move = element_to_move.children[0];
			//Check if pion transform into queen
			if(children_to_move.src.includes("/art/WP.gif") && parseInt(element.id[0]) === 8) {
				children_to_move.src = children_to_move.src.replace("WP", "WQ");
			}
			if(children_to_move.src.includes("/art/BP.gif") && parseInt(element.id[0]) === 1) {
				children_to_move.src = children_to_move.src.replace("BP", "BQ");
			}
			element.appendChild(children_to_move);
			handleClass(element, element_to_move);
			swapTurn(children_to_move.src.split("/art/")[1][0]);
			removeAllRed();
			
		}
	} else if(element.classList.contains("moveable")) {
		removeAllRed();
		element.classList.remove("moveable");
	} else if(element.children.length !== 0 && document.getElementsByClassName("red").length === 0 && element.classList.contains("isTurn")) {
		handlePiece(clicked_id);
	}
}

function checkLines(line, column, isAscending, isWhite) {
	var new_line = 0;
	if(isAscending) {
		new_line = parseInt(line) + 1;
	} else {
		new_line = parseInt(line) - 1;
	}
	var newclicked_id = new_line.toString() + column;
	var new_element = document.getElementById(newclicked_id);
	if(new_element) {
		if(new_element.children.length === 0) {
			new_element.classList.add("red");
			checkLines(new_line, column, isAscending, isWhite);
		} else {
			if((new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite) 
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)) {
				new_element.classList.add("red");
			}
		}
	}
}

function checkColumns(line, column, isAscending, isWhite) {
	var new_column = "";
	if(isAscending) {
		new_column = upperLetter(column);
	} else {
		new_column = lowerLetter(column);
	}
	var newclicked_id = line + new_column;
	var new_element = document.getElementById(newclicked_id);
	if(new_element) {
		if(new_element.children.length === 0) {
			new_element.classList.add("red");
			checkColumns(line, new_column, isAscending, isWhite);
		} else {
			if((new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite) 
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)) {
				new_element.classList.add("red");
			}
		}
	}
}

function checkDiag(line, column, number, isWhite) {
	var new_line = 0;
	var new_column = "";
	if(number === 0 || number === 1) {
		new_line = parseInt(line) + 1;
	} else {
		new_line = line - 1;
	}
	if(number === 1 || number === 2) {
		new_column = upperLetter(column);
	} else {
		new_column = lowerLetter(column);
	}
	var newclicked_id = new_line.toString() + new_column;
	var new_element = document.getElementById(newclicked_id);
	if(new_element) {
		if(new_element.children.length === 0) {
			new_element.classList.add("red");
			checkDiag(new_line, new_column, number, isWhite);
		} else {
			if((new_element.children[0].src.split("/art/")[1][0] === "B" && isWhite) 
				|| (new_element.children[0].src.split("/art/")[1][0] === "W" && !isWhite)) {
				new_element.classList.add("red");
			}
		}
	}
}

function upperLetter(letter) {
	if(letter === "a") {
		return "b";
	} else if (letter === "b") {
		return "c";
	} else if (letter === "c") {
		return "d";
	} else if (letter === "d") {
		return "e";
	} else if (letter === "e") {
		return "f";
	} else if (letter === "f") {
		return "g";
	} else if (letter === "g") {
		return "h";
	}
}

function lowerLetter(letter) {
	if(letter === "b") {
		return "a";
	} else if (letter === "c") {
		return "b";
	} else if (letter === "d") {
		return "c";
	} else if (letter === "e") {
		return "d";
	} else if (letter === "f") {
		return "e";
	} else if (letter === "g") {
		return "f";
	} else if (letter === "h") {
		return "g";
	}
}

function swapTurn(team) {
	var turnList = document.getElementsByClassName("isTurn");
	var length = turnList.length;
	for(var i=0; i<length; i++) {
		turnList[0].classList.remove("isTurn");
	}
	var teamList = null;
	if(team === "B") {
		teamList = document.getElementsByClassName("whiteTeam");
	} else {
		teamList = document.getElementsByClassName("blackTeam");
	}
	length = teamList.length;
	for(var i=0; i<length; i++) {
		teamList[i].classList.add("isTurn");
	}
}

function handleClass(new_element, previous_element) {
	if(previous_element.classList.contains("moveable")) {
		previous_element.classList.remove("moveable");
	}
	if(previous_element.classList.contains("unmoved")) {
		previous_element.classList.remove("unmoved");
	}
	if(previous_element.classList.contains("whiteTeam")) {
		previous_element.classList.remove("whiteTeam");
		new_element.classList.add("whiteTeam");
	}
	if(previous_element.classList.contains("blackTeam")) {
		previous_element.classList.remove("blackTeam");
		new_element.classList.add("blackTeam")
	}
}