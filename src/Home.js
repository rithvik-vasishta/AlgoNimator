import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'

class Home extends Component{
  logOut(e){
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push('/')
  }


	render(){
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav">
          <li class="nav-item">
            <Link to="/sorting" class="nav-link" >Visualizer</Link>
          </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            User
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    )



		return(
<>

    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="/">Algonimator</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link to="/" class="nav-link">Home <span class="sr-only">(current)</span></Link>
          </li>
        </ul>
        {localStorage.usertoken ? userLink : loginRegLink}
      </div>
    </nav>

    <main role="main">
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-3"><strong>Welcome to Algonimator</strong></h1>
          <p>Algorithm Visualizer is an interactive online platform that visualizes algorithms from code. Learning an algorithm gets much easier with visualizing it. Don't get what we mean? Check it out</p>
          <p><a class="btn btn-primary btn-lg" href="https://www.geeksforgeeks.org/sorting-algorithms/" role="button">Learn more »</a></p>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-md-3">
          	<img class="rounded-circle" src="data:image/jpeg;base64,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" alt="Generic placeholder image" width="140" height="140" />
            <h2>Somandra Singh Rathore</h2>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
            <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
          </div>
          <div class="col-md-3">
          	<img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140" />
            <h2>Rithvik Vashishta</h2>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
            <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
          </div>
          <div class="col-md-3">
          	<img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140" />
            <h2>Yash Singh Chouhan</h2>
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
            <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
          </div>
          <div class="col-md-3">
          	<img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140" />
            <h2>Utkarsha Verma</h2>
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
            <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
          </div>
        </div>

        <hr />

      </div> 

    </main>

    <footer class="container">
      <p>© Algonimator 2017-2018</p>
    </footer>
  

</>			
			);
	}
}

export default withRouter(Home)