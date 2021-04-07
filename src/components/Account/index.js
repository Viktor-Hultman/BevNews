import React, {useContext} from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import {SignUpContainter} from '../SignUp';
import styled from 'styled-components';

const AccountContainer = styled(SignUpContainter)`
`


// const OldAccountPage = () => (
//     <AuthUserContext.Consumer>
//         {authUser => (
//             <div>
//                 <h1>Account: {authUser.email}</h1>
//                 <PasswordForgetForm />
//                 <PasswordChangeForm />
//             </div>
//         )}
//     </AuthUserContext.Consumer>
// );

//This hook works the same way as the one above, 
// only this could be more easely read.
const AccountPage = () => {
    const { email } = useContext(AuthUserContext);

    return (

        <AccountContainer>
            <h2>Account: {email}</h2>
            <PasswordForgetForm />
            <PasswordChangeForm />
        </AccountContainer>
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);