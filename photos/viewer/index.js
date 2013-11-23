var template = require('./viewer.hbs');

function Viewer(element){
	this.element = element;
	this.photo;
}

Viewer.prototype.render = function(photo){
	this.photo = photo
	this.element.innerHTML = template(this.photo);
};

Viewer.prototype.detach = function(){
	this.element.innerHTML = '';
}

module.exports = Viewer;