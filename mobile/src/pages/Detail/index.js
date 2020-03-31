import React from 'react';
import {Feather, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation,useRoute} from '@react-navigation/native';
import {View,Text,TouchableOpacity,Image,Linking,FlatList} from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

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
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }
  return (
   <View style={styles.container}>
       <View style={styles.header}>
         <Image source={logoImg}/>
         <TouchableOpacity onPress={navigateBack}>
           <Feather name="arrow-left" size={28} color={"#e82041"}></Feather>
         </TouchableOpacity>
        </View> 

        <FlatList 
      data={[1]}
      style={styles.incidentList}
      keyExtractor={incident => String(incident.id)}
      showsVerticalScrollIndicator={false}
      renderItem={() => (
        <View>
        <View style={styles.incident}>     
        <Text style={[styles.incidentProperty, { marginTop: 0}]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name}</Text>
            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>  
            <Text style={styles.incidentProperty}>DECRIÇÃO:</Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>             
            <Text style={styles.incidentProperty}>VALOR:</Text>          
            <Text style={[styles.incidentValue, { marginBottom: 0}]}>{Intl.NumberFormat('pt-BR', {style: 'currency',currency:'BRL'}).format(incident.value)}</Text>              
          </View> 
          <View style={styles.contactBox}>
             <Text style={styles.heroTitle}>Salve o dia!</Text>
             <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
             <Text style={styles.heroDescription}>Entre em contato:</Text>
             <View style={styles.actions}>
               <TouchableOpacity 
               style={styles.action}
               onPress={sendWhatsApp}>
                  <FontAwesome style={
                {
                marginRight: 8,
                marginTop: 2
                }
              } name="whatsapp"size={16} color="#fff"/>
                   <Text style={styles.actionText}>WhatsApp</Text>
                  
               </TouchableOpacity>              
               <TouchableOpacity 
               style={styles.action}
               onPress={sendMail}>
                 <MaterialCommunityIcons name="email" size={16} color="#fff"
                  style={
                    {
                    marginRight: 8,
                    marginTop: 2
                  }
                  }/>
                 <Text style={styles.actionText}>E-mail</Text>
               </TouchableOpacity>
             </View>
          </View>
          </View>
      )}/>
    
   </View>
  );
}