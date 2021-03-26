import styled from 'styled-components';

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: grey;
  height: 50vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateY(0)' : 'translateY(-100%)'};
  
  @media (max-width: 500px) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #b8b6b5;
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