var inherit = require('util').inherits,
	EventEmitter = require('events').EventEmitter,
	Delegate = require('dom-delegate'),
	noop = function(data){return data;};
module.exports = function component(options){
	return new Component(options);
};

function Component(options){
	this.element = options.element || document.body;
	this.template = options.template;
	this.beforeRender = options.beforeRender || noop;
	this.delegate = new Delegate(this.element);
}

inherit(Component, EventEmitter);

Component.prototype.render = function(data){
	data = data || this;
	data = this.beforeRender.call(this, data);
	this.element.innerHTML = this.template(data);
}

Component.prototype.detach = function(){
	this.element.innerHTML = '';
}