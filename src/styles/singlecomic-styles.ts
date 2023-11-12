import {css} from "styled-components";

export const singlecomicStyles = css`


  .single-comic {
    margin-top: 50px;
    display: grid;
    grid-template-columns: 293px 550px auto;
    column-gap: 50px;
    align-items: start;
    &__img {
      width: 293px;
      height: 450px;
    }
    &__name {
      font-weight: bold;
      font-size: 22px;
      line-height: 29px;
    }
    &__descr {
      font-size: 18px;
      line-height: 24px;
      margin-top: 25px;
    }
    &__price {
      font-weight: bold;
      font-size: 24px;
      line-height: 32px;
      color:  ${props => props.theme.colors.main};
      margin-top: 25px;
    }
    &__back {
      justify-self: end;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      &:hover {
        color:  ${props => props.theme.colors.main};
      }
    }
  }

`