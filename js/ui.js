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
})