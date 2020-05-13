import React , { Component } from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'


class App extends Component {
    render(){
    	return (
            <Router>
                <div className="App">
                    <Route exact path='/' component={Home} />
                    <Route exact path='/sorting' component={SortingVisualizer} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/profile" component={Profile} />
                </div>
            </Router>
    );
    }
}

export default App;