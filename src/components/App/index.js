import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';


import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';



const App = () => {


    return (
        
        <Router>
            <Navigation />
            <Route path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

        </Router>


    );
}



export default withAuthentication(App);