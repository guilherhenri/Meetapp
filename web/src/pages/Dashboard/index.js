import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import roundTo from 'round-to';
import pt from 'date-fns/locale/pt';
import { Link } from 'react-router-dom';

import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, Time, Paginacao, Button, ButtonPage } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  function handleChangePage(num) {
    setPage(num + 1);
  }

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get('/meetups', {
        params: { date, page },
      });

      const data = response.data.rows.map(meetup => {
        const dateFormated = format(
          parseISO(meetup.date),
          "d 'de' MMMM', ás 'HH'h'",
          {
            locale: pt,
          }
        );

        return {
          ...meetup,
          dateFormated,
        };
      });

      const numberOfPages = roundTo.up(
        response.data.count / response.data.limit,
        0
      );
      const itemsButton = [];

      for (let i = 0; i < numberOfPages; i++) {
        itemsButton.push(
          <ButtonPage
            key={i}
            disabled={i + 1 === page}
            onClick={() => handleChangePage(i)}
          >
            {i + 1}
          </ButtonPage>
        );
      }

      setMeetups(data);
      setItems(itemsButton);
      setCount(numberOfPages);
    }

    loadMeetup();
  }, [date, page]);

  function handleChangeData(e) {
    const newDate = e.target.value;

    setDate(newDate);
  }

  function handleAntProx(num) {
    const val = page + num;
    if (val > 0 && val <= count) {
      setPage(val);
    }
  }

  return (
    <Container>
      <header>
        <strong>Meus meetups</strong>
        <div>
          <input type="date" onChange={handleChangeData} />
          <Link to="/meetup/create">
            <MdAddCircleOutline color="#fff" size={16} />
            Novo meetup
          </Link>
        </div>
      </header>

      <ul>
        {meetups.map(meetup => (
          <Time key={meetup.id.toString()}>
            <strong>{meetup.title}</strong>
            <div>
              <time>{meetup.dateFormated}</time>
              <Link to={`/meetup/details/${meetup.id}`}>
                <MdChevronRight color="#fff" size={24} />
              </Link>
            </div>
          </Time>
        ))}
      </ul>

      <Paginacao>
        <Button disabled={page === 1} onClick={() => handleAntProx(-1)}>
          Ant
        </Button>
        <div>{items}</div>
        <Button disabled={page === count} onClick={() => handleAntProx(1)}>
          Prox
        </Button>
      </Paginacao>
    </Container>
  );
}
