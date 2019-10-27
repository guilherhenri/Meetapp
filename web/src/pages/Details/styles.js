import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  @media (max-width: 950px) {
    padding: 0 30px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 540px) {
      flex-direction: column;
      justify-content: center;
    }

    strong {
      color: #fff;
      font-size: 24px;

      @media (max-width: 540px) {
        margin-bottom: 20px;
      }
    }

    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      @media (max-width: 330px) {
        flex-direction: column;
      }

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 37px;
        width: 90px;
        background: #4dbaf9;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        transition: background 0.2s;

        @media (max-width: 330px) {
          margin-bottom: 20px;
          width: 110px;
        }

        svg {
          margin-right: 7px;
        }

        &:hover {
          background: ${darken(0.08, '#4dbaf9')};
        }
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 37px;
        width: 110px;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        background: #f84c69;
        transition: background 0.2s;
        margin-left: 20px;

        @media (max-width: 330px) {
          margin-left: 0;
        }

        svg {
          margin-right: 7px;
        }

        &:hover {
          background: ${darken(0.05, '#f84c69')};
        }
      }
    }
  }
`;

export const MeetupView = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  img {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  p {
    color: #fff;
    font-size: 15px;
  }

  p + p {
    margin-top: 30px;
  }

  div {
    display: flex;
    flex-direction: row;
    margin-top: 15px;

    div {
      color: #aca5ae;

      svg {
        margin-right: 7px;
      }
    }

    div + div {
      margin-left: 25px;
    }
  }
`;
