var component = require('../../lib/component')
	template = require('./index.hbs');

module.exports = function(element){
	return component({
		element: element,
		template: template
	});
};