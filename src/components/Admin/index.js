import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { GraphButton } from '../Graphs'
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import styled from 'styled-components';
import { WebsiteBackground } from "../Home"
import { PageTitle } from "../Account";


const UsersListContainer = styled.div`
    background-color: ${props => props.theme.card};
    color: ${props => props.theme.txt};
    width: 500px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: center;
    align-content: center;
    margin: 30px 10px 30px 10px;
    border-radius: 10px;

    @media (max-width: 500px) {
        width: 310px;
        margin: 0 0 10px 0;
    }
`

const IndividualUser = styled.li`
    padding: 10px 20px 10px 20px;
    list-style: none;
    display: flex;
    flex-direction: column;
    @media (max-width: 500px) {
        max-width: 300px;
        padding: 0;
    }
`

const SubTitel = styled.h2`
    padding: 10px
`

const StyledSpan = styled.p`
    display: flex;
    flex-wrap: wrap;
    
    justify-content: center;
`

const DetailsButton = styled(GraphButton)`
    margin-top: 2px;
    margin-bottom: 5px;
    max-width: 180px;
`

const DetailsLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.txt};
    padding: 6px 0px 6px 0px;
`

const AdminPage = () => (
    <WebsiteBackground>
        <PageTitle>Admin</PageTitle>
        <p>The Admin Page is accessible by every signed in admin user.</p>

        <Switch>
            <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
            <Route exact path={ROUTES.ADMIN} component={UserList} />
        </Switch>

    </WebsiteBackground>
);

class UserListBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: [],
        };
    }
    componentDidMount() {
        this.setState({ loading: true });
        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            this.setState({
                users: usersList,
                loading: false,
            });
        });

    }
    componentWillUnmount() {
        this.props.firebase.users().off();
    }



    render() {
        const { users, loading } = this.state;

        return (
            <UsersListContainer>
                <SubTitel>Users</SubTitel>
                {loading && <div>Loading ...</div>}
                <ul>
                    {users.map(user => (
                        <IndividualUser key={user.uid}>
                            <StyledSpan>
                                <strong>ID: </strong> {user.uid}
                            </StyledSpan>
                            <StyledSpan>
                                <strong>E-Mail: </strong> {user.email}
                            </StyledSpan>
                            <StyledSpan>
                                <strong>Username: </strong> {user.username} 
                            </StyledSpan>
                            <StyledSpan>
                                <strong>Admin:
                                    {(user.roles && 
                                         ' Yes'
                                    ) || ' No'} 
                                </strong>
                            </StyledSpan>
                            <StyledSpan>
                                <DetailsButton >
                                    <DetailsLink
                                        to={{
                                            pathname: `${ROUTES.ADMIN}/${user.uid}`,
                                            state: { user },
                                        }}
                                    >
                                        Details
                                    </DetailsLink>
                                </DetailsButton>
                            </StyledSpan>
                        </IndividualUser>
                    ))}
                </ul>
            </UsersListContainer>
        );

    }
}

class UserItemBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: null,
            ...props.location.state,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (this.state.user) {
            return;
        }

        this.setState({ loading: true });

        this.props.firebase
            .user(this.props.match.params.id)
            .on('value', snapshot => {
                this.setState({
                    user: snapshot.val(),
                    loading: false,

                });

            });

    }
    componentWillUnmount() {
        this.props.firebase.user(this.props.match.params.id).off();
    }

    onSendPasswordResetEmail = () => {
        this.props.firebase.doPasswordReset(this.state.user.email);
    };

    //This function gives the selected user admin privilages
    handleClick() {
        this.props.firebase.user(this.props.match.params.id)
            .child('roles')
            .set({ ADMIN: 'ADMIN' })
    }

    render() {
        const { user, loading } = this.state;

        return (
            <UsersListContainer>
                {loading && <div>Loading ...</div>}
                {user && (
                    <IndividualUser>
                        <StyledSpan>
                            <strong>ID:</strong> {user.uid}
                        </StyledSpan>
                        <StyledSpan>
                            <strong>E-Mail:</strong> {user.email}
                        </StyledSpan>
                        <StyledSpan>
                            <strong>Username:</strong> {user.username}
                        </StyledSpan>
                        <StyledSpan>
                            <DetailsButton
                                type="button"
                                onClick={this.onSendPasswordResetEmail}
                            >
                                Send Password Reset
                            </DetailsButton>
                        </StyledSpan>
                        <StyledSpan>
                            <DetailsButton onClick={this.handleClick}>
                                Make admin
                            </DetailsButton>
                        </StyledSpan>
                        
                    </IndividualUser>
                )}
            </UsersListContainer>
        );
    }
}


const condition = authUser =>
    authUser && !!authUser.roles[ROLES.ADMIN];

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

export default withAuthorization(condition)(withFirebase(AdminPage));
