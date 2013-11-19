var SearchBar = require('./searchbar'),
	PhotoViewer = require('./photos'),
	domready = require('domready');

function run(){
	var searchContainer = document.getElementById('search-container'),
		photosContainer = document.getElementById('photos-container'),
		searchbar = new SearchBar(searchContainer);
		photos = new PhotoViewer(photosContainer);

	searchbar.on('searchReturned', function(searchResults){
		photos.renderThumbs(searchResults);
	});
};

domready(run);