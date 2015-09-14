var thumbnails = require('./thumbs'),
	viewer = require('./viewer'),
	header = require('./header'),
	EventEmitter = require('events').EventEmitter,
	inherit = require('util').inherits;

function Photos(element){
	var thumbsEl = element.querySelector('#thumbs-container'),
		viewerEl = element.querySelector('#image-container'),
		headerEl = element.querySelector('#results-header');
	
	EventEmitter.call(this);	
	this.components = [];
	this.header;
	this.thumbNails;
	this.viewer;

	this.components.push(this.header = header(headerEl));
	this.components.push(this.thumbNails = thumbnails(thumbsEl));
	this.components.push(this.viewer = viewer(viewerEl))
}

inherit(Photos, EventEmitter);

Photos.prototype.render = function(){
	this.header.render();
}

Photos.prototype.displaySearchResults = function(searchResults){
	this.header.title = searchResults.title;
	this.render();
	this.thumbNails.render(searchResults.photos);	
	this.thumbNails.on('thumb-click', function(photo){
		this.emit('thumb-click', photo);
		this.renderImage(photo);
	}.bind(this));
}

Photos.prototype.renderImage = function(photo){
	this.viewer.render(photo);
}

Photos.prototype.loadPhoto = function(id){
	var photos = this.thumbNails.photos.filter(function(item){
		return item.id === id;
	});

	this.renderImage(photos[0]);
}

Photos.prototype.detach = function(name){
	if(name) return this[name].detach();
	
	this.components.forEach(function(component){
		component.detach();
	})
}

module.exports = Photos;