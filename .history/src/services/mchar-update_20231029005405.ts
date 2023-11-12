import RandomChar from "../components/randomChar/RandomChar"
import { randomId } from "../utils/randomId"
import { m_service } from "./mservice-api"

type UpdateRandomCharType = (char: RandomChar | {}) => void 

class CharUpdate {

    static updateRandomChar = async (setState: UpdateRandomCharType) => {
        const char = await m_service.getCharacter(randomId)

        setState(char)
    }
}