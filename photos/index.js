var Thumbnails = require('./thumbs');

function Photos(element){
	this.element = element;
	this.thumbsContainer = this.element.querySelector('#thumbs-container');
	this.thumbNails = new Thumbnails(this.thumbsContainer);
}

Photos.prototype.renderThumbs = function(searchResults){
	this.thumbNails.render(searchResults);
}

module.exports = Photos;