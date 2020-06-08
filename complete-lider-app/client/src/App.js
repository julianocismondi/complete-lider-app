import React, {useContext} from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Todos from './Components/Todos';
import Admin from './Components/Admin';
import PrivateRoute from './hocs/PrivateRoute';
import PublicRoute from './hocs/PublicRoute';

import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  
        return (
          <Router>
            <Navbar/>
            <Route exact path ="/" component = { Home }></Route>
            <PublicRoute path="/login" component = { Login }></PublicRoute>
            <PublicRoute path="/register" component = { Register }></PublicRoute>
            <PrivateRoute path="/todos" roles= {[ "operator", "administrator" ]} component={ Todos }></PrivateRoute>
            <PrivateRoute path="/admin" roles= {[ "administrator" ]} component={ Admin }></PrivateRoute>
          </Router>
          
        );
  }

export default App;
