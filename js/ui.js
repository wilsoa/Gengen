$(function () {
	$("#size").spinner({
		spin: function (event, ui) {
			renderBlank(ui.value)
		},
		create: function (event, ui) {
			renderBlank(this.value)
		}
	})
})