import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import { Feather } from '@expo/vector-icons';
import { Image, TouchableOpacity, Linking } from 'react-native';
import logo from '../../assets/logo.png';

import {
  Container,
  Header,
  Incident,
  IncidentProperty,
  IncidentValue,
  ContactBox,
  ContactBoxTitle,
  ContactBoxDescription,
  ContactBoxActions,
  ActionButton,
  ActionButtonText,
} from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;
  const valor = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(incident.value);
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${valor} reais`;
  function navigateBack() {
    navigation.goBack();
  }
  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }
  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }
  return (
    <Container>
      <Header>
        <Image source={logo} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </Header>
      <Incident>
        <IncidentProperty style={{ marginTop: 0 }}>ONG:</IncidentProperty>
        <IncidentValue>
          {incident.name} de {incident.city}/{incident.uf}
        </IncidentValue>

        <IncidentProperty>CASO:</IncidentProperty>
        <IncidentValue>{incident.title}</IncidentValue>

        <IncidentProperty>DESCRIÇÃO:</IncidentProperty>
        <IncidentValue>{incident.description}</IncidentValue>

        <IncidentProperty>VALOR:</IncidentProperty>
        <IncidentValue>{valor}</IncidentValue>
      </Incident>
      <ContactBox>
        <ContactBoxTitle>Salve o dia!</ContactBoxTitle>
        <ContactBoxTitle>Seja o herói desse caso.</ContactBoxTitle>

        <ContactBoxDescription>Entre em contato</ContactBoxDescription>
        <ContactBoxActions>
          <ActionButton onPress={sendWhatsapp}>
            <ActionButtonText>Whatsapp</ActionButtonText>
          </ActionButton>
          <ActionButton onPress={sendMail}>
            <ActionButtonText>E-mail</ActionButtonText>
          </ActionButton>
        </ContactBoxActions>
      </ContactBox>
    </Container>
  );
}
