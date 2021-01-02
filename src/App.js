import React, { Component } from 'react';
import Header from './Components/header';
import Homepage from './Pages/Homepage';
import Musicpage from './Pages/Musicpage';
import LikedCatsPage from './Pages/LikedCatsPage';
import Swiper from "./Pages/Swiper";

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
          <Route exact path='/likedcats' component={LikedCatsPage}/>
          <Route exact path='/Hotmilfsinmyarea' component={Musicpage} />
          <Route exact path='/swipe' component={Swiper} />
        </div>
      </Router>
    );
  }
}

export default App;