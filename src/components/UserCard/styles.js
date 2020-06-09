import styled from 'styled-components';
import theme from '../../theme'

export const UserCard = styled.div`
  font-size: 14px;
  background-color: ${theme.colors.cardBackground };
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
`;

export const Body = styled.div`
  display: flex;
  align-items: center;
  transition: height ease-out .25s;
  ${ props => props.opened ? `opacity: 1; padding: 16px; height: auto;` : `opacity: 0; padding: 0; height: 0;` };
`;

export const Input = styled.input`
  border: 1px solid #fff;
  background-color: transparent;
  color: #fff;
  height: 40px;
  padding: 0 8px 0 32px;
  font-size: 14px;
  transition: box-shadow ease-out .25s;
  &:focus, &:active {
    outline: none;
    border-color: ${theme.colors.primary01};
    box-shadow: 0 0 0 2px ${theme.colors.primary01};
  }
`;
export const InputContainer = styled.div`
  position: relative;
  flex: 1;
`;

export const UDM = styled.div`
  position: absolute;
  left: 12px;
  top: 8px;
  font-size: 18px;
  color: ${ theme.colors.darkGrey };
`;

export const Button = styled.div`
  margin-left: 16px;
  appearance: none;
  height: 40px;
  padding: 0 16px;
  font-size: 14px;
  line-height: 40px;
  color: #fff;
  font-weight: 600;
  border: 2px solid #fff;
  transition: border-color ease-out .25s, color ease-out .25s;
  
  &:active {
    color: ${theme.colors.primary01 };
    border-color: ${theme.colors.primary01 };
  }
`;


export const UserInfo = styled.div`
  margin-left: 16px;
  display: flex;
  align-items: center;
  flex: 1;
`;

export const User = styled.div`
  font-size: 18px;
  font-weight: 600;
  flex: 1;
`;

export const LeftValue = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-right: 8px;
  color: ${ props => props.color };
`;

export const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  border: 1px solid ${ theme.colors.darkGrey };
  overflow: hidden;
`;

export const AvatarWithProgress = styled.div`
  width: 70px;
  height: 70px;
`;

export const DataEntry = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const Action = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    margin: 0;
  }
`;

export const History = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HistoryTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const Time = styled.div`
  font-size: 16px;
  margin-right: 16px;
  flex: 1;
`;

export const Value = styled.div`
  font-size: 16px;
  font-weight: 600;
`;