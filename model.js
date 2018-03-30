
let model = new function() {
	this.searches = [];
	this.search;
	this.searchNews = [];

	this.init = function() {
		this.unserializeSearches();
		//this.unserializeSearch();
		//this.unserializeSearchNews();
	}

	this.unserializeSearches = function() {
		this.searches = JSON.parse(localStorage.getItem('searches'));

		if(this.searches == null) {
			this.searches = [];
		}
	}

	this.serializeSearches = function() {
		localStorage.setItem('searches', JSON.stringify(this.searches));
		console.log(localStorage.getItem('searches'));
	}

	this.saveSearch = function(value) {
		if(value.length != 0
			&& this.searches.indexOf(value) == -1) {
			this.searches.push(value);

			this.serializeSearches();

			return true;
		}

		return false;
	}

	this.removeSearch = function(value) {
		let index = this.searches.indexOf(value);
		this.searches.splice(index, 1);

		this.serializeSearches();

		return true;
	}

	this.selectSearch = function(value) {
		this.search = value;

		return true;
	}
}

