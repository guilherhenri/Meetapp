import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdModeEdit, MdDeleteForever, MdPlace } from 'react-icons/md';
import { IoMdCalendar } from 'react-icons/io';
import api from '~/services/api';
import history from '~/services/history';

import { Container, MeetupView } from './styles';

export default function Detalhes({ match }) {
  const [meetup, setMeetup] = useState({});
  const [organizer, setOrganizer] = useState({});
  const [file, setFile] = useState({});
  const [id] = useState(match.params.id);

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`/meetups/details/${id}`);

      const data = {
        ...response.data,
        dateFormated: format(
          parseISO(response.data.date),
          "d 'de' MMMM', ás 'HH'h'",
          {
            locale: pt,
          }
        ),
      };

      setMeetup(data);
      setFile(data.file);
      setOrganizer(data.organizer);
    }

    loadMeetup();
  }, [id]);

  async function handleCalceMeetup() {
    try {
      await api.delete(`/meetups/${id}`);

      toast.success('Meetup cancelado com sucesso.');
      history.push('/dashboard');
    } catch (err) {
      toast.error('Erro ao cancelar meetup, confira a data dele!');
    }
  }

  return (
    <Container>
      <header>
        <strong>{meetup.title}</strong>
        <div>
          <Link to={`/meetup/update/${id}`}>
            <MdModeEdit color="#fff" size={16} />
            Editar
          </Link>
          <button type="button" onClick={() => handleCalceMeetup()}>
            <MdDeleteForever color="#fff" size={16} />
            Cancelar
          </button>
        </div>
      </header>
      <MeetupView>
        <img src={file.url} alt={file.name} />
        <p>{meetup.description}</p>
        <p>
          Caso queira participar como palestrante do meetup envie um e-mail para
          organização: {organizer.email}
        </p>
        <div>
          <div>
            <IoMdCalendar color="#aca5ae" size={16} />
            <span>{meetup.dateFormated}</span>
          </div>
          <div>
            <MdPlace color="#aca5ae" size={16} />
            <span>{meetup.location}</span>
          </div>
        </div>
      </MeetupView>
    </Container>
  );
}

Detalhes.propTypes = {
  match: PropTypes.any,
};
