import {DataRootCharacters} from "../app-types/types.ts";
import { RandomID } from "../utils/randomId.ts";
import { MDataService } from "./mdata-service.ts";

class MService extends MDataService {

    private _apiBase: string = 'https://gateway.marvel.com:443/v1/public/'
    private _apiKey: string = 'apikey=86cdbb80c53d57e047d3f5960d6b0596'
    private _limitCount: number = 9


    private async getResource(url: string, format: 'text' | 'json') {

    
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`)
        }
        return await response[format]()
        
    }

    async getAllCharacters(count: number = 0) {
        const chars : DataRootCharacters = await this.getResource(`${this._apiBase}characters?limit=${this._limitCount + count}&offset=210&${this._apiKey}`, 'json')
        const {data: {results}} = chars
    

        return this.transformCharsData(results)
    }

    async getCharacter(id: () => RandomID | null) {

        const char: DataRootCharacters = await this.getResource(`${this._apiBase}characters/${id()}?${this._apiKey}`, 'json')
        return this.transformCharData(char.data.results)
        
    }


}

export const m_service = new MService()

