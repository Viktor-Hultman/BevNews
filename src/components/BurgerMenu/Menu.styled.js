import styled from 'styled-components';

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.bg};
  height: 400px;
  padding: 15px 0 0 10px;
  width: 300px;
  border-bottom-left-radius: 10px;
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
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${props => props.theme.txt};
    text-decoration: none;
    transition: color 0.2s linear;
    
    :hover {
      border-bottom: 3px solid ${props => props.theme.btnbg};
      transition: all 0.2s ease-out;
    }
    
    @media (max-width: 500px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #ede8e5;
    }
  }
`;