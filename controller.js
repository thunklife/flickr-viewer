var SearchBar = require('./searchbar'),
	PhotoViewer = require('./photos'),
	EventEmitter = require('events').EventEmitter,
	inherits = require('util').inherits;
	

function Controller(){
	var searchContainer = document.getElementById('search-container'),
		photosContainer = document.getElementById('photos-container');
	
	this.searchbar = new SearchBar(searchContainer);
	this.photos = new PhotoViewer(photosContainer);

	this.searchbar.on('success', function(searchResults){
		this.photos.displaySearchResults(searchResults);
	});

	this.searchbar.on('click', function(term){
		this.emit('search', term)
	}.bind(this));

	this.photos.on('thumb-click', function(photo){
		this.emit('thumb-click', photo);
	}.bind(this));
}

inherits(Controller, EventEmitter);

Controller.prototype.search = function(term){
	this.searchbar.search(term);
	this.searchbar.render();
}

Controller.prototype.viewImage = function(term,id){
	if(searchbar.term === term && searchbar.searchComplete){
			return photos.loadPhoto(id);
		}
	this.search(term);
	searchbar.on('success', function(){
		photos.loadPhoto(id);
	});
}

module.exports = Controller;
