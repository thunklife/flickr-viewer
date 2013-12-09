var component = require('../../lib/component'),
	template = require('./index.hbs');

module.exports = function(element){
	var header = component({
		element: element,
		template: template
	});

	header.title='';

	return header;
}