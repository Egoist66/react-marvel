import thor from '../../assets/images/thor.jpeg';
import mjolnir from '../../assets/images/mjolnir.png';
import styled from "styled-components";
import { Component, ReactNode } from 'react';

const StyledRandomChar = styled.div`


`

interface RandomCharState {
    name: string | null,
    description: string | null,
    thumbnail: string | null,
    homepage: string | null,
    wiki: string | null

}

class RandomChar extends Component<any, RandomCharState> {

    state: Readonly<RandomCharState> = {
        name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null
    }


    render(): ReactNode {

        const {description, homepage, name, thumbnail, wiki} = this.state
    
        return (
            <StyledRandomChar className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">Thor</p>
                        <p className="randomchar__descr">{description}</p>
                        <div className="randomchar__btns">
                            <a href="{homepage}" className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href="{wiki}" className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </StyledRandomChar>
        )
    }

} 

export default RandomChar;