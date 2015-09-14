var component = require('../lib/component'),
	template = require('./index.hbs'),
	reqwest = require('reqwest'),
	apiKey = '934910a2c34c06b6b167e1589069c274',
	baseUrl = "http://api.flickr.com/services/rest/?&api_key=" + apiKey;
	urlSuffix = "&format=json&nojsoncallback=1"

module.exports = function(element){
	var search = component({
		element: element,
		template: template
	});

	search.term = '';	

	search.search = function(term){
		var url;

		if(this.term === term) return;
		this.term = term || this.term;

		url = baseUrl + "&method=flickr.tags.getClusterPhotos&tag=" + this.term + urlSuffix;	
			reqwest({
				url: url,
				method: 'get',
				type: 'json',
				crossOrigin: true,
				success: function (resp){
					if(resp.photos.photo.length){
						this.emit('success', {title: this.term, photos: resp.photos.photo});
						this.searchComplete = true;
						return;
					}
					this.searchFailed = true;
				}.bind(this),
				error: function (err){
					console.log(err);
				}
			});
	};

	search.update = function(e){
		var term = e.target.value;
		this.term = term || '';
	};

	search.click = function(){
		if(this.term){
			this.search();
			this.emit('click', this.term);
		}
	};
	search.delegate.on('click', '.search-button', search.click.bind(search));
	search.delegate.on('submit', 'form', search.click.bind(search));
	search.delegate.on('blur', '.search-term', search.update.bind(search));
	search.detach = function(){
		search.term = '';
	};
	return search;
};