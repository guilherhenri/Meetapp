import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdAddCircleOutline, MdCameraAlt } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

const schema = Yup.object().shape({
  file_id: Yup.number(),
  title: Yup.string(),
  description: Yup.string(),
  date: Yup.date(),
  location: Yup.string(),
});

export default function Detalhes({ match }) {
  const [meetup, setMeetup] = useState({});
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [id] = useState(match.params.id);

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`/meetups/details/${id}`);

      const data = {
        ...response.data,
        date: format(parseISO(response.data.date), "yyyy-MM-dd'T'HH:mm", {
          locale: pt,
        }),
      };

      setMeetup(data);
      setDescription(data.description);
      setFile(data.file);
    }

    loadMeetup();
  }, [id]);

  async function handleChangeFile(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    setFile(response.data);
  }

  async function handleSubmit(data) {
    try {
      if (id > 0) {
        await api.put(`/meetups/${id}`, {
          ...data,
        });

        toast.success('Meetup atualizado com sucesso.');
      } else {
        await api.post('/meetups', {
          ...data,
        });

        toast.success('Meetup cadastrado com sucesso.');
        history.push('/dashboard');
      }
    } catch (err) {
      if (id > 0) {
        toast.error('Erro ao atualizar meetup, confira os dados e a data dele!');
      } else {
        toast.error('Erro ao cadastrado meetup, confira os dados e a data dele!');
      }
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
        <label htmlFor="banner">
          {file ? (
            <img src={file.url} alt="banner" />
          ) : (
            <div>
              <MdCameraAlt color="rgba(255, 255, 255, 0.7)" size={50} />
              <strong>Selecionar imagem</strong>
            </div>
          )}

          <Input
            type="number"
            name="file_id"
            readOnly
            value={file ? file.id : ''}
          />

          <input
            type="file"
            id="banner"
            name="banner"
            onChange={handleChangeFile}
          />
        </label>

        <Input name="title" placeholder="Título do Meetup" />
        <Input
          multiline
          name="description"
          placeholder="Descrição completa"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Input type="datetime-local" name="date" />
        <Input name="location" placeholder="Localização" />

        <button type="submit">
          <MdAddCircleOutline olor="#fff" size={16} />
          Salvar meetup
        </button>
      </Form>
    </Container>
  );
}

Detalhes.propTypes = {
  match: PropTypes.object.isRequired,
};
