var Thumbnails = require('./thumbs'),
	Viewer = require('./viewer'),
	template = require('./photos.hbs');

function Photos(element){
	var thumbsContainer = element.querySelector('#thumbs-container'),
		imageContainer = element.querySelector('#image-container');
		
	this.header = element.querySelector('#results-header');
	this.title = "";
	this.thumbNails = new Thumbnails(thumbsContainer);
	this.viewer = new Viewer(imageContainer);
}

Photos.prototype.render = function(){
	this.header.innerHTML = template(this);
}

Photos.prototype.displaySearchResults = function(searchResults){
	this.title = searchResults.title;
	this.render();
	this.thumbNails.render(searchResults.photos);	
	this.thumbNails.on('thumbClicked', this.renderImage.bind(this));
}

Photos.prototype.renderImage = function(photo){
	this.viewer.render(photo);
}

module.exports = Photos;