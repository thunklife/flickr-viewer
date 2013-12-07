var presenter = require('../../lib/presenter')
	template = require('./index.hbs');

module.exports = function(element){
	return presenter({
		element: element,
		template: template
	});
};