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
	$.get('search.php?data='+$('#zone_saisie').val(),
		function(data, status){
			if(status == 'success'){
				maj_resultats(JSON.parse(data))
			}
		}
	);
}


function maj_resultats(res) {
	$('#wait').css('display','none');
	for(var i = 0;i < res.length; i++){
		let p = $(document.createElement('p'))
			.addClass('titre_result');

		$(document.createElement('a'))
			.addClass('titre_news')
			.attr('href',res[i].url)
			.attr('target','_blank')
			.text(res[i].titre)
			.appendTo(p);

		$(document.createElement('span'))
			.addClass('date_news')
			.text(res[i].date)
			.appendTo(p);

		$(document.createElement('span'))
			.addClass('action_news')
			.on('click',function(){
				sauver_nouvelle(p);
			}).appendTo(p);

		$(document.createElement('img'))
			.attr('src','horloge15.jpg')
			.appendTo(p);

		p.appendTo('#resultats');
	}
}


function sauver_nouvelle(e) {
}


function supprimer_nouvelle(e) {
}

