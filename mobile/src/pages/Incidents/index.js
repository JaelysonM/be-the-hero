import React, {useEffect,useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {View,Image,Text, TouchableOpacity,FlatList} from 'react-native';

import logoImg from '../../assets/logo.png';

import styles from './styles';

import api from '../../services/api';

export default function Incidents() {

  const [incidents,setIncidents] = useState([]);
  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(false);
  const [refreshing,setRefreshing] = useState(false);
  const navigation = useNavigation();
  async function handleRefresh() {   
    if (loading) {
      return;
    }
    if (refreshing) {
      return;
    }
    setLoading(true);
    setRefreshing(true);
    const response = await api.get(`incidents`, {
    params: {
      page: 1
    }
   });
   
    setIncidents(response.data);
    setTotal(response.headers['x-total-count']); 
    setLoading(false);
    setRefreshing(false);
    setPage(2);
  }
  async function loadData() {   
    if (loading) {
      return;
    }
    if (total > 0 && incidents.length == total) {
      return;
    }
    setLoading(true);
    const response = await api.get(`incidents`, {
    params: {
      page
    }
    });
    setIncidents([...incidents,...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page+1);
    setLoading(false);
  }
  useEffect(() => {
    setPage(1);
    loadData();
  }
  ,[]);
  function navigationToDetail(incident) {
    navigation.navigate('Detail',{incident})
  }
  return (
    <View style={styles.container}>
       <View style={styles.header}>
         <Image source={logoImg}/>
         <Text style={styles.headerText}>
           Total de <Text style={styles.headerTextBold}>{total} {total > 1 || total==0? "casos":"caso"}</Text>
         </Text>
        </View>  
        <Text style={styles.title}>
          Bem-vindo!
        </Text>
        <Text style={styles.description}>
          Escolha um dos casos abaixo e salve o dia.
        </Text>
      <FlatList 
      data={incidents} 
      style={styles.incidentList}
      keyExtractor={incident => String(incident.id)}
      showsVerticalScrollIndicator={false}
      onEndReached={loadData}
      onEndReachedThreshold={0.2}
      onRefresh={handleRefresh}
      refreshing={refreshing}
      renderItem={({item: incident}) => (
     <View style={styles.incidentList}>
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
      <Text style={styles.incidentValue}>{incident.name}</Text>
            <Text style={styles.incidentProprety}>CASO:</Text>
      <Text style={styles.incidentValue}>{incident.title}</Text>           
            <Text style={styles.incidentProprety}>VALOR:</Text>
      <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency',currency:'BRL'}).format(incident.value)}</Text>
            <TouchableOpacity style={styles.detailsButton} onPress={() =>  navigationToDetail(incident)}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color='#e02041'/>
            </TouchableOpacity>
          </View>
        </View>
      )}/>
      </View>
  );
}