
import React from "react";
import Login from './Components/Login';
import Navbar from './Components/Header/Navbar';
import Footer from './Components/Footer/Footer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import RegisteringManager from "./Components/RegisteringManager";
import Welcome from "./Components/Welcome";

function App() {
  return (
    <div className="App">
      <div className="page-container">
        <div className="page-nav">
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={RegisteringManager} />
              <Route path="/register" component={RegisteringManager} />
              <Route path="/login" component={Login} />
              <Route path="/welcome" component={Welcome}></Route>
            </Switch>
          </Router>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
