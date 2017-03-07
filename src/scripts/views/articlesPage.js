import React from 'react'
import Banner from './components/banner'

var ArticlesPage = React.createClass({
	render: function(){
		console.log('Here comes the value of this in articles page')
		console.log(this)
		return (
			<div className="articles-page">
				<Banner />
				<SearchResults collection={this.props.articleCollection} />
			</div>
			)
	}
})



export default ArticlesPage