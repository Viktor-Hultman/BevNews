import React, {useContext} from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';


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

        <div>
            <h1>Account: {email}</h1>
            <PasswordForgetForm />
            <PasswordChangeForm />
        </div>
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);