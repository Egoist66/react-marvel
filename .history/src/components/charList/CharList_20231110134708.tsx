import styled from "styled-components";
import {FC, PureComponent} from "react";
import {m_service} from "../../services/mservice-api.ts";
import Preloader from "../preloader/preloader.tsx";
import ErrorBoundary from "../error-boundary/error-boundary.tsx";


const StyledCharList = styled.div`


`


interface CharListState {
    error: boolean,
    isLoading: boolean
    chars: CharItems[]
}

export interface CharItems {
    id: number
    description: string,
    homepage: string | undefined,
    name: string,
    thumbnail: string,
    wiki: string | undefined,
}

interface CharListProps  {
    onCharSelected: (id: number) => void
}
class CharList extends PureComponent<CharListProps, CharListState> {

    state: Readonly<CharListState> = {
        isLoading: true,
        error: false,
        chars: []
    };

    onError = () => {
        this.setState({
            isLoading: false,
            error: true
        });
    };

    loadChars = () => {
        this.setState({
            error: false,
        });

        m_service
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)


    };

    onCharLoaded = (chars: CharItems[]) => {
        this.setState({
            chars,
            isLoading: false,
            error: false
        })
    }

    componentDidMount(): void {
        this.loadChars();

    }

    mappedChars = () => {
        const {chars} = this.state
        const {onCharSelected} = this.props

        return chars.map(char => {
            return (
                <CharListItem
                    onCharListSelect={onCharSelected}
                    id={char.id}
                    src={char.thumbnail}
                    alt={char.name}
                    name={char.name}
                    key={char.id}
                />
            )
        })
    }

    render() {
        const {error, isLoading} = this.state
        return (
            <StyledCharList style={isLoading ? {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50%',
            } : {display: 'block'}} className={'char__list'}>

                <ErrorBoundary error={error} onTryhandler={this.loadChars}>

                    <Preloader isLoading={isLoading} afterSpinner={() => (
                        <>

                            <ul className="char__grid">
                                {this.mappedChars()}
                            </ul>
                            <button className="button button__main button__long">
                                <div className="inner">load more</div>
                            </button>

                        </>

                    )}/>

                </ErrorBoundary>

            </StyledCharList>
        )
    }
}


type CharListItemProps = {
    src: string
    alt: string
    id: number
    name: string
    onCharListSelect: (id:number) => void
}
const CharListItem: FC<CharListItemProps> = ({name, onCharListSelect, src, id, alt}) => {
    return (

        <li onClick={() => onCharListSelect(id)}
            style={{overflow: 'hidden'}}
            className="char__item">
            <img
                style={{
                    width: src?.endsWith('image_not_available.jpg') ? 230 : 200
                }}
                src={src}
                alt={alt}
            />
            <div className="char__name">{name}</div>
        </li>


    )
}

export default CharList;