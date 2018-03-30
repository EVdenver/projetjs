
let controller = new function() {
	this.init = function() {
		model.init();

		view.init(model.searches);
	}

	this.saveSearch = function(value) {
		return model.saveSearch(value);
	}

	this.selectSearch = function(value) {
		return model.selectSearch(value);
	}

	this.removeSearch = function(value) {
		return model.removeSearch(value);
	}
}

