import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../assets/images/vision.png';
import styled from "styled-components";
import {PureComponent} from "react";
import ErrorBoundary from "../error-boundary/ErrorBoundary.tsx";


const StyledApp = styled.div`

`

interface AppStateInterface {
    selectedChar: null | number
}

class App extends PureComponent<any, AppStateInterface> {

    state: Readonly<AppStateInterface> = {
        selectedChar: null
    }

    onCharSelected = (id: number) => {
        this.setState({
            selectedChar: id
        })

    }


    render() {
        const {selectedChar} = this.state

        return (
            <StyledApp className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">

                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected}/>
                        </ErrorBoundary>


                        <ErrorBoundary>
                            <CharInfo charId={selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </StyledApp>
        )
    }
}

export default App;