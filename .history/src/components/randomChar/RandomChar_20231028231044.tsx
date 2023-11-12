import mjolnir from '../../assets/images/mjolnir.png';
import styled from "styled-components";
import { PureComponent, ReactNode } from 'react';
import { service } from '../../services/m-service';
import { randomId } from '../../utils/randomId';

const StyledRandomChar = styled.div`


`

interface RandomCharState {
    name: string | null,
    description: string | null,
    thumbnail: string | undefined,
    homepage: string | undefined,
    wiki: string | undefined

}

class RandomChar extends PureComponent<any, RandomCharState> {

    state: Readonly<RandomCharState> = {
        name: null,
        description: null,
        thumbnail: '',
        homepage: '',
        wiki: ''
    }

    private updateChar = async () => {
     
        const {data: {results}} = await service.getCharacter(randomId)

        console.log(results);
        
        
        this.setState({
            name: results[0].name,
            description: results[0].description || 'No description',
            thumbnail: `${results[0].thumbnail.path}.${results[0].thumbnail.extension}`,
            wiki: results[0].urls.find(u => u.type === 'wiki')?.url,
            homepage: results[0].urls.find(u => u.type === 'homepage')?.url,
        })
        
    }


    componentDidMount(): void {
        
        this.updateChar()

    }


    render(): ReactNode {

        const {description, homepage, name, thumbnail, wiki} = this.state
    
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
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </StyledRandomChar>
        )
    }

}

export default RandomChar;