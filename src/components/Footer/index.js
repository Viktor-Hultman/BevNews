import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';


const  FooterContainer = styled.div `
    background: ${props => props.theme.bg};
    padding: 1px 0 1px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: ${props => props.theme.txt};

`
const GroupName = styled.div `
    padding: 10px;
`

const Copyright = styled.div `
    padding: 10px;
`
const Socials = styled.div`
    padding: 10px;
`
const GitIcon = styled(FaGithub)`
    font-size: 3rem;
    cursor: pointer;
`
const GitLink = styled.a`
    color: inherit;
    :hover {
        border-bottom: 3px solid ${props => props.theme.btnbg};
        transition: all 0.2s ease-out;
      }
`

export const Footer = () => (
        <FooterContainer>
            <GroupName>
                <h1>BEV</h1>
            </GroupName>
            <Copyright>
                <small>Group 9 © 2021</small>
            </Copyright>
            <Socials>
                <GitLink href='https://github.com/Viktor-Hultman/fe20tp2_bev_9' target='_blank' rel="noreferrer"><GitIcon/></GitLink>
            </Socials> 
        </FooterContainer >   
)

export default Footer
