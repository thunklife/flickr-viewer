var SearchBar = require('./searchbar'),
	PhotoViewer = require('./photos'),
	router = require('./router');
	domready = require('domready');

function run(){
	var searchContainer = document.getElementById('search-container'),
		photosContainer = document.getElementById('photos-container'),
		searchbar = new SearchBar(searchContainer);
		photos = new PhotoViewer(photosContainer);

	searchbar.on('success', function(searchResults){
		photos.displaySearchResults(searchResults);
	});

	searchbar.on('click', function(term){
		router.update('/search/' + term, {trigger: false});
	});

	photos.on('thumb-click', function(photo){
		var hash = window.location.hash
			segments = hash.split('/').splice(0,2);
		router.update(segments.join('/') + '/' + photo.id);
	});

	router.on('search', function(term){
		searchbar.search(term);
		searchbar.render();
	});

	router.on('view', function(term, id){
		if(searchbar.term === term && searchbar.searchComplete){
			return photos.loadPhoto(id);	
		}
		searchbar.search(term);
		searchbar.on('success', function(){
			photos.loadPhoto(id);
		});
		
	});

	router.start();
};

domready(run);