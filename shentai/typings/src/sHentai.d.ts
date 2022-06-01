export = sHentai

/**
 * Simple nHentai Parser Library
 * @author Mikun Hatsune
 * @returns {object} Promise methods 
 */

declare class sHentai {
    /**
     * @returns All popular Doujins today(5 usually)
     */
    getPopular(): Promise<{
        id: String,
        titles: { english: String },
        cover: String 
    }>

    /** 
     * @returns All new Doujins today
    */
    getNew(): Promise<{
        id: String,
        titles: { english: String },
        cover: String 
    }>
    
    /**
     * @returns Random doujin
     */
    getRandom(): Promise<{
        id: string,
        titles: {
            english: string, 
            original?: string
        },
        pages: Array<string>, 
        tags: Array<string>, 
        cover: string
    }>

    /**
     * **If you don't enter ID, send random Doujin**
     * @param id ID of Doujin for get
     * @returns Doujin
     */
    getDoujin(id?: number | string): Promise<{
        id: string,
        titles: {
            english: string, 
            original?: string
        },
        pages: Array<string>, 
        tags: Array<string>, 
        cover: string
    }>

    /**
     * @param name Query params for searching
     * 
     * **Details of return:**
     * * Class with methods for Continue Searching
     * * Objects in array with Doujins
     * @returns Class with Methods and Results 
     */
    byAuthor(name: string): Promise<searchResult>

    /**
     * @param text Query params for searching 
     * 
     * **Details of return:**
     * * Class with methods for Continue Searching
     * * Objects in array with Doujins
     * @returns Class with Methods and Results 
     */
    search(text: string): Promise<searchResult>
}

import searchResult = require('./searchService')