import styled from 'styled-components';
import Constants from 'expo-constants';



export const Container = styled.View`
     flex: 1;
     padding: 0 24px;
     padding-top: ${Constants.statusBarHeight+ 20}px;
     background-color: #f0f0f5;
`
export const Header = styled.View`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
`
export const ButtonTouch = styled.TouchableOpacity`
     flex-direction: row;
     justify-content: space-between;
     align-items: center;
`
export const IncidentProperty = styled.Text`
     font-size: 14px;
     color: #41414d;
     font-weight: bold;
     margin-top: 0px;
`
export const IncidentValue = styled.Text`
     margin-top: 8px;
     font-size: 15px;
     margin-bottom: 24px;
     color: #737380;
`
export const Incident = styled.View`
     padding: 24px;
     border-radius: 8px;
     background-color: #FFF;
     margin-bottom: 16px;
     margin-top: 8px;
`

export const ContactBox = styled.View`
     padding: 24px;
     border-radius: 8px;
     background-color: #FFF;
     margin-bottom: 16px;
`

export const HeroTitle = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color: #13131a;
    line-height: 30px;
`

export const HeroDescription = styled.Text`
    margin-top:16px;
    font-size: 15px;
    color: #737380;
`

export const Actions = styled.View`
     margin-top: 16px;
     flex-direction: row;
     justify-content: space-between;
`
export const ActionTouch = styled.TouchableOpacity`
     background-color: #e02041;
     border-radius: 8px;
     height: 50px;
     width: 48%;
     justify-content: center;
     align-items: center;
     flex-direction: row;
`
export const ActionText = styled.Text`
      color: #FFF;
      font-size: 15px;
      font-weight: bold;
`