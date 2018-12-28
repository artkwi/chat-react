import React, { Component } from 'react';
import Chat from "./components/Chat";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="wraper">
            <Route exact path="/" component={Login} />
            <Route exact path="/chat" component={Chat} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;