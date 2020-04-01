import React from 'react';
import {Feather, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation,useRoute} from '@react-navigation/native';
import {Image,Linking,FlatList} from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import {Container,Header, ButtonTouch,Incident,IncidentValue,IncidentProperty,HeroTitle,HeroDescription,ContactBox,Actions,ActionTouch,ActionText} from './styles';

import logoImg from '../../assets/logo.png';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;

  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency',currency:'BRL'}).format(incident.value)}`
  function navigateBack() {
    navigation.goBack();
  }
  function sendMail() {
     MailComposer.composeAsync({
       subject: `Herói do caso: ${incident.title}`,
       recipients: [incident.email],
       body: message
     });
  }

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=+55${incident.whatsapp}&text=${message}`)
  }
  return (

   <Container>
        <Header>
           <Image source={logoImg}/>
              <ButtonTouch onPress={navigateBack}>
               <Feather name="arrow-left" size={28} color={"#e82041"}></Feather>
             </ButtonTouch>
        </Header> 
        <FlatList 
      data={[1]}
      keyExtractor={incident => String(incident.id)}
      showsVerticalScrollIndicator={false}
      renderItem={() => (
        <>
        <Incident>     
            <IncidentProperty style={{ marginTop: 0}}>ONG:</IncidentProperty>
            <IncidentValue>{incident.name}</IncidentValue>

            <IncidentProperty>CASO:</IncidentProperty>
            <IncidentValue>{incident.title}</IncidentValue>

            <IncidentProperty>DECRIÇÃO:</IncidentProperty>
            <IncidentValue>{incident.description}{incident.description}</IncidentValue>

            <IncidentProperty>VALOR:</IncidentProperty>
            <IncidentValue style={{ marginBottom: 0}}>{Intl.NumberFormat('pt-BR', {style: 'currency',currency:'BRL'}).format(incident.value)}</IncidentValue>         
          </Incident> 

          <ContactBox>
             <HeroTitle>Salve o dia!</HeroTitle>
             <HeroTitle>Seja o herói desse caso.</HeroTitle>
             <HeroDescription>Entre em contato:</HeroDescription>
             <Actions>
               <ActionTouch onPress={sendWhatsApp}>
                  <FontAwesome style={{ marginRight: 8,marginTop: 2}} name="whatsapp"size={16} color="#fff"/>
                   <ActionText >WhatsApp</ActionText>
                  
               </ActionTouch>              
               <ActionTouch onPress={sendMail}>
                 <MaterialCommunityIcons name="email" size={16} color="#fff" style={{marginRight: 8, marginTop: 2}}/>
                    <ActionText>E-mail</ActionText>
               </ActionTouch>
             </Actions>
          </ContactBox>
          </>
      )}/>
   </Container>
  );
}