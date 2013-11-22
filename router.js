var LocationBar = require('location-bar'),
	EventEmitter = require('events').EventEmitter,
	inherits = require('util').inherits,
	router;

function Router (){
	this.location = new LocationBar();
};

inherits(Router, EventEmitter);

Router.prototype.route = function(patter, fn){
		this.location.route(patter, fn);
	};
Router.prototype.update = function(url, options){
		this.location.update(url, options)
	};
Router.prototype.start = function(){
	this.location.start();
}
router = new Router();

router.route(/search\/(.+)/, function(path) {
	var term = path.split('/')[1];
    	this.emit('search', term);
    }.bind(router))

router.route(/search\/(.+)\/(\d+)/, function(path){
	var segements = path.split('/');
	this.emit('view', segements[1], segements[2]);
}.bind(router));

module.exports = router;