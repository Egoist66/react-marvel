import mjolnir from "../../assets/images/mjolnir.png";
import styled from "styled-components";
import { FC, PureComponent, ReactNode } from "react";
import { m_service } from "../../services/mservice-api";
import { randomId } from "../../utils/randomId";
import Image from "../spinner/image";

const StyledRandomChar = styled.div``;

interface CharInner {
  name: string | null;
  description: string | null;
  thumbnail: string | undefined;
  homepage: string | undefined;
  wiki: string | undefined;
}

interface RandomCharState {
  isLoading: boolean;
  char: CharInner;
}

class RandomChar extends PureComponent<any, RandomCharState> {
  state: Readonly<RandomCharState> = {
    isLoading: false,
    char: {
      description: null,
      homepage: "",
      name: null,
      thumbnail: "",
      wiki: "",
    },
  };

  updateRandomChar = async () => {
    this.setState({
      isLoading: true,
    });

    const char = await m_service.getCharacter(randomId);

    this.setState({
      isLoading: false,
      ...char,
    });
  };

  componentDidMount(): void {
    this.updateRandomChar();
  }

  render(): ReactNode {
    const { isLoading } = this.state;

    return (
      <StyledRandomChar className="randomchar">
        <Image isLoading={isLoading} afterSpinner={() => <CharView />} />

        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button
            onClick={this.updateRandomChar}
            className="button button__main"
          >
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </StyledRandomChar>
    );
  }
}

type CharViewProps = {
  char: {
    name: string | null;
    description: string | null;
    thumbnail: string | undefined;
    homepage: string | undefined;
    wiki: string | undefined;
  };
};

const CharView: FC<CharViewProps> = ({char}) => {
  return (
    <div className="randomchar__block">
      <img
        src={char.thumbnail}
        alt="Random character"
        className={"randomchar__img"}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{char.name}</p>
        <p className="randomchar__descr">{char.description}</p>
        <div className="randomchar__btns">
          <a href={char.homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a
            target="_blank"
            href={char.wiki}
            className="button button__secondary"
          >
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
