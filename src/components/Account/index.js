import React, { useContext } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { SignUpContainter } from '../SignUp';
import ThemeProviderHook, { OuterColorTheme } from '../ThemeProvider';
import styled, { ThemeProvider } from 'styled-components';

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
        <>
            {/* The themeprovider links themes to all components inside of it */}
            {/* Both the ThemeProviderHook and the ThemeProvider is needed */}
            <ThemeProviderHook />
            <ThemeProvider theme={OuterColorTheme}>

                <AccountContainer>
                    <h2>Account: {email}</h2>
                    <PasswordForgetForm />
                    <PasswordChangeForm />
                </AccountContainer>
            </ThemeProvider>
        </>
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);