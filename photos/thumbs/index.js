var Delegate = require('dom-delegate'),
	EventEmitter = require('events').EventEmitter,
	Photo = require('../photo'),
	inherits = require('util').inherits,
	template = require('./thumbs.hbs');

function Thumbnails(element){
	EventEmitter.call(this);
	this.element = element;
	this.photos = [];
	this.delegate = new Delegate(this.element);
	this.delegate.on('click', '.image-link', function(e){
		var id = e.target.id,
			thumb = this.photos.filter(function(photo){
				return photo.id === id;
			});
			e.preventDefault();
			if(!thumb.length) return console.err("WAT?!");

			this.emit('thumbClicked', thumb[0]);
	}.bind(this));
}

inherits(Thumbnails, EventEmitter)

Thumbnails.prototype.render = function(photos){
	this.photos = photos.map(function(photo){
		return new Photo(photo);
	});
	this.element.innerHTML = template(this);
}

module.exports = Thumbnails;