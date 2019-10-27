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

      input {
        color: #95a5a6;
        height: 35px;
        max-width: 150px;
        border-radius: 4px;
        border: 0;
        margin-right: 20px;
        padding: 7px 10px;

        appearance: none;
        -webkit-appearance: none;
        font-size: 16px;
        background: #ecf0f1;
        display: inline-block !important;
        visibility: visible !important;

        @media (max-width: 330px) {
          margin-bottom: 20px;
          margin-right: 0;
        }

        &:focus {
          box-shadow: none;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          border: 1px solid #f84c69;
        }

        &::-webkit-clear-button,
        &::-webkit-inner-spin-button {
          display: none;
        }

        &::-webkit-calendar-picker-indicator {
          color: #f84c69;
        }
      }

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 37px;
        width: 130px;
        background: #f84c69;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        transition: background 0.2s;

        @media (max-width: 330px) {
          width: 150px;
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

  ul {
    margin-top: 30px;
  }
`;

export const Time = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);

  @media (max-width: 540px) {
    flex-direction: column;
    padding: 20px 0;
  }

  strong {
    color: #fff;
    font-size: 20px;
    font-weight: bold;

    @media (max-width: 540px) {
      margin-bottom: 20px;
    }
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    time {
      margin-right: 30px;
      color: #666;

      @media (max-width: 540px) {
        margin-right: 5px;
      }
    }

    svg {
      padding-top: 3px;
    }

    a:hover {
      svg {
        color: #f84c69 !important;
      }
    }
  }

  li + & {
    margin-top: 20px;
  }
`;

export const Paginacao = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  div {
    display: flex;
    margin: 0 30px;
    flex-direction: row;

    button + button {
      margin-left: 10px;
    }
  }
`;

export const ButtonPage = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 37px;
  width: 40px;
  background: #f84c69;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #fff;
    color: #f84c69;
    border: 1px solid #f84c69;
  }

  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    pointer-events: none;
    background: #22202c;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 37px;
  width: 60px;
  background: #f84c69;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  transition: background 0.2s;

  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  }

  &:hover {
    background: ${darken(0.05, '#f84c69')};
  }
`;
