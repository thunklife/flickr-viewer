var SearchBar = require('./searchbar'),
	PhotoViewer = require('./photos'),
	router = require('./router');
	domready = require('domready');

function run(){
	var searchContainer = document.getElementById('search-container'),
		photosContainer = document.getElementById('photos-container'),
		searchbar = new SearchBar(searchContainer);
		photos = new PhotoViewer(photosContainer);

	searchbar.on('searchReturned', function(searchResults){
		photos.displaySearchResults(searchResults);
	});

	searchbar.on('searchClicked', function(term){
		router.update('/search/' + term, {trigger: true});
	});

	router.route(/search\/(.+)/, function(path) {
    	searchbar.search(path.split('/')[1]);
  	});

	router.start();
};

domready(run);