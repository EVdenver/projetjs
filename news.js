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
		$.cookie('recherches',value,{
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
}


function selectionner_recherche(e) { 
}


function init() {
}


function rechercher_nouvelles() {
}


function maj_resultats(res) {
}


function sauver_nouvelle(e) {
}


function supprimer_nouvelle(e) {
}

