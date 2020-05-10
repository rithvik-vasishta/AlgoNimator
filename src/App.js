import React , { Component } from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer'
import { Route } from 'react-router-dom'
import Home from './Home'
import './App.css'

class App extends Component {
    render(){
    	return (
        <div className="App">
        	<Route exact path='/' render={() => (
        			<Home />
        		)} />
        	<Route exact path='/sorting' render={() => (
        			<SortingVisualizer />
        		)} />
        </div>
    );
    }
}

export default App;