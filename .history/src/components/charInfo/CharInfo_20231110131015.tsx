import styled from "styled-components";
import { FC, PureComponent } from "react";
import { RandomCharState } from "../randomChar/RandomChar";
import { m_service } from "../../services/mservice-api";
import { drawCharThubmnail } from "../../utils/check-thumbnail";
import Preloader from "../preloader/preloader";
import ErrorBoundary from "../error-boundary/error-boundary";
import { randomId } from "../../utils/randomId";

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

    const {charId} = this.props

    this.setState({
      isLoading: true,
      error: false,
    });

    m_service
      .getCharacter(() => charId || randomId())
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

  componentDidMount(): void {
    this.loadCharInfo()
  }

  componentDidUpdate(prevProps: Readonly<CharInfoProps>): void {
    if (prevProps.charId !== this.props.charId) {
      this.loadCharInfo();
    }
  }

  render() {
    const { char, error, isLoading } = this.state;
    const { comics } = char;

    return (
      <StyledCharInfo className={"char__info"}>
        <ErrorBoundary onTryhandler={this.loadCharInfo} error={error}>
          <Preloader
            isLoading={isLoading}
            afterSpinner={() => (
              <>
                <div className="char__basics">
                  <img
                    style={{ objectFit: drawCharThubmnail({ char }) }}
                    src={char.thumbnail}
                    alt={char.name ? char.name : ""}
                  />
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
                <ul className="char__comics-list">
                  {comics?.items.map((c) => (
                    <CharComicsItem key={c.name} comicsName={c.name} />
                  ))}
                </ul>
              </>
            )}
          />
        </ErrorBoundary>
      </StyledCharInfo>
    );
  }
}

export default CharInfo;

const CharComicsItem: FC<{ comicsName: string }> = ({ comicsName }) => {
  return <li className="char__comics-item">{comicsName}</li>;
};
