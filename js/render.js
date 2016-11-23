function renderBlank (size) {
	$("#kenken").empty()
	var dimension = $(window).height() / size * .9;
	
	for (var i = 0; i < size; i++){
		var tr = $('<tr />')
		for (var j = 0; j < size; j++) {
			$("<td />").width(dimension).height(dimension).appendTo(tr)
		}
		$("#kenken").append(tr)
	}
}

function renderCell (cell, dimension, solve) {
	var td = $("<td align='center' />").width(dimension).height(dimension)
	
	var neighbors = cell.getNeighborsOriented(), groupID = cell.cellGroup.groupID
	console.log(cell.x, cell.y, neighbors)
	td.css('border-top', (neighbors.up && (neighbors.up.cellGroup.groupID == groupID)) ? "1px dotted black" : "3px solid black")
	td.css('border-bottom', (neighbors.down && (neighbors.down.cellGroup.groupID == groupID)) ? "1px dotted black" : "3px solid black")
	td.css('border-left', (neighbors.left && (neighbors.left.cellGroup.groupID == groupID)) ? "1px dotted black" : "3px solid black")
	td.css('border-right', (neighbors.right && (neighbors.right.cellGroup.groupID == groupID)) ? "1px dotted black" : "3px solid black")
	
	if (cell.cellGroup.currentSize === 1) td.html(cell.value)
	else if (cell === cell.cellGroup.getTopLeft()) td.html("<div class='hint'>" + cell.cellGroup.operationDescription + "</div>" + (solve ? cell.value : ""))
	else if (solve) td.html(cell.value)
	
	return td
}

function renderKenken (kenken) {
	$("#kenken").empty()
	var size = kenken.size,
		dimension = $(window).height() / size * .9
	
	for (var y = 0; y < size; y++){
		var tr = $('<tr />')
		for (var x = 0; x < size; x++) {
			renderCell(kenken.board[x][y], dimension).appendTo(tr)
		}
		$("#kenken").append(tr)
	}
}

function renderSolution (kenken) {
	$("#kenken").empty()
	var size = kenken.size,
		dimension = $(window).height() / size * .9
	
	for (var y = 0; y < size; y++){
		var tr = $('<tr />')
		for (var x = 0; x < size; x++) {
			renderCell(kenken.board[x][y], dimension, true).appendTo(tr)
		}
		$("#kenken").append(tr)
	}
}