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

function renderCell (cell, dimension) {
	var td = $("<td align='center' />").html(cell.value+'(' + cell.x + ',' + cell.y + ')'+'#'+cell.cellGroup.groupID).width(dimension).height(dimension)
	
	var neighbors = cell.getNeighborsOriented(), groupID = cell.cellGroup.groupID
	console.log(cell.x, cell.y, neighbors)
	td.css('border-top', (neighbors.up && (neighbors.up.cellGroup.groupID == groupID)) ? "1px dotted black" : "2px solid black")
	td.css('border-bottom', (neighbors.down && (neighbors.down.cellGroup.groupID == groupID)) ? "1px dotted black" : "2px solid black")
	td.css('border-left', (neighbors.left && (neighbors.left.cellGroup.groupID == groupID)) ? "1px dotted black" : "2px solid black")
	td.css('border-right', (neighbors.right && (neighbors.right.cellGroup.groupID == groupID)) ? "1px dotted black" : "2px solid black")
	
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