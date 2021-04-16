import styled from 'styled-components';

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: ${props => props.theme.bg};
  height: 400px;
  padding: 0 10px 0 10px;
  
  text-align: left;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateY(0)' : 'translateY(-130%)'};
  
  @media (max-width: 500px) {
    width: 100%;
  }
  @media (min-width: 769px){
    display: none;
  }
  a {
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${props => props.theme.txt};
    text-decoration: none;
    transition: color 0.2s linear;
    
    @media (max-width: 500px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #ede8e5;
    }
  }
`;