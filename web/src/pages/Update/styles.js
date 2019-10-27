import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  @media (max-width: 950px) {
    padding: 0 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      cursor: pointer;
      padding: 0;
      width: 100%;
      margin-bottom: 30px;

      &:hover {
        opacity: 0.7;
      }

      img {
        width: 100%;
        border-radius: 4px;
      }

      input {
        display: none;
      }

      div {
        min-height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #18161f;
        color: rgba(255, 255, 255, 0.7);

        svg {
          margin-bottom: 10px;
        }
      }
    }

    input {
      background: rgba(0, 0, 0, 0.3);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    input[type='datetime-local'] {
      appearance: none;
      -webkit-appearance: none;
      font-size: 16px;
      background: rgba(0, 0, 0, 0.3);
      display: inline-block !important;
      visibility: visible !important;

      &:focus {
        box-shadow: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
      }

      &::-webkit-clear-button,
      &::-webkit-inner-spin-button {
        display: none;
      }

      &::-webkit-calendar-picker-indicator {
        color: #f84c69;
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    textarea {
      text-align: top;
      padding: 15px !important;
      background: rgba(0, 0, 0, 0.3);
      border: 0;
      border-radius: 4px;
      min-height: 200px;
      max-width: 100%;
      min-width: 100%;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #fff;
      align-self: center;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: flex-end;
      margin: 5px 0 0;
      height: 44px;
      width: 150px;
      background: #f84c69;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#f84c69')};
      }

      svg {
        margin-right: 7px;
      }
    }
  }
`;
