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