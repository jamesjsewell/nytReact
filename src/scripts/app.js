import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
//importing from local files
import HomePage from './views/homePage'
import ArticlesPage from './views/articlesPage'
//Syntax for importing from a file that is not 'default'
import {ArticleCollection} from './models/newsModels'


var app = function() {
	var NewsRouter = Backbone.Router.extend({
		routes: {
			'home': 'handleHome',
			'search/:query': 'handleNewsSearch',
			'details/:id': 'handleDetail',
			'*defaultRoute': 'handleRedirect'
		},

		handleHome: function() {
			ReactDOM.render(<HomePage />,document.querySelector('.container'))//ReactDOM.render will mount a React component onto the actual DOM
		},

		handleRedirect: function() {
			location.hash = 'home'
		},

		handleNewsSearch: function(query) {
			var collectionInstance = new ArticleCollection()
			collectionInstance.fetch({
				data:{
					'q':query,
					'api-key': collectionInstance._key
				},

			})
			ReactDOM.render(<ArticlesPage 
					cohort='awesome' 
					student='kenji'
					articleColl={collectionInstance}
					/>, document.querySelector('.container')) 
				

		},
		handleNewsSearchWithPromise: function(query) {
			var collectionInstance = new ArticleCollection()
			var promise = collectionInstance.fetch({
				data:{
					'q':query,
					'api-key': collectionInstance._key
				},
				
			}) 
			//Wrong way
			// promise.then(ReactDOM.render(<ArticlesPage cohort='awesome' student='kenji'/>, document.querySelector('.container')))	


			//Right way
			promise.then(function(){
				//ReactDom.render mounts the article page component
				//any key value pairs that we assign to the component upon rendering
				//blah blah blah
				//sticking a javascript name into jsx
				ReactDOM.render(<ArticlesPage 
					cohort='awesome' 
					student='kenji'
					articleColl={collectionInstance}
					/>, document.querySelector('.container'))
			})	

		}
	})
	new NewsRouter 
	Backbone.history.start()
}



// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export var app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..