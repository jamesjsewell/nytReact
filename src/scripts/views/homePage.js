import React from 'react'
import Banner from './components/banner'

var HomePage = React.createClass({
	render: function(){
		return (
			<div className="home-page">
				<Banner />
				<p>100% Not Not Fake</p>
			</div>
			)
	}
})

export default HomePage