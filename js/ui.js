$(function () {
	var defaultOptions = {
		size: 5
	}
	
	if (location.hash) {
		try{
			defaultOptions = decodeOptions(location.hash.substr(1))
			console.log(defaultOptions)
			generateKenken(defaultOptions)
		}catch(e){console.log(e)}
	}
	else
	{
		renderBlank(defaultOptions.size)
	}
	
	$("#size").spinner({
		spin: function (event, ui) {
			renderBlank(ui.value)
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
		generateKenken({
			size: $("#size").spinner("value"),
			operations: {
				addition: $("#addition").is(":checked"),
				subtraction: $("#subtraction").is(":checked"),
				multiplication: $("#multiplication").is(":checked"),
				division: $("#division").is(":checked"),
				torus: $("#torus").is(":checked"),
				min: $("#min").is(":checked"),
				max: $("#max").is(":checked"),
				range: $("#range").is(":checked"),
				mod: $("#mod").is(":checked")
			},
			difficulty: $("#difficulty").spinner("value"),
			maxGroupSize: $("#groupSize").spinner("value")
		})
	})
})