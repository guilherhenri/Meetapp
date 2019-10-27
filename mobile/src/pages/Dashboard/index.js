import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Header from '~/components/Header';
import Background from '~/components/Background';
import DateMenu from '~/components/DateMenu';
import Meetup from '~/components/Meetup';

import { Container, ActivityIndicator, List } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [confDate, setConfDate] = useState(null);
  const [page, setPage] = useState(1);
  const [meetups, setMeetups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetups() {
      if (refreshing || date !== confDate) {
        setLoading(true);

        const response = await api.get('/meetups', {
          params: { date, page: 1 },
        });

        setMeetups(response.data.rows);
        setConfDate(date);
        setRefreshing(false);
        setPage(1);
      } else if (page !== 1) {
        const response = await api.get('/meetups', {
          params: { date, page },
        });

        if (response.data.rows) {
          setMeetups([...meetups, ...response.data.rows]);
        }
      }

      setLoading(false);
    }

    loadMeetups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, page, refreshing]);

  function handleLoadMore() {
    setPage(page + 1);
  }

  function handleRefreshList() {
    setRefreshing(true);
  }

  async function handleSubscription(id) {
    try {
      await api.post(`/subscriptions/${id}`);

      Alert.alert(
        'Sucesso!',
        'Inscrição realizada com sucesso. Visualizea na página de inscrições.'
      );
    } catch (err) {
      Alert.alert(
        'Falha na inscrição!',
        'Houve um erro na sua inscrição. Verifique a data do meetup.'
      );
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateMenu date={date} onChange={setDate} onPage={setPage} />

        {loading ? (
          <ActivityIndicator size="large" color="#f84c69" />
        ) : (
          <List
            data={meetups}
            onEndReachedThreshold={0.2}
            onEndReached={handleLoadMore}
            onRefresh={handleRefreshList}
            refreshing={refreshing}
            keyExtractor={item => String(item.id + item.title)}
            renderItem={({ item }) => (
              <Meetup
                data={item}
                onFunction={handleSubscription}
                textButton="Realizar inscrição"
                id={item.id}
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
