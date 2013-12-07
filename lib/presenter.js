var inherit = require('util').inherits,
	EventEmitter = require('events').EventEmitter,
	Delegate = require('dom-delegate'),
	noop = function(data){return data;};
module.exports = function presenter(options){
	return new Presenter(options);
};

function Presenter(options){
	this.element = options.element || document.body;
	this.template = options.template;
	this.beforeRender = options.beforeRender || noop;
	this.delegate = new Delegate(this.element);
}

inherit(Presenter, EventEmitter);

Presenter.prototype.render = function(data){
	data = this.beforeRender.call(this, data);
	this.element.innerHTML = this.template(data);
}

Presenter.prototype.detach = function(){
	this.element.innerHTML = '';
}