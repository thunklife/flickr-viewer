var Delegate = require('dom-delegate'),
	EventEmitter = require('events').EventEmitter,
	inherit = require('util').inherits,
	template = require('./search.hbs'),
	reqwest = require('reqwest'),
	apiKey = '934910a2c34c06b6b167e1589069c274',
	baseUrl = "http://api.flickr.com/services/rest/?&api_key=" + apiKey;
	urlSuffix = "&format=json&nojsoncallback=1"

function SearchBar(element){
	EventEmitter.call(this);
	this.element = element;
	this.term = '';
	this.render();
	this.delegate = new Delegate(this.element);
	this.delegate.on('click', '.search-button', this.onSearchClicked.bind(this));
	this.delegate.on('blur', '.search-term', this.onTermEntered.bind(this));
	this.searchFailed = false;
}

inherit(SearchBar, EventEmitter);

SearchBar.prototype.render = function(){
	this.element.innerHTML = template(this);
};

SearchBar.prototype.onTermEntered = function(e){
	var term = e.target.value;
	this.term = term || '';
};

SearchBar.prototype.search = function(term){
	var url;
	if(!term) return;
	this.term = term;

	url = baseUrl + "&method=flickr.tags.getClusterPhotos&tag=" + this.term + urlSuffix;	
		reqwest({
			url: url,
			method: 'get',
			type: 'json',
			crossOrigin: true,
			success: function (resp){
				if(resp.photos.photo.length){
					this.emit('searchReturned', {title: this.term, photos: resp.photos.photo});
					return;
				}
				this.searchFailed = true;
			}.bind(this),
			error: function (err){
				console.log(err);
			}
		});
}

SearchBar.prototype.onSearchClicked = function(){
	if(this.term){
		this.search(this.term);
		this.emit('searchClicked', this.term);
	}
};

module.exports = SearchBar;