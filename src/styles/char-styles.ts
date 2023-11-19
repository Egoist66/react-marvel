import {css} from "styled-components";

export const charStyles = css`


  .char {
    &__info {
      padding: 25px;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
      position: sticky;
      top: 15px;
      z-index: 5;
      background-color: #fff;

      &-name {
        font-weight: bold;
        font-size: 22px;
        line-height: 29px;
        text-transform: uppercase;
      }

      .skeleton {
        margin-top: 30px;
      }
    }

    &__basics {
      display: grid;
      grid-template-columns: 150px auto;
      column-gap: 25px;

      img {
        width: 150px;
        height: 150px;
        object-fit: cover;
      }
    }

    &__btns {
      margin-top: 35px;

      a:nth-child(2) {
        margin-top: 10px;
      }
    }

    &__descr {
      margin-top: 15px;
      font-size: 14px;
      line-height: 18px;
    }

    &__comics {
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      margin-top: 10px;

      &-list {
        position: relative;
        margin-top: 10px;
      }

      &-item {
        width: 100%;
        padding: 0px 10px;
        line-height: 25px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        margin-top: 10px;
      }
    }

    &__select {
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      text-align: center;
    }

  }
  
  
  .char {
    &__content {
      margin-top: 50px;
      display: grid;
      position: relative;
      grid-template-columns: 650px 425px;
      column-gap: 25px;
      align-items: start;
    }
    &__grid {
      display: grid;
      grid-template-columns: repeat(3, 200px);
      column-gap: 25px;
      row-gap: 30px;
    }
    &__item {
      width: 200px;
      height: 318px;
      background-color:  ${props => props.theme.colors.dark};
      box-shadow: 5px 5px 10px rgba(0, 0, 0, .25);
      padding: 15px;
      cursor: pointer;
      transition: 0.3s transform;
      img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        transform: translate(-15px, -15px);
      }
      &_selected {
        box-shadow: 0 5px 20px  ${props => props.theme.colors.main};
        transform: translateY(-8px);
      }
    }
    &__name {
      font-weight: bold;
      font-size: 22px;
      line-height: 29px;
      text-transform: uppercase;
      color: #fff;
    }
  }

  .char__btns {
    display: flex;
    flex-direction: column;
  }

  .comics {
    &__list {
      margin-top: 45px;
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, 225px);
      justify-content: space-between;
      row-gap: 55px;
    }

    &__item {
      transition: 0.3s transform;

      &-img {
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
        width: 225px;
        height: 345px;
      }

      &-name {
        margin-top: 10px;
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
      }

      &-price {
        margin-top: 5px;
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        color: rgba(0, 0, 0, 0.6);
        text-transform: uppercase;
      }

      &:hover {
        transform: translateY(-5px);
      }
    }
  }



`