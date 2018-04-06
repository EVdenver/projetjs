var recherches=[];		//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;		// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[];	// tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche() {
	let value = $('#zone_saisie').val();

	if(value.length != 0
		&& recherches.indexOf(value) == -1) {
		recherches.push(value);

		let p = $(document.createElement('p'))
			.addClass('titre-recherche');

		$(document.createElement('label'))
			.text(recherches[recherches.length - 1])
			.on('click', function(){
				selectionner_recherche(p);
			}).appendTo(p);

		$(document.createElement('img'))
			.attr('src', 'croix30.jpg')
			.addClass('icone-croix')
			.on('click', function(){
				supprimer_recherche(p);
			}).appendTo(p);

		p.appendTo('#recherches-stockees');
		$.cookie('recherches',JSON.stringify(recherches),{
			expires: 1000
		})
	}
}

function supprimer_recherche(e) {
	let recherche = e.children()
		.first()
		.text();

	e.remove();

	let index = recherches.indexOf(recherche);
	recherches.splice(index, 1);
	$.cookie('recherches',JSON.stringify(recherches));
}


function selectionner_recherche(e) {
	let recherche = e.children()
		.first()
		.text();
	
	$('#zone_saisie').val(recherche);
	
	recherche_courante = recherche;

	recherche_courante_news = JSON.parse($.cookie(recherche));

	for(var i = 0; i < recherche_courante_news.length; i++){
		let p = $(document.createElement('p'))
				.addClass('titre_result');
			$(document.createElement('a'))
				.addClass('titre_news')
				.attr('href',recherche_courante_news[i].url)
				.attr('target','_blank')
				.text(recherche_courante_news[i].title)
				.appendTo(p);

			$(document.createElement('span'))
				.addClass('date_news')
				.text(recherche_courante_news[i].date)
				.appendTo(p);

			let span = $(document.createElement('span'))
				.addClass('action_news')
				.on('click',function(){
					sauver_nouvelle(this);
				})

			$(document.createElement('img'))
				.attr('src','disk15.jpg')
				.appendTo(span);
			span.appendTo(p);
			p.appendTo('#resultats');
	}

}


function init() {
	if($.cookie('recherches')!= null){
		recherches = JSON.parse($.cookie('recherches'));
		for(var i = 0;i < recherches.length;i++){
			let p = $(document.createElement('p'))
				.addClass('titre-recherche');

			$(document.createElement('label'))
				.text(recherches[i])
				.on('click',function(){
					selectionner_recherche(p);
				}).appendTo(p);

			$(document.createElement('img'))
				.attr('src','croix30.jpg')
				.addClass('icone-croix')
				.on('click',function(){
					supprimer_recherche(p);
				}).appendTo(p);

			p.appendTo('#recherches-stockees');
		}
	}
}


function rechercher_nouvelles() {
	$('#resutats').empty();
	$('#wait').css('display','block');
	var recherche = $('#zone_saisie').val();
	val = encodeURI(recherche);

	if($.cookie(recherche)){
		recherche_courante_news = JSON.parse($.cookie(recherche));
	}

	$.get('search.php?data='+ val,
		function(data, status){
			maj_resultats($.parseJSON(data));
		}
	);
}


function maj_resultats(res) {
	$('#wait').css('display','none');
	var titre_recherche = [];
	for(var i = 0; i<recherche_courante_news.length; i++){
		titre_recherche.push(recherche_courante_news[i].title);
	}

	for(var i = 0;i < res.length; i++){
		let p = $(document.createElement('p'))
				.addClass('titre_result');

		        $(document.createElement('a'))
		                 .addClass('titre_news')
		      	         .attr('href',decodeEntities(res[i].url))
		                 .attr('target','_blank')
		                 .text(res[i].titre)
		                 .appendTo(p);

		        $(document.createElement('span'))
		                  .addClass('date_news')
		                  .text(format(res[i].date))
		                  .appendTo(p);
			
			let span = $(document.createElement('span'))
				.addClass('action_news');

			let img = $(document.createElement('img'));
			console.log(indexOf(titre_recherche,res[i].titre));
			if(indexOf(titre_recherche,res[i].titre) == -1){
				span.on('click',function(){
					sauver_nouvelle(this);
				});

				img.attr('src','horloge15.jpg')
					.appendTo(span);

				span.appendTo(p);
			}else{
				span.on('click',function(){
					supprimer_nouvelle(this);
				})

				img.attr('src','disk15.jpg')
					.appendTo(span);

				span.appendTo(p);
			}
		p.appendTo('#resultats');
	}
}


function sauver_nouvelle(e) {
	e.firstChild.setAttribute('src','disk15.jpg');
	e.setAttribute('onclick','supprimer_nouvelle(this)');
	
	var object = {
		title : e.parentNode.firstChild.textContent,
		date : e.parentNode.firstChild.nextSibling.textContent,
		url : e.parentNode.firstChild.getAttribute('href')
	};

	if(indexOf(recherche_courante_news,object) == -1){
		recherche_courante_news.push(object);
	}

	$.cookie($('#zone_saisie').val(),JSON.stringify(recherche_courante_news),{
		expires: 1000
	})
}


function supprimer_nouvelle(e) {
	e.firstChild.setAttribute('src','horloge15.jpg');
	e.setAttribute('onclick','sauver_nouvelle(this)');

	var object = {
		title : e.parentNode.firstChild.textContent,
		date : e.parentNode.firstChild.nextSibling.textContent,
		url : e.parentNode.firstChild.getAttribute('href')
	}
		let index = recherche_courante_news.indexOf(object);
		recherche_courante_news.splice(index, 1);
		$.cookie($('#zone_saisie').val(),JSON.stringify(recherche_courante_news));
}

