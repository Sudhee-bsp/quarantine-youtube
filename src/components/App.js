import React,{Component} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';

import HomePage from '../pages/HomePage';
import RoomPage from '../pages/RoomPage';

class App extends Component {
  
    render(){
      return (
        <BrowserRouter>
          <div>
            {/* <Navbar /> */}
            <Switch>
               <Route path="/" exact component={RoomPage} />
               <Route path="/ctube" exact component={HomePage} />
            </Switch>
          </div>
        </BrowserRouter>
      );  
    }
  }
  
  export default App;