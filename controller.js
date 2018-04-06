
let controller = new function() {
	this.init = function() {
		model.init();

		view.init(model.searches,
			model.search,
			model.searchNews);
	}

	this.saveSearch = function(value) {
		return model.saveSearch(value);
	}

	this.setSearch = function(value) {
		return model.setSearch(value);
	}

	this.removeSearch = function(value) {
		return model.removeSearch(value);
	}

	this.searchNews = function(value) {
		$.get('search.php?data=' + value,
			function(data, status) {
				if(status == 'success') {
					controller.updateResults(JSON.parse(data));
				}
			}
		);
	}

	this.updateResults = function(results) {
		let news = model.queryNews(results);
		view.updateResults(news);
	}

	this.saveNews = function(news) {
		model.saveNews(news);
	}

	this.removeNews = function(news) {
		model.removeNews(news);
	}
}

