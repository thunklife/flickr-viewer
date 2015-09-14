var router = require('./router'),
	domready = require('domready'),
	Controller = require('./controller');


function run(){

	var controller = new Controller();
	controller.on('search', function(term){
		router.update('/search/' + term, {trigger: false});
	});

	controller.on('thumb-click', function(photo){
		var hash = window.location.hash,
			segments = hash.split('/').splice(0,2);
		router.update(segments.join('/') + '/' + photo.id);
	});

	router.on('home', function(){
		controller.detachAll();
	});

	router.on('search', function(term){
		controller.search(term);
	});

	router.on('view', function(term, id){
		controller.viewImage(term,id);
	});

	router.start();
};

domready(run);