
let controller = new function() {

	this.saveSearch = function(value) {
		return model.saveSearch(value);
	}

	this.removeSearch = function(value) {
		return model.removeSearch(value);
	}

	this.selectSearch = function(value) {
		return model.selectSearch(value);
	}
}

