import {RootCharactersType} from "../app-types/types";
import { cutString } from "../utils/string-cut";


export class MDataService {

/**
 *
 *
 * @protected
 * @param {RootCharactersType[]} results
 * @memberof MDataService
 */
protected transformCharData = (results: RootCharactersType[]) => {
    return {
        char: {
            name: results[0]?.name,
            description: cutString(results[0]?.description) || 'No description',
            thumbnail: `${results[0]?.thumbnail?.path}.${results[0]?.thumbnail.extension}`,
            wiki: results[0]?.urls.find(u => u.type === 'wiki')?.url,
            homepage: results[0]?.urls.find(u => u.type === 'homepage')?.url,
        }
   
    }
}
/**
 *
 *
 * @protected
 * @param {RootCharactersType[]} results
 * @memberof MDataService
 */
protected transformCharsData = (results: RootCharactersType[]) => {

    return results.map(r => (
        {
            char: {
                name: r?.name || 'No name',
                description: r?.description || 'No description',
                thumbnail: `${r?.thumbnail?.path}.${r?.thumbnail.extension}`,
                wiki: r?.urls.find(u => u.type === 'wiki')?.url,
                homepage: r?.urls.find(u => u.type === 'homepage')?.url,
            }
        }
    ))
   
}

}
