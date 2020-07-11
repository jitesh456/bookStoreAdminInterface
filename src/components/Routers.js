import React from 'react';
import history from "./history";
import UserLogin from "./UserLogin";
import {Router,Route,Switch} from 'react-router-dom';
import AdminHome from "./AdminHome";


class Routers extends React.Component{
    
    render(){
        return (
            <Router history={history}>
            <Switch>
              
                <Route path="/adminhome" component={AdminHome}/>
               
                <Route path="/user/login" component={UserLogin}/>
               
                <Route path="/" component={UserLogin}/>
            </Switch>
            </Router>
        )
    }
}
export default Routers;