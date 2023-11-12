import {css} from "styled-components";

export const randomcharStyles = css`
  
  .randomchar {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);

    &__block {
      padding: 40px 35px;
      display: grid;
      grid-template-columns: 180px auto;
      column-gap: 30px;
    }

    &__img {
      width: 180px;
      height: 180px;
      object-fit: cover;
    }

    &__info {
      display: grid;
      grid-template-rows: minmax(29px, auto) 90px 38px;
      row-gap: 10px;
      padding-top: 3px;
    }

    &__name {
      font-weight: bold;
      font-size: 22px;
      line-height: 29px;
      text-transform: uppercase;
    }

    &__descr {
      font-size: 14px;
      line-height: 18px;
    }

    &__btns {
      a:nth-child(1) {
        margin-right: 30px;
      }
    }

    &__static {
      padding: 40px 35px;
      background-color: ${props => props.theme.colors.dark};
      position: relative;

      button {
        margin-top: 13px;
      }
    }

    &__title {
      font-weight: bold;
      font-size: 24px;
      line-height: 32px;
      letter-spacing: -0.045em;
      color: #FFFFFF;

      &:nth-child(2) {
        margin-top: 33px;
      }
    }

    &__decoration {
      position: absolute;
      bottom: 14px;
      right: -37px;
    }
  }



`