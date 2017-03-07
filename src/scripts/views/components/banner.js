import React from 'react'

var Banner = React.createClass({
	_handleKeyDown: function(evtObj){
		if (evtObj.keyCode === 13) {
			location.hash = `search/${evtObj.target.value}`
		}
	},

	render: function() {
		return(
			<div className="banner">
				<h1>The Peoples News</h1>
				<input type="text" onKeyDown={this._handleKeyDown}/>
				<a href="#home">home</a>
			</div>
		)
	}
})

export default Banner