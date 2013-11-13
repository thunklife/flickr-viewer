//don't forget to npm install com-delegate;
//look for a good extend module that doesn't require underscore.
//maybe just a customer lodash build?
var Delegate = require('dom-delegate'),
	EventEmitter = require('events').EventEmitter,
	reqwest = require('reqwest'),
	apiKey = '934910a2c34c06b6b167e1589069c274',
	baseUrl = "http://api.flickr.com/services/rest/?&api_key=" + apiKey + "&format=json&nojsoncallback=1&api_cluster=";

function SearchBar(element){
	EventEmitter.call(this);
	this.element = element;
	this.term = '';
	this.delegate = new Delegate(this.element);
	this.render();
	this.delegate.on('blur', '.searchTerm', this.onTermEntered.bind(this));
	this.delegate.on('click', '.searchButton', this.onSearchClicked.bind(this));
}

SearchBar.prototype.render = function(){
	//call handlebars to get the template
	//set initial value to this.searchTerm;
};

SearchBar.prototype.onTermEntered = function(e){
	var term = e.target.value;
	this.term = term || '';
};

SearchBar.prototype.onSearchClicked = function(e){
	if(this.term){
		//update navigation using location-bar;
		url = baseUrl + "&method=flickr.tags.getClusterPhotos&tag=" + this.term;		
		reqwest({
			url: url,
			method: "get",
			type: "json",
			crossOrigin: true,
			success: function searchReturned (data){
				this.emit('searchReturned', data);
			}		
		});
	}
};

//extend prototypes

module.exports = SearchBar;