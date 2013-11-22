var Thumbnails = require('./thumbs'),
	Viewer = require('./viewer'),
	EventEmitter = require('events').EventEmitter,
	template = require('./header.hbs'),
	inherit = require('util').inherits;

function Photos(element){
	var thumbsContainer = element.querySelector('#thumbs-container'),
		imageContainer = element.querySelector('#image-container');
	
	EventEmitter.call(this);	
	this.title = "";
	this.header = element.querySelector('#results-header');
	this.thumbNails = new Thumbnails(thumbsContainer);
	this.viewer = new Viewer(imageContainer);
}

inherit(Photos, EventEmitter);

Photos.prototype.render = function(){
	this.header.innerHTML = template(this);
}

Photos.prototype.displaySearchResults = function(searchResults){
	this.title = searchResults.title;
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

module.exports = Photos;