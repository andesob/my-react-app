import React, { Component } from 'react';
import Header from './Components/header';
import Homepage from './Pages/Homepage';
import Musicpage from './Pages/Musicpage';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//import './Styles/default.css';

class App extends Component {
  

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path='/' component={Homepage} />
          <Route exact path='/Hotmilfsinmyarea' component={Musicpage} />
        </div>
      </Router>
    );
  }
}

export default App;