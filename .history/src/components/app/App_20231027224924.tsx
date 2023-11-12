import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../assets/images/vision.png';
import styled from "styled-components";
import {useEffect} from "react";
import {service} from "../../services/m-service.ts";


const StyledApp = styled.div`
 
`

const App = () => {


    useEffect(() => {
        // service.getAllCharacters()
        //     .then(data => {
        //         console.log(data)
        //     })

        service.getCharacter(1011334).then(data => {
            console.log(data)
        })
    }, [])


    return (
        <StyledApp className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList/>
                    <CharInfo/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </StyledApp>
    )
}

export default App;