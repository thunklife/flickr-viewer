var Photo = require('../photo'),
	template = require('./index.hbs'),
	presenter = require('../../lib/presenter');

module.exports = function(element){
	var view = presenter({
		element: element,
		template: template,
		beforeRender: function mapPhotos(data){
			this.photos = data.map(function(photo){
				return new Photo(photo);
			});

			return this;
		}
	});

	view.photos = [];
	view.delegate.on('click', '.image-link', function(e){
		var id = e.target.id,
			thumb = view.photos.filter(function(photo){
				return photo.id === id;
			});
			e.preventDefault();
			if(!thumb.length) return console.error('WAT?!');
			view.emit('thumb-click', thumb[0])
	})

	return view;
};