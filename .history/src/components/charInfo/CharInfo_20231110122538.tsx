import thor from "../../assets/images/thor.jpeg";
import styled from "styled-components";
import { FC, PureComponent } from "react";
import { RandomCharState } from "../randomChar/RandomChar";
import { m_service } from "../../services/mservice-api";

const StyledCharInfo = styled.div``;

type CharInfoProps = {
  charId: number | null;
};

class CharInfo extends PureComponent<CharInfoProps, any> {
  state: Readonly<RandomCharState> = {
    isLoading: false,
    error: false,
    char: {
      description: null,
      homepage: "",
      name: null,
      thumbnail: "",
      comics: null,
      wiki: "",
    },
  };

  loadCharInfo = () => {
    this.setState({
      isLoading: true,
      error: false,
    });

    m_service
      .getCharacter(() => this.props.charId)
      .then((char) => {
        this.setState({
          isLoading: false,
          error: false,
          ...char,
        });
      })
      .catch(this.onError);
  };

  onError = () => {
    this.setState({
      isLoading: false,
      error: true,
    });
  };

  render() {
    const { char, error, isLoading } = this.state;

    return (
      <StyledCharInfo className={"char__info"}>
        <div className="char__basics">
          <img src={char.thumbnail} alt={char.name ? char.name : ""} />
          <div>
            <div className="char__info-name">{char.name}</div>
            <div className="char__btns">
              <a href={char.homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={char.wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="char__descr">{char.description}</div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list"></ul>
      </StyledCharInfo>
    );
  }
}

export default CharInfo;

const CharComicsItem: FC = () => {
  return (
    
    <li className="char__comics-item">
      All-Winners Squad: Band of Heroes (2011) #3
    </li>
  );
};