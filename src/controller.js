var searchbar = require('./searchbar'),
	PhotoViewer = require('./photos'),
	EventEmitter = require('events').EventEmitter,
	inherits = require('util').inherits;
	

function Controller(){
	var searchContainer = document.getElementById('search-container'),
		photosContainer = document.getElementById('photos-container');
	
	this.searchbar = searchbar(searchContainer);
	this.photos = new PhotoViewer(photosContainer);

	this.searchbar.on('success', function(searchResults){
		this.photos.displaySearchResults(searchResults);
	}.bind(this));

	this.searchbar.on('click', function(term){
		this.emit('search', term)
	}.bind(this));

	this.photos.on('thumb-click', function(photo){
		this.emit('thumb-click', photo);
	}.bind(this));

	this.searchbar.render();
}

inherits(Controller, EventEmitter);

Controller.prototype.search = function(term){
	if(this.searchbar.term === term) return this.photos.detach('viewer');
	this.searchbar.search(term);
	this.searchbar.render();
	
}

Controller.prototype.viewImage = function(term,id){
	if(this.searchbar.term === term && this.searchbar.searchComplete){
			return this.photos.loadPhoto(id);
		}
	this.search(term);
	this.searchbar.on('success', function(){
		this.photos.loadPhoto(id);
	}.bind(this));
}

Controller.prototype.detachAll = function(){
	this.searchbar.detach();
	this.photos.detach();
}

module.exports = Controller;
