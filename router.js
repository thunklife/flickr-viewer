var LocationBar = require('location-bar'),
	EventEmitter = require('events').EventEmitter,
	inherits = require('util').inherits,
	extend = require('lodash').extend,
	router;

extend(LocationBar.prototype, EventEmitter.prototype);

router = new LocationBar();

router.route(/search\/(.+)/, function(path) {
	var term = path.split('/')[1];
    	this.emit('search', term);
    }.bind(router))

router.route(/search\/(.+)\/(\d+)/, function(path){
	var segements = path.split('/');
	this.emit('view', segements[1], segements[2]);
}.bind(router));

module.exports = router;