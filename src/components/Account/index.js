import React, { useContext } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { ChoosenWordsCard } from '../SearchWordForm';
import ThemeProviderHook, { OuterColorTheme } from '../ThemeProvider';
import styled, { ThemeProvider } from 'styled-components';
import {WebsiteBackground} from "../Home"

const AccountContainer = styled(ChoosenWordsCard)`
`

export const PageTitle = styled.h1`
    margin-bottom: 15px;
`

const AccountPage = () => {
    const { email } = useContext(AuthUserContext);

    return (
        <WebsiteBackground>

            <PageTitle>Account</PageTitle>
            <AccountContainer>
                <h2>{email}</h2>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </AccountContainer>

        </WebsiteBackground>
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);