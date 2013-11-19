var Delegate = require('dom-delegate'),
	EventEmitter = require('events').EventEmitter,
	Photo = require('../photo'),
	inherits = require('util').inherits,
	template = require('./thumbs.hbs');

function Thumbnails(element){
	EventEmitter.call(this);
	this.element = element;
	this.photos = [];
	this.title;
	this.delegate = new Delegate(this.element);
	this.delegate.on('click', '.image-link', function(e){
		console.log('clicked');
	})
}

inherits(Thumbnails, EventEmitter)

Thumbnails.prototype.render = function(options){
	this.photos = options.photos.map(function(photo){
		return new Photo(photo);
	});

	this.title = options.title;
	this.element.innerHTML = template(this);
}

module.exports = Thumbnails;