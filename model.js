
let model = new function() {
	this.searches = [];
	this.search;
	this.searchNews = [];

	this.init = function() {
		this.unserializeSearches();
		this.unserializeSearch();
		this.unserializeSearchNews();

		console.log(this.searches);
		console.log(this.search);
		console.log(this.searchNews);
	}

	this.unserializeSearch = function() {
		this.search = localStorage.getItem('search');
	}

	this.unserializeSearches = function() {
		this.searches = JSON.parse(localStorage.getItem('searches'));
		if(this.searches == null)
			this.searches = [];
	}

	this.serializeSearches = function() {
		localStorage.setItem('searches', JSON.stringify(this.searches));
	}

	this.serializeSearch = function() {
		localStorage.setItem('search', this.search);
	}

	this.unserializeSearchNews = function() {
		this.searchNews = JSON.parse(localStorage.getItem('searchNews'));
		if(this.searchNews == null)
			this.searchNews = {};
	}

	this.serializeSearchNews = function() {
		localStorage.setItem('searchNews', JSON.stringify(this.searchNews));
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

		// Inutile, la recherche affichera les déjà sauvés aussi
		//if(this.searchNews[this.search] != undefined)
		//	controller.setSaved(this.searchNews[this.search]);

		controller.searchNews(this.search);

		return true;
	}

	this.saveNews = function(news) {
		if(this.searchNews[this.search] == undefined) {
			this.searchNews[this.search] = [];
		}

		this.searchNews[this.search].push(news);

		this.serializeSearchNews();
	}

	this.removeNews = function(news) {
		let list = this.searchNews[this.search];

		if(list != undefined) {
			let index = indexOf(list, news);

			if(index > -1) {
				list.splice(index, 1);
			}
		}

		this.serializeSearchNews();
	}

	this.queryNews = function(results) {
		for(var i = 0; i < results.length; i++) {
			var j = 0;
			results[i].date = format(results[i].date);
			results[i].url = decodeEntities(results[i].url);

			if(this.searchNews[this.search] != undefined) {
				let index = indexOf(this.searchNews[this.search], results[i]);

				if(index != -1)
					results[i].saved = true;
				else
					results[i].saved = undefined;
			} else {
				results[i].saved = undefined;
			}
		}

		return results;
	}
}

