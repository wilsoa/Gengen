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
	
	$("#difficulty").spinner({
		min: 1,
		max: 5
	})
	
	$("#addition").attr("checked", true)
	$("#multiplication").attr("checked", true)
	$("[type=checkbox]").button()
	
	$("#generate").button().on("click", function (){
		generateKenken($("#size").spinner("value"))
	})
	
	if (location.hash) {
		var settings = location.hash.substr(1).split(':')
		generateKenken(+settings[0], +settings[1])
	}
})