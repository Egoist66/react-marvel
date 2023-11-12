import thor from '../../assets/images/thor.jpeg';
import styled from "styled-components";
import {PureComponent} from "react";
import { RandomCharState } from '../randomChar/RandomChar';
import { m_service } from '../../services/mservice-api';

const StyledCharInfo = styled.div`



`

type CharInfoProps = {
    charId: number | null
}

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
    }

    onError = () => {
        this.setState({
            isLoading: false,
            error: true
        });
    }

    render() {

        const {char, error, isLoading} = this.state

        return (
            <StyledCharInfo className={'char__info'}>
                <div className="char__basics">
                    <img src={thor} alt="abyss"/>
                    <div>
                        <div className="char__info-name">thor</div>
                        <div className="char__btns">
                            <a href="#" className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href="#" className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">{char.description}</div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    <li className="char__comics-item">
                        All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                    <li className="char__comics-item">
                        Alpha Flight (1983) #50
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #503
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #504
                    </li>
                    <li className="char__comics-item">
                        AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Vengeance (2011) #4
                    </li>
                    <li className="char__comics-item">
                        Avengers (1963) #1
                    </li>
                    <li className="char__comics-item">
                        Avengers (1996) #1
                    </li>
                </ul>

            </StyledCharInfo>
        )
    }
}

export default CharInfo;