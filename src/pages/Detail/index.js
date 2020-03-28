import React from 'react';
import { useNavigation } from '@react-navigation/native';
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
  const message =
    'Olá DFDF, estou entrando em contato pois gostaria de ajudar no caso "Cadelinha atropelada" com o valor de 120 reais';
  function navigateBack() {
    navigation.goBack();
  }
  function sendMail() {
    MailComposer.composeAsync({
      subject: 'Herói do caso: fsdfsdf',
      recipients: ['dfsdfsd@dsfd,com'],
      body: message,
    });
  }
  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=5599999999&text=${message}`);
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
        <IncidentProperty>ONG:</IncidentProperty>
        <IncidentValue>APAD</IncidentValue>

        <IncidentProperty>CASO:</IncidentProperty>
        <IncidentValue>dfs fsd fsdf sd fsd</IncidentValue>

        <IncidentProperty>VALOR:</IncidentProperty>
        <IncidentValue>R$ 120,00</IncidentValue>
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
