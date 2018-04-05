
let view = new function() {
	this.init = function(searches, search, searchNews) {
		let stored = $('#recherches-stockees');

		for(var i = 0; i < searches.length; i++) {
			this.createSearch(searches[i])
				.appendTo(stored);
		}

		$('#zone_saisie')
			.keyup(function() {
				controller.setSearch($(this).val());
			})
			.keypress(function(e) {
				if(e.which == 13) {
					view.searchNews();
				}
			})
			.val(search);

		this.updateResults(searchNews);
	}

	this.createSearch = function(value) {
		let p = $(document.createElement('p'))
			.addClass('titre-recherche');

		$(document.createElement('label'))
			.text(value)
			.on('click', function() {
				view.selectSearch(p);
			}).appendTo(p);

		$(document.createElement('img'))
			.attr('src', 'images/croix30.jpg')
			.addClass('icone-croix')
			.on('click', function() {
				view.removeSearch(p);
			}).appendTo(p);

		return p;
	}

	this.createNews = function(news) {
		let p = $(document.createElement('p'))
			.addClass('titre_result');

		let save = function() {
			view.saveNews(news);
		};

		$(document.createElement('a'))
			.attr('href', news.url)
			.attr('target', '_blank')
			.addClass('titre_news')
			.text(news.titre)
			.appendTo(p);

		$(document.createElement('span'))
			.addClass('date_news')
			.text(news.date)
			.appendTo(p);

		let img = $(document.createElement('img'))
			.attr('src', 'images/horloge15.jpg');

		let span = $(document.createElement('span'))
			.addClass('action_news')
			.on('click', function() {
				view.saveNews(news);
				img.attr('src', 'images/disk15.jpg');
			}).appendTo(p);

		img.appendTo(span);

		return p;
	}

	this.saveSearch = function() {
		let value = $('#zone_saisie').val();

		if(controller.saveSearch(value)) {
			this.createSearch(value)
				.appendTo('#recherches-stockees');
		}
	}

	this.saveNews = function(news) {
		console.log(news);
	}

	this.removeNews = function(news) {
		console.log(news);
	}

	this.searchNews = function() {
		let value = $('#zone_saisie').val();

		$('#resultats').empty();
		$('#wait').css('display', 'block');
		controller.searchNews(value);
	}

	this.updateResults = function(results) {
		$('#wait').css('display', 'none');
		let r = $('#resultats');

		for(var i = 0; i < results.length; i++) {
			view.createNews(results[i])
				.appendTo(r);
		}
	}

	this.selectSearch = function(e) {
		let value = e.children()
			.first()
			.text();

		if(controller.setSearch(value)) {
			$('#zone_saisie').val(value);
		}
	}

	this.removeSearch = function(e) {
		let value = e.children()
			.first()
			.text();

		if(controller.removeSearch(value)) {
			e.remove();
		}
	}
}

