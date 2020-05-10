import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

class Home extends Component{
	render(){
		return(
			<div>
		      <Jumbotron fluid>
		        <h1 className="display-3">Welcome To Algonimator</h1>
		        <p className="lead">This is a Tool that helps you to visualize Algorithms better</p>
		        <hr className="my-2" />
		        <p>We hope you like it!!!</p>
		        <p className="lead">
		          <Button color="primary">Learn More</Button>
		        </p>
		      </Jumbotron>
		    </div>
			);
	}
}

export default Home