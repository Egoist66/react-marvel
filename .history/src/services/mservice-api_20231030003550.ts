import {DataRootCharacters} from "../app-types/types.ts";
import { RandomID } from "../utils/randomId.ts";
import { MDataService } from "./mdata-service.ts";

class MService extends MDataService {

    private _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    private _apiKey = 'apikey=86cdbb8c53d57e047d3f5960d6b0596'


    private async getResource(url: string, format: 'text' | 'json') {

    
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`)
        }
        return await response[format]()
        
    }

    async getAllCharacters() {
        const chars : DataRootCharacters = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`, 'json')
        const {data: {results}} = chars
    

        return this.transformCharsData(results)
    }

    async getCharacter(id: () => RandomID) {

        const char: DataRootCharacters = await this.getResource(`${this._apiBase}characters/${id()}?${this._apiKey}`, 'json')
        return this.transformCharData(char.data.results)
        
    }


}

export const m_service = new MService()

