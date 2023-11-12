import mjolnir from '../../assets/images/mjolnir.png';
import styled from "styled-components";
import { PureComponent, ReactNode } from 'react';
import { RandChar } from '../../services/mchar-update';

const StyledRandomChar = styled.div`


`

export interface RandomCharState {
    char: {
        name: string | null,
        description: string | null,
        thumbnail: string | undefined,
        homepage: string | undefined,
        wiki: string | undefined
    }


}

class RandomChar extends PureComponent<any, RandomCharState> {


    state: Readonly<RandomCharState> = {
        char: {
            description: null,
            homepage: '',
            name: null,
            thumbnail: '',
            wiki: '' 
        }
    }

 


    componentDidMount(): void {
        
        RandChar.update(this.setState)

    }


    render(): ReactNode {

        const {char: {description, homepage, name, thumbnail, wiki}} = this.state
    
        return (
            <StyledRandomChar className="randomchar">
                <div className="randomchar__block">

                    {(
                        !thumbnail ? <p>No image</p> : 
                        <img 
                            src={thumbnail} 
                            alt="Random character" 
                            className="randomchar__img"
                        />
                    )}

                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">{description}</p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a target='_blank' href={wiki} className="button button__secondary">
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
                    <button onClick={this.updateRandomChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </StyledRandomChar>
        )
    }

}

export default RandomChar;