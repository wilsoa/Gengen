$(function () {
	var defaultOptions = {
		size: 5
	}, currentKenken
	
	if (location.hash) {
		try{
			defaultOptions = decodeOptions(location.hash.substr(1))
			console.log(defaultOptions)
			currentKenken = generateKenken(defaultOptions)
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
		currentKenken = generateKenken({
			size: $("#size").spinner("value"),
			operations: {
				addition: $("#addition").is(":checked"),
				subtraction: $("#subtraction").is(":checked"),
				multiplication: $("#multiplication").is(":checked"),
				division: $("#division").is(":checked"),
				min: $("#min").is(":checked"),
				max: $("#max").is(":checked"),
				range: $("#range").is(":checked"),
				mod: $("#mod").is(":checked"),
				avg: $("#avg").is(":checked"),
				par: $("#par").is(":checked"),
				gcd: $("#gcd").is(":checked")
			},
			difficulty: $("#difficulty").spinner("value"),
			maxGroupSize: $("#groupSize").spinner("value"),
			torus: $("#torus").is(":checked")
		})
	})
	
	$("#solve").button().on("click", function () {
		renderSolution(currentKenken)
	})
})