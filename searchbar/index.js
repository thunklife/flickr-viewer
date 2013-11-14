var Delegate = require('dom-delegate'),
	EventEmitter = require('events').EventEmitter,
	extend = require('lodash').extend;
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
	this.delegate.on('click', '.searchButton', this.onSearchClicked.bind(this));
}

SearchBar.prototype.render = function(){
	this.element.innerHTML = template(this);
	document.querySelector('.searchTerm').addEventListener('blur', this.onTermEntered.bind(this));
};

SearchBar.prototype.onTermEntered = function(e){
	var term = e.target.value;
	this.term = term || '';
};

SearchBar.prototype.onSearchClicked = function(e){
	var url;
	if(this.term){
		url = baseUrl + "&method=flickr.tags.getClusterPhotos&tag=" + this.term + urlSuffix;	
		reqwest({
			url: url,
			method: 'get',
			type: 'json',
			crossOrigin: true,
			success: function (resp){
				this.emit('searchReturned', resp);
			}.bind(this),
			error: function (err){
				console.log(err);
			}
		});
	}
};

extend(SearchBar.prototype, EventEmitter.prototype);

module.exports = SearchBar;