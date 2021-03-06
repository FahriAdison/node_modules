const nHentai = require('./nHentaiService');
const utils = new nHentai;

const fetch = require('node-fetch');
const page = '/&page='
const artistPage = '/?page='

class searchResult {
    /**
     * @param {string} url
     * @param {Array<object>} results
     * @param {number} pagesCount
     * @param {number} allDoujinsCount
     * @param {Boolean} isArtist
     */

    constructor(url, results, pagesCount, allDoujinsCount, isArtist) {
        this.results = results;
        this.allDoujinsCount = allDoujinsCount;
        this.lastPage = pagesCount;
        this.currentPage = 1;
        this.#url = url;
        this.#isArtist = isArtist;
    }

    #url
    #isArtist

    async #returner() {
        const html = await fetch(this.#url + (this.#isArtist ? artistPage : page) + this.currentPage).then(res => res.text())
        this.results = utils.parseSearch(html, this.#isArtist).doujins
        return this
    }

    /**
     * 
     * **Method return a Promise, use .then(), or variable**
     * @returns {Promise<this>} Next Page of Search
     */

    next() {
        if (this.currentPage == this.lastPage) return this.first()
        this.currentPage++
        return this.#returner()
    }

    /**
     * 
     * **Method return a Promise, use .then(), or variable**
     * @returns {Promise<this>} Previous Page of Search
     */

    prev() {
        if (this.currentPage == 1) return this.last()
        this.currentPage--
        return this.#returner()
    }

    /**
     * 
     * **Method return a Promise, use .then(), or variable**
     * @param {number} page 
     * @returns {Promise<this>} indicated page
     */

    getPage(page) {
        page = Math.abs(page)
        
        if (typeof page != 'number') return { status: 400, message: 'You entered uncorrect query params for searching', results: 'Check message property.'}
        if (page == 0) return this.first()
        if (page > this.lastPage) return this.last()

        this.currentPage = page
        return this.#returner()
    }

    /**
     * 
     * **Method return a Promise, use .then(), or variable**
     * @returns {Promise<this>} First Page of Search
     */

    first() {
        this.currentPage = 1
        return this.#returner()
    }

    /**
     * 
     * **Method return a Promise, use .then(), or variable**
     * @returns {Promise<this>} Last Page of Search
     */

    last() {
        this.currentPage = this.lastPage
        return this.#returner()
    }
}

module.exports = searchResult