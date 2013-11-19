function Photo (photoInfo){
		this.id = photoInfo.id;
		this.meta = photoInfo || {farm: "", server: "", secret:""};
		this.url = "http://farm" + this.meta.farm + ".staticflickr.com/" + this.meta.server + "/" + this.id + "_" + this.meta.secret;
		this.thumbUrl = this.url + "_s.jpg";
		this.fullUrl = this.url + "_z.jpg";
	}

module.exports = Photo;