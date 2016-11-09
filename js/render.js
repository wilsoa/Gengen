function renderBlank (size) {
	$("#kenken").empty()
	var dimension = $(window).height() / size * .9;
	console.log(dimension)
	for (var i = 0; i < size; i++){
		var tr = $('<tr />')
		for (var j = 0; j < size; j++) {
			$("<td />").width(dimension).height(dimension).appendTo(tr)
		}
		$("#kenken").append(tr)
	}
}

function renderCell (cell, dimension) {
	var td = $("<td />").width(dimension).height(dimension)
	
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