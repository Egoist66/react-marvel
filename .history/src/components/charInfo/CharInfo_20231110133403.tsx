import styled from "styled-components";
import { FC, PureComponent } from "react";
import { RandomCharState } from "../randomChar/RandomChar";
import { m_service } from "../../services/mservice-api";
import { drawCharThubmnail } from "../../utils/check-thumbnail";
import Preloader from "../preloader/preloader";
import ErrorBoundary from "../error-boundary/error-boundary";
import { randomId } from "../../utils/randomId";
import { Comics } from "../../app-types/types";
import Skeleton from "../skeleton/Skeleton";

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
    const { charId } = this.props;

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

  componentDidUpdate(prevProps: Readonly<CharInfoProps>): void {
    if (prevProps.charId !== this.props.charId) {
      this.loadCharInfo();
    }
  }

  render() {
    const { char, error, isLoading } = this.state;
    const { charId } = this.props;

    if (!charId) {
      return <Skeleton />;
    }

    return (
      <StyledCharInfo className={"char__info"}>
        <CharComicsInfoView
          char={char}
          error={error}
          isLoading={isLoading}
          loadCharInfo={this.loadCharInfo}
        />
      </StyledCharInfo>
    );
  }
}

export default CharInfo;

interface CharComicsInfoProps extends RandomCharState {
  loadCharInfo: () => void;
}

const CharComicsInfoView: FC<CharComicsInfoProps> = ({
  char,
  loadCharInfo,
  isLoading,
  error,
}) => {
  const { comics, description, homepage, name, thumbnail, wiki } = char;
  return (
    <ErrorBoundary onTryhandler={loadCharInfo} error={error}>
      <Preloader
        isLoading={isLoading}
        afterSpinner={() => (
          <>
            <div className="char__basics">
              <img
                style={{ objectFit: drawCharThubmnail({ char }) }}
                src={thumbnail}
                alt={name ? name : ""}
              />
              <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                  <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                  </a>
                  <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                  </a>
                </div>
              </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
              {comics?.items.map((c) => (
                <li key={c.name} className="char__comics-item">
                  {c.name}
                </li>
              ))}
            </ul>
          </>
        )}
      />
    </ErrorBoundary>
  );
};
