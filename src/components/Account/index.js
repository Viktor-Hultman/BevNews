import React, { useContext } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { ChoosenWordsCard } from '../SearchWordForm';
import ThemeProviderHook, { OuterColorTheme } from '../ThemeProvider';
import styled, { ThemeProvider } from 'styled-components';
import {WebsiteBackground} from "../Home"
import {SubTitel} from "../Admin"

const AccountContainer = styled(ChoosenWordsCard)`
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: 320px) {
        width: 10px;
    }

    @media (min-width: 320px) {
        width: 300px;
    }

    @media (min-width: 500px) {
        height: 200px;
        width: 400px;
    }

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
                <SubTitel>{email}</SubTitel>
                <PasswordChangeForm />
            </AccountContainer>

        </WebsiteBackground>
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);