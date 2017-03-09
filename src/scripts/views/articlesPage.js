import React from 'react'
import Banner from './components/banner'

var ArticlesPage = React.createClass({

	componentWillMount: function(){

		var boundUpdater = function(){
			console.log('heard a sync event')
			this.setState({
				loaded: true,
				//Overwrites the collection with itself,
				//it may seem redundant but we are taking advantage of the re-rendering triggered by set state
				collection: this.state.collection 
			})
		}.bind(this)
		//we replace 'this' in the anonymous function with the current meaning of this, which is
		//an articles page component

		//Component mounts the first time it goes on the dom
		//it can render many times after it has mounted
		//this happens on ReactDOM.render()

		//anytime the article collection gets data from the server,
		//we run a function that sets state on this top level component
		//setting state will trigger a rerender on the component and all
		//of it's children. this sets up a 'subscription'
		this.props.articleColl.on('sync', boundUpdater)
		// this.props.articleColl.on('sync', () => {
		// 	this.setState({
		// 		loaded: true,
		// 		collection: this.state.collection
		// 	})
		// })
	},
	getInitialState: function(){
		return {
			collection: this.props.articleColl,
			loaded: false 
		}
	},
	render: function(){

		//DO STUFF:
		//acquire gif 
		//insert the gif into the return value into the render function
		//give it a display value that depends on the component's state

		var gifClass = this.state.loaded ? "hideMe" : "showMe" 
		
		return (
			<div className="articles-page">
				<Banner />
				<img className={gifClass}src="/images/loading.gif"/>
				<SearchResults collection={this.state.collection} />
			</div>
			)
	}
})

var SearchResults = React.createClass({

	_makeArticles: function(){
		var newArray = []
		for(var i = 0; i < this.props.collection.models.length; i++){

			newArray.push(<Article articleMod={this.props.collection.models[i]}/>)

		}
		console.log(newArray.length)
		return newArray
	},
	render: function(){
		console.log('rendering search results')
		console.log('Here comes the winner')
		console.log(this.props.collection)
		return (
			<div>
				{this._makeArticles()}
			</div>
		)
	}
})

var Article = React.createClass({
	
	_toggleParagraph: function(){

		this.setState({
			pShowing: this.state.pShowing ? false : true
		})
	
	},
	getInitialState: function(){
		return {
			pShowing: false
		}
	},

	render: function(){
		console.log('here is state', this)
		console.log('fsfdgsdgsdgsdgf',this.props.articleMod)
		var paraStyle = {
			display: 'none'
		}
		var	buttonSymbol = '+'
		if (this.state.pShowing){
			paraStyle.display = 'block'
			buttonSymbol = '-'

		}
		return(
		<div className="article">
			<h3>{this.props.articleMod.get('headline').main}</h3>
			<button onClick={this._toggleParagraph}>{buttonSymbol}</button>
			<p style = {paraStyle}>{this.props.articleMod.get('lead_paragraph')}</p>
		</div>
		)
	}
})

export default ArticlesPage