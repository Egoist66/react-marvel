import mjolnir from "../../assets/images/mjolnir.png";
import styled from "styled-components";
import {FC, PureComponent, ReactNode} from "react";
import {m_service} from "../../services/mservice-api";
import {randomId} from "../../utils/randomId";
import Preloader from "../preloader/preloader";
import ErrorBoundary from "../error-boundary/error-boundary";
import { Comics } from "../../app-types/types";

const StyledRandomChar = styled.div``;

interface CharInner {
    name: string | null;
    description: string | null;
    thumbnail: string | undefined;
    homepage: string | undefined;
    wiki: string | undefined;
    comics: Comics | null
}

export interface RandomCharState {
    error: boolean;
    isLoading: boolean;
    char: CharInner;
}

class RandomChar extends PureComponent<any, RandomCharState> {


    state: Readonly<RandomCharState> = {
        isLoading: false,
        error: false,
        char: {
            description: null,
            homepage: "",
            name: null,
            comics: null,
            thumbnail: "",
            wiki: "",
        },
    };

    onError = () => {
        this.setState({
            isLoading: false,
            error: true
        });
    };

    updateRandomChar = () => {
        this.setState({
            isLoading: true,
            error: false,
        });

        m_service
            .getCharacter(randomId)
            .then((char) => {
                this.setState({
                    isLoading: false,
                    error: false,
                    ...char,
                });
            })
            .catch(this.onError);
    };

    componentDidMount(): void {
        this.updateRandomChar();

    }

    render(): ReactNode {
        console.log('render')
        const {isLoading, char, error} = this.state;

        return (
            <ErrorBoundary onTryhandler={this.updateRandomChar} error={error}>
                <StyledRandomChar className="randomchar">
                    <Preloader
                        isLoading={isLoading}
                        afterSpinner={() => <CharView char={char}/>}
                    />

                    <div className="randomchar__static">
                        <p className="randomchar__title">
                            Random character for today!
                            <br/>
                            Do you want to get to know him better?
                        </p>
                        <p className="randomchar__title">Or choose another one</p>
                        <button
                            onClick={this.updateRandomChar}
                            className="button button__main"
                        >
                            <div className="inner">try it</div>
                        </button>
                        <img
                            src={mjolnir}
                            alt="mjolnir"
                            className="randomchar__decoration"
                        />
                    </div>
                </StyledRandomChar>
            </ErrorBoundary>
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
                style={{
                    objectFit: drawCharThubmnail()
                }}
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
