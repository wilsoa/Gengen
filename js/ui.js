$(function () {
	$("#size").spinner({
		spin: function (event, ui) {
			renderBlank(ui.value)
		},
		create: function (event, ui) {
			renderBlank(this.value)
		},
		min: 2,
		max: 20
	})
	
	$("#groupSize").spinner({
		min: 2,
		max: 8
	})
	
	$("#difficulty").spinner({
		min: 1,
		max: 5
	})
	
	$("#addition").attr("checked", true)
	$("#multiplication").attr("checked", true)
	$("[type=checkbox]").button()
	
	$("#generate").button().on("click", function (){
		generateKenken($("#size").spinner("value"), {
			operations: {
				addition: $("#addition").is(":checked"),
				subtraction: $("#subtraction").is(":checked"),
				multiplication: $("#multiplication").is(":checked"),
				division: $("#division").is(":checked")
			},
			difficulty: $("#difficulty").spinner("value"),
			maxGroupSize: $("#groupSize").spinner("value")
		})
	})
	
	if (location.hash) {
		var hash = JSON.parse(atob(location.hash.substr(1)))
		generateKenken(hash[0], hash[1], hash[2])
	}
})