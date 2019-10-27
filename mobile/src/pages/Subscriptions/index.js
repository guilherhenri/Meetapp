import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Header from '~/components/Header';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import { Container, ActivityIndicator, List } from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    async function loadSubscriptions() {
      if (refreshing || isFocused) {
        setLoading(true);

        const response = await api.get('/subscriptions');

        setSubscriptions(response.data);
      }

      setLoading(false);
      setRefreshing(false);
    }

    loadSubscriptions();
  }, [refreshing, isFocused]);

  async function handleCancelable(id) {
    try {
      await api.delete(`/subscriptions/${id}`);

      setRefreshing(true);

      Alert.alert('Sucesso!', 'Inscrição cancelada com sucesso.');
    } catch (err) {
      Alert.alert(
        'Falha no cancelamento!',
        'Houve um erro ao cancelar sua inscrição. Verifique a data do meetup.'
      );
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        {loading ? (
          <ActivityIndicator size="large" color="#f84c69" />
        ) : (
          <List
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                data={item.Meetup}
                onFunction={handleCancelable}
                textButton="Cancelar inscrição"
                id={item.id}
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool,
};

export default withNavigationFocus(Subscriptions);
