var SearchBar = require('./searchbar'),
	domready = require('domready');

function run(){
	var searchContainer = document.getElementById("searchContainer"),
	searchbar = new SearchBar(searchContainer);
	searchbar.render();
};

domready(run);