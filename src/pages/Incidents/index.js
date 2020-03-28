import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native';
import logo from '../../assets/logo.png';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderText,
  HeaderTextBold,
  Title,
  Description,
  IncidentList,
  Incident,
  IncidentProperty,
  IncidentValue,
  DetailsButton,
  DetailsButtonText,
} from './styles';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }
  async function loadIncidents() {
    if (loading) {
      return;
    }
    if (total > 0 && total === incidents.length) {
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`incidents?page=${page}`);
      setIncidents([...incidents, ...response.data]);
      setTotal(response.headers['x-total-count']);
      setPage(page + 1);
    } catch (e) {}
    setLoading(false);
  }
  useEffect(() => {
    loadIncidents();
  }, []);
  return (
    <Container>
      <Header>
        <Image source={logo} />
        <HeaderText>
          Total de <HeaderTextBold>{total} casos</HeaderTextBold>.
        </HeaderText>
      </Header>
      <Title>Bem vindo!</Title>
      <Description>Escolha um dos casos abaixo e salve o dia.</Description>
      <IncidentList
        data={incidents}
        keyExtractor={(incident) => String(incident.id)}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <Incident>
            <IncidentProperty style={{ marginTop: 0 }}>ONG:</IncidentProperty>
            <IncidentValue>{incident.name}</IncidentValue>

            <IncidentProperty>CASO:</IncidentProperty>
            <IncidentValue>{incident.title}</IncidentValue>

            <IncidentProperty>VALOR:</IncidentProperty>
            <IncidentValue>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </IncidentValue>

            <DetailsButton onPress={() => navigateToDetail(incident)}>
              <DetailsButtonText>Detalhes</DetailsButtonText>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </DetailsButton>
          </Incident>
        )}
      />
    </Container>
  );
}
