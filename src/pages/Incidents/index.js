import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native';
import logo from '../../assets/logo.png';

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
  const navigation = useNavigation();
  function navigateToDetail() {
    navigation.navigate('Detail');
  }
  return (
    <Container>
      <Header>
        <Image source={logo} />
        <HeaderText>
          Total de <HeaderTextBold>0 casos</HeaderTextBold>.
        </HeaderText>
      </Header>
      <Title>Bem vindo!</Title>
      <Description>Escolha um dos casos abaixo e salve o dia.</Description>
      <IncidentList
        data={[1, 2, 3]}
        keyExtractor={(incident) => String(incident)}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => (
          <Incident>
            <IncidentProperty>ONG:</IncidentProperty>
            <IncidentValue>APAD</IncidentValue>

            <IncidentProperty>CASO:</IncidentProperty>
            <IncidentValue>dfs fsd fsdf sd fsd</IncidentValue>

            <IncidentProperty>VALOR:</IncidentProperty>
            <IncidentValue>R$ 120,00</IncidentValue>

            <DetailsButton onPress={() => navigateToDetail()}>
              <DetailsButtonText>Detalhes</DetailsButtonText>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </DetailsButton>
          </Incident>
        )}
      />
    </Container>
  );
}
