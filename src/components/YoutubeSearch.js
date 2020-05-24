import YTSearch from 'youtube-api-v3-search';

const API_KEY = "AIzaSyAA_pHezWdMlfEvave9khY7pqKlvHw6JWM";


export default async (searchTerm) => {
    let result = await YTSearch(API_KEY, {
        q: searchTerm,
        part: 'snippet',
        type: 'video'
    });
    const obj = {
        videos: result.items,
        selectedVideo: result.items[0]
    };
    return obj;
}