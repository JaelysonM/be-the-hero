import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import NotFound from './pages/NotFound';

export default function Routes() {
  return (<BrowserRouter>
    <Switch>
       <Route path="/" exact component={Logon}></Route>
       <Route path="/register" component={Register}></Route>
       <Route path="/profile" component={Profile}></Route>
       <Route path="/incidents/new" component={NewIncident}></Route>
       <Route path="*" component={NotFound}/>
    
    </Switch>
  </BrowserRouter>)
}