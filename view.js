
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
			.click(function() {
				view.selectSearch(p);
			}).appendTo(p);

		$(document.createElement('img'))
			.attr('src', 'images/croix30.jpg')
			.addClass('icone-croix')
			.click(function() {
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

		let img = $(document.createElement('img'));
		let span = $(document.createElement('span'))
			.addClass('action_news');
		var action;

		if(news.saved) {
			img.attr('src', 'images/disk15.jpg');

			span.click(action = function() {
				span.off();
				controller.removeNews(news);
				img.attr('src', 'images/horloge15.jpg');
				span.click(function() {
					span.off();
					controller.saveNews(news);
					img.attr('src', 'images/disk15.jpg');
					span.click(action);
				});
			});
		} else {
			img.attr('src', 'images/horloge15.jpg');

			span.click(action = function() {
				span.off();
				controller.saveNews(news);
				img.attr('src', 'images/disk15.jpg');
				span.click(function() {
					span.off();
					controller.removeNews(news);
					img.attr('src', 'images/horloge15.jpg');
					span.click(action);
				});
			});
		}

		span.appendTo(p);
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

	this.searchNews = function() {
		let value = $('#zone_saisie').val();

		$('#resultats').empty();
		$('#wait').css('display', 'block');
		controller.searchNews(value);
	}

	this.updateResults = function(news) {
		$('#wait').css('display', 'none');
		let r = $('#resultats');
		r.empty();

		for(var i = 0; i < news.length; i++) {
			view.createNews(news[i])
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

