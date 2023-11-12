import {DataRootCharacters, RootCharactersType} from "../app-types/types";


export class MDataService {

/**
 *
 *
 * @protected
 * @param {DataRootCharacters} results
 * @memberof MDataService
 */
protected transformCharData = (results: RootCharactersType[]) => {
    return {
        name: results[0]?.name,
        description: results[0]?.description || 'No description',
        thumbnail: `${results[0]?.thumbnail?.path}.${results[0]?.thumbnail.extension}`,
        wiki: results[0]?.urls.find(u => u.type === 'wiki')?.url,
        homepage: results[0]?.urls.find(u => u.type === 'homepage')?.url,
    }
}

protected transformCharsData = (results: RootCharactersType[]) => {
    return {
        name: results[0]?.name,
        description: results[0]?.description || 'No description',
        thumbnail: `${results[0]?.thumbnail?.path}.${results[0]?.thumbnail.extension}`,
        wiki: results[0]?.urls.find(u => u.type === 'wiki')?.url,
        homepage: results[0]?.urls.find(u => u.type === 'homepage')?.url,
    }
}

}
