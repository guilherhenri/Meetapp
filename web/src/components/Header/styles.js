import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #18161f;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 300px) {
    flex-direction: column;
    height: 100px;
    padding: 10px 0;
  }

  nav {
    display: flex;
    align-items: center;
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    margin-right: 25px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  button {
    width: 60px;
    border-radius: 4px;
    text-align: center;
    background: #f84c69;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.05, '#f84c69')};
    }
  }
`;
