import React from 'react';
import { Switch, Route, Redirect } from 'react-router'
import Home from '../components/mainPage'
import About from '../components/main/about'
import Prices from '../components/main/prices'
export default props => 
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/about" component={About}/>
                            <Route path="/prices" component={Prices}/>
                            <Redirect from="*" to="/" />
                        </Switch>



           
    
   
