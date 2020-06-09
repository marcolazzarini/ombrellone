import styled from 'styled-components';
import theme from '../../theme'

export const AppContainer = styled.div`
  height: 100%;
  overflow-x: hidden;
  background-color: ${ theme.colors.background };
  color: #fff;
  
  h1 {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
  }
`;