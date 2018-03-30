
let model = new function() {
	this.searches = [];
	this.search;
	this.searchNews = [];

	this.init = function() {
		this.unserializeSearches();
		this.unserializeSearch();
		this.unserializeSearchNews();
	}

	this.unserializeArray = function(name) {
		var array = JSON.parse(localStorage.getItem(name));

		if(array == null) {
			array = [];
		}

		return array;
	}

	this.serializeArray = function(name, array) {
		localStorage.setItem(name, JSON.stringify(array));
	}

	this.unserializeSearch = function() {
		this.search = localStorage.getItem('search');
	}

	this.unserializeSearches = function() {
		this.searches = this.unserializeArray('searches');
	}

	this.serializeSearches = function() {
		this.serializeArray('searches', this.searches);
	}

	this.serializeSearch = function() {
		localStorage.setItem('search', this.search);
	}

	this.unserializeSearchNews = function() {
		this.searchNews = this.unserializeArray('searchNews');
	}

	this.serializeSearchNews = function() {
		this.serializeArray('searchNews', this.searchNews);
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

	this.setSearch = function(value) {
		this.search = value;
		this.serializeSearch();

		return true;
	}

	this.setSearchNews = function(results) {
		this.searchNews = results
		this.serializeSearchNews();

		return true;
	}
}

