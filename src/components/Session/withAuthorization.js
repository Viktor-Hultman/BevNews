import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {

    const WithAuthorization = (props) => {
        const authUser = useContext(AuthUserContext);
        const { history, firebase } = props;
        
        useEffect(() => {
            const listener = firebase.onAuthUserListener(
                authUser => {
                    if (!condition(authUser)) {
                        history.push(ROUTES.LANDING);
                    }
                },
                () => history.push(ROUTES.LANDING),
            );
            return () => {
                listener()
            };
// eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        return (
            condition(authUser) ? <Component {...props} /> : null
        );

    }
    return withRouter(withFirebase(WithAuthorization));

    // class WithAuthorization extends React.Component {
    //     componentDidMount() {
    //         this.listener = this.props.firebase.onAuthUserListener(
    //             authUser => {
    //                 if (!condition(authUser)) {
    //                     this.props.history.push(ROUTES.SIGN_IN);
    //                 }
    //             },
    //             () => this.props.history.push(ROUTES.SIGN_IN),
    //         );
    //     }

    //     componentWillUnmount() {
    //         this.listener();
    //     }

    //     render() {
    //         return (
    //             <AuthUserContext.Consumer>
    //                 {authUser =>
    //                     condition(authUser) ? <Component {...this.props} /> : null
    //                 }
    //             </AuthUserContext.Consumer>
    //         );
    //     }
    // }



};

export default withAuthorization;