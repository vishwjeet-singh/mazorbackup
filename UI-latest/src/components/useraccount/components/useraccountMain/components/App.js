import React, { useState,useEffect } from 'react';
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"

import Hyperlocal from "../../../../hyperlocal/hyperlocal";
import Advertising from "../../../../advertising/advertising";
import FootInsights from "../../../../../footinsights"
import Useraccount from "../../../useraccount";



function App() {
 
      
      
  return (
    <div className="App">
      
    
        <Router>
        <AuthProvider>
            <Switch>
            
       
              <PrivateRoute exact path="/" component={FootInsights} />
              <PrivateRoute exact path='/hyperlocal' component={Hyperlocal} />
              <PrivateRoute exact path="/advertising" component={Advertising} />
              <PrivateRoute exact path="/useraccount" component={Useraccount} />
              
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
             
            </Switch>
            </AuthProvider>
        </Router>
       
       </div>
    
  )
}

export default App