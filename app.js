var SearchBar = require('./search'),
	Thumbnails = require('./thumbs'),
	domready = require('domready');

function run(){
	var searchContainer = document.getElementById('searchContainer'),
		thumbsContainer = document.getElementById('thumbsContainer'),
		searchbar = new SearchBar(searchContainer);
		thumbnails = new Thumbnails(thumbsContainer);

	searchbar.on('searchReturned', thumbnails.render)
};

domready(run);