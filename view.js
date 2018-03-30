
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

	this.updateResults = function(results) {
		$('#wait').css('display', 'none');
		$('#resultats').text(results);
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

