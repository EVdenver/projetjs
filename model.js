
let model = new function() {
	this.searches = [];
	this.search;
	this.search_news = [];

	this.saveSearch = function(value) {
		if(value.length != 0
			&& this.searches.indexOf(value) == -1) {
			this.searches.push(value);
			return true;
		}

		return false;
	}

	this.removeSearch = function(value) {
		let index = this.searches.indexOf(value);
		this.searches.splice(index, 1);

		return true;
	}

	this.selectSearch = function(value) {
		this.search = value;

		return true;
	}
}

