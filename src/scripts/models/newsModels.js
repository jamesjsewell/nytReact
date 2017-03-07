import Backbone from 'backbone'

export var ArticleCollection = Backbone.Collection.extend({
	url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
	_key: "fa162f9ec488494abf21f3f3b2225849",
	parse: function(apiResponse) {
		return apiResponse.response.docs

	}
})

