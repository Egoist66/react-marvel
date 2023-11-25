import styled from "styled-components";
import { FC, PureComponent, createRef } from "react";
import { m_service } from "../../services/mservice-api.ts";
import Preloader from "../preloader/preloader.tsx";
import ErrorBoundary from "../error-boundary/ErrorBoundary.tsx";


const StyledCharList = styled.div`


`


interface CharListState {
    error: boolean,
    offset: number
    isLoading: boolean
    isPaginating: boolean
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

interface CharListProps {
    onCharSelected: (id: number) => void
    selectedChar: number | null
}

class CharList extends PureComponent<CharListProps, CharListState> {


    state: Readonly<CharListState> = {
        isLoading: true,
        isPaginating: false,
        error: false,
        offset: 210,
        chars: []
    };

    incrementLimit = (count: number) => {
        return () => {
            this.setState((state) => (
                {
                    offset: state.offset + count

                }
            ))
        }
    }

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

    paginateChars = () => {
        this.setState({
            ...this.state,
            isPaginating: true
        })

        m_service.getAllCharacters(this.state.offset)
            .then(newchars => {
                this.setState(({ chars }) => ({
                    chars: [...chars, ...newchars]
                }))
            })
            .catch((e) => {
                this.setState({
                    ...this.state,
                    error: true
                })
                console.log(e)
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                    isPaginating: false,
                })
            })
    }

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

    componentDidUpdate(_: Readonly<CharListProps>, prevState: Readonly<CharListState>) {
        if (prevState.offset !== this.state.offset) {
            this.paginateChars()
        }
    }

    mappedChars = () => {
        const { chars } = this.state
        const { onCharSelected, selectedChar } = this.props

        return chars.length ? chars.map(char => {
            return (
                <CharListItem
                    onCharListSelect={onCharSelected}
                    id={char.id}
                    selectedChar={selectedChar}
                    src={char.thumbnail}
                    alt={char.name}
                    name={char.name}
                    key={char.id}
                />
            )
        }) : <h2>No characters were found!</h2>
    }

    render() {
        
        const { error, isLoading, isPaginating, offset } = this.state
        return (
            <StyledCharList style={isLoading ? {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50%',
            } : { display: 'block' }} className={'char__list'}>

                <ErrorBoundary error={error} onTryhandler={this.loadChars}>

                    <Preloader isLoading={isLoading} afterSpinner={() => (
                        <>

                            <ul className="char__grid">
                                {this.mappedChars()}
                            </ul>
                            <button style={{ display: offset >= 1563 ? 'none' : 'block' }}
                                disabled={isPaginating}
                                onClick={this.incrementLimit(9)}
                                className="button button__main button__long">

                                <p className="inner">{isPaginating ? 'Loading...' : 'Load more'}</p>
                            </button>

                        </>

                    )} />

                </ErrorBoundary>

            </StyledCharList>
        )
    }
}


type CharListItemProps = {
    src: string
    alt: string
    id: number
    selectedChar: number | null
    name: string
    onCharListSelect: (id: number) => void
}
const CharListItem: FC<CharListItemProps> = ({ name, selectedChar, onCharListSelect, src, id, alt }) => {

    return (

        <li onFocus={() => onCharListSelect(id)} tabIndex={1} onClick={() => onCharListSelect(id)}
            style={{ overflow: 'hidden' }}
            className={selectedChar === id ? 'char__item_selected char__item' : 'char__item'}>
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